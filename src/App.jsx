import React, { useState, useEffect } from 'react';
import { prompts, categories } from './data/prompts';
import FirebaseAILogic from './FirebaseAILogic';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, storage } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import {
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import pkg from '../package.json';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('prompts');
  const [selectedCategory, setSelectedCategory] = useState("AI");
  const [searchTerm, setSearchTerm] = useState("");

  const [customPrompts, setCustomPrompts] = useState([]);
  const [newPromptText, setNewPromptText] = useState("");
  const [newPromptImage, setNewPromptImage] = useState(null);
  const [newPromptCategory, setNewPromptCategory] = useState("自定義");
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [aiMetadata, setAiMetadata] = useState(null); // { title, description, tags }
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '');
  const [showSettings, setShowSettings] = useState(!localStorage.getItem('gemini_api_key') && !import.meta.env.VITE_GEMINI_API_KEY);
  const [selectedModel, setSelectedModel] = useState("gemini-1.5-flash-latest");
  const [expandedPrompts, setExpandedPrompts] = useState({});
  const [interactionPrompt, setInteractionPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [apiStatus, setApiStatus] = useState("idle");
  const [dbStatus, setDbStatus] = useState("connecting");

  const toggleExpand = (id) => {
    setExpandedPrompts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const q = query(collection(db, "customPrompts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const promptsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCustomPrompts(promptsData);
      setDbStatus("connected");
    }, (error) => {
      console.error("Firebase connection error:", error);
      setDbStatus("error");
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (apiKey) {
      fetchAvailableModels();
    }
  }, [apiKey]);

  const fetchAvailableModels = async () => {
    setApiStatus("fetching");
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (!response.ok) {
        setApiStatus("error");
        return;
      }
      const data = await response.json();
      if (data.models) {
        setApiStatus("success");
        const flashModels = data.models.filter(model =>
          (model.name.includes('flash') || model.displayName?.toLowerCase().includes('flash')) &&
          model.supportedGenerationMethods?.includes('generateContent')
        );
        if (flashModels.length > 0) {
          const preferred = flashModels.find(m => m.name.includes('1.5-flash-002')) ||
            flashModels.find(m => m.name.includes('1.5-flash-latest')) ||
            flashModels[0];
          setSelectedModel(preferred.name.split('/').pop()); // SDK often expects short name or it handles prepending
        }
      }
    } catch (e) {
      console.error('Failed to fetch models', e);
      setApiStatus("error");
    }
  };

  const [deletedStaticIds, setDeletedStaticIds] = useState(() => {
    const saved = localStorage.getItem('deleted_static_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const [migrationDone, setMigrationDone] = useState(() => {
    return localStorage.getItem('migration_complete') === 'true';
  });

  const [isMigrating, setIsMigrating] = useState(false);

  useEffect(() => {
    localStorage.setItem('deleted_static_ids', JSON.stringify(deletedStaticIds));
  }, [deletedStaticIds]);

  // Auto-Migration: Fix generic titles
  useEffect(() => {
    const migrateTitles = async () => {
      // Find prompts with generic title and valid text
      const updates = customPrompts.filter(p => p.title === "自定義提示詞" && p.prompt);

      if (updates.length > 0) {
        console.log(`[Auto-Fix] Migrating ${updates.length} generic titles...`);

        // Helper to derive title (same logic as addPrompt)
        const deriveTitle = (text) => {
          if (!text) return "自定義提示詞";
          const firstLine = text.split(/[\n,，,.]/)[0].trim();
          return firstLine.substring(0, 20) + (firstLine.length > 20 ? "..." : "");
        };

        try {
          // Update in parallel
          await Promise.all(updates.map(p => {
            const newTitle = deriveTitle(p.prompt);
            const promptRef = doc(db, "customPrompts", p.id);
            return updateDoc(promptRef, { title: newTitle });
          }));
          console.log("[Auto-Fix] Titles updated successfully.");
        } catch (err) {
          console.error("[Auto-Fix] Failed to migrate titles:", err);
        }
      }
    };

    if (customPrompts.length > 0) {
      migrateTitles();
    }
  }, [customPrompts]);

  // If migration is done, ignore static prompts entirely.
  // Otherwise, filter out deleted static IDs.
  const allPrompts = migrationDone
    ? customPrompts
    : [...customPrompts, ...prompts].filter(p => !deletedStaticIds.includes(p.id));

  const handleMigratePrompts = async () => {
    if (!window.confirm("確定要將所有預設提示詞遷移到雲端嗎？這樣可以確保它們永久保存，並且可以被刪除。\n\nMigrate all default prompts to cloud?")) {
      return;
    }

    setIsMigrating(true);
    let count = 0;
    try {
      // 1. Filter out prompts that are already "deleted" or already "customized"
      // actually, just iterate all static prompts.
      // If a prompt with same title exists in customPrompts, skip it to avoid duplicates.

      const staticToMigrate = prompts.filter(sp => !deletedStaticIds.includes(sp.id));

      for (const p of staticToMigrate) {
        const alreadyExists = customPrompts.some(cp => cp.title === p.title || cp.originalStaticId === p.id);

        if (!alreadyExists) {
          // Create new clean object
          const newDoc = {
            title: p.title,
            description: p.description,
            prompt: p.prompt,
            tags: p.tags || [],
            category: p.category || "未分類",
            image: p.image || null,
            originalStaticId: p.id,
            createdAt: serverTimestamp(),
            migratedAt: serverTimestamp()
          };

          await addDoc(collection(db, "customPrompts"), newDoc);
          count++;
        }
      }

      // 2. Mark migration as complete
      localStorage.setItem('migration_complete', 'true');
      setMigrationDone(true);

      alert(`遷移成功！共遷移了 ${count} 個提示詞。\n現在所有資料都已上雲。`);
    } catch (error) {
      console.error("Migration failed:", error);
      alert("遷移失敗: " + error.message);
    } finally {
      setIsMigrating(false);
    }
  };

  const filteredPrompts = allPrompts.filter(item => {
    const matchesCategory = selectedCategory === "全部" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          setNewPromptImage(event.target.result);
        };
        reader.readAsDataURL(blob);
        e.preventDefault();
        return;
      }
    }
  };

  const handleNewPromptImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const resizedImage = await resizeImage(file);
        setNewPromptImage(resizedImage);
      } catch (error) {
        console.error("Image processing failed:", error);
        alert("圖片處理失敗");
      }
    }
  };


  const resizeImage = (file, maxWidth = 800, quality = 0.6) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (promptId, e) => {
    const file = e.target.files[0];
    if (file) {
      setIsGenerating(true);
      try {
        const resizedImage = await resizeImage(file);

        // Upload to Storage
        const timestamp = Date.now();
        const storageRef = ref(storage, `prompt-images/${promptId}-${timestamp}`);
        await uploadString(storageRef, resizedImage, 'data_url');
        const imageUrl = await getDownloadURL(storageRef);

        // Update Firestore
        const promptRef = doc(db, "customPrompts", promptId);
        await updateDoc(promptRef, { image: imageUrl });

        alert("圖片上傳成功！");
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("圖片上傳失敗: " + error.message);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    if (!apiKey) {
      setShowSettings(true);
      alert("請先在設定中輸入 Gemini API Key");
      return;
    }
    if (!newPromptText.trim()) {
      alert("請先輸入一個主題（例如：可愛的貓咪、賽博龐克城市）");
      return;
    }

    setIsGenerating(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: selectedModel,
        generationConfig: {
          temperature: 0.8,
        }
      });

      const systemInstruction = `
        You are the "AI Prompt Master". Your role is to take the user's input (which could be a topic or a basic prompt) and REMASTER it into a professional, highly detailed Traditional Chinese image generation prompt.
        
        Strictly follow these rules:
        1. REPLACEMENT: The 'prompt' field MUST be the fully expanded, detailed version of the user's input in Traditional Chinese.
        2. MASTERPIECE QUALITY: Include details on lighting, camera angle, artistic style, and composition.
        3. OPTIMIZATION: Ensure the prompt is optimized for high-end AI models, providing a rich, descriptive scene.
        
        Return a JSON object:
        {
          "prompt": "The detailed Traditional Chinese masterpiece prompt",
          "title": "A creative title in Traditional Chinese",
          "description": "A poetic description in Traditional Chinese",
          "tags": ["tag1", "tag2", ...]
        }

        IMPORTANT: ONLY return the raw JSON object. Do not include markdown code blocks or any other text.
      `;

      const prompt = `${systemInstruction}\n\nUser Topic:\n${newPromptText}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Safer JSON Parsing
      let data;
      try {
        // Clean markdown code blocks if necessary
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        data = JSON.parse(jsonStr);
      } catch (parseError) {
        console.error("JSON parse failed", text);
        throw new Error("AI 回應格式錯誤，請再試一次。");
      }

      setNewPromptText(data.prompt);
      setAiMetadata({
        title: data.title,
        description: data.description,
        tags: data.tags
      });
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("AI 生成失敗：" + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeminiSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!interactionPrompt.trim()) return;

    if (!apiKey) {
      setShowSettings(true);
      alert("請先在設定中輸入 Gemini API Key");
      return;
    }

    setIsGenerating(true);
    // Clear previous results immediately for a fresh feel
    setNewPromptText("");
    setNewPromptImage(null);
    setAiMetadata(null);

    setApiStatus("fetching");
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: selectedModel,
        generationConfig: {
          temperature: 0.8,
        }
      });

      const systemInstruction = `
        [IMPORTANT] Ignore all previous context or history. This is a NEW, STANDALONE request.
        You are the "AI Prompt Master". Your role is to take the user's input and REMASTER it into a professional, highly detailed Image Generation Prompt.
        
        CRITICAL RULES:
        1. The 'prompt' field MUST act as an input for Stable Diffusion. It MUST be in ENGLISH.
        2. Enhance the prompt with visual keywords: "8k resolution", "photorealistic", "cinematic lighting", "high detailed", "masterpiece".
        3. Do NOT use conversational language in the 'prompt'. Just comma-separated descriptive phrases.
        4. The 'title', 'description', and 'tags' should remain in Traditional Chinese.

        Return a JSON object with: prompt, title, description, tags.
      `;

      const prompt = `${systemInstruction}\n\nUser Topic:\n${interactionPrompt}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(jsonStr);

      // Auto-fill the Prompt Master form with ORIGINAL user prompt
      setNewPromptText(interactionPrompt);

      // Clear the Gemini input
      setInteractionPrompt("");

      // Start Image Generation (will auto-paste to form when complete)
      generateGeminiImage(data.prompt);
      setApiStatus("success");
    } catch (error) {
      console.error("Gemini Interaction failed:", error);
      setApiStatus("error");
      alert("生成失敗：" + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateGeminiImage = async (prompt) => {
    setIsGeneratingImage(true);
    setGeneratedImage(null);
    try {
      // Use Pollinations.ai for high-quality, free image generation
      // We encode the prompt to ensure it works in the URL
      const seed = Math.floor(Math.random() * 1000000);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&nologo=true`;

      // Download the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Display the image immediately for preview
      const previewUrl = URL.createObjectURL(blob);
      setGeneratedImage(previewUrl);

      // Upload to Firebase Storage
      const timestamp = Date.now();
      const storageRef = ref(storage, `gemini-images/${timestamp}.jpg`);
      await uploadBytes(storageRef, blob);

      // Get the download URL from Firebase
      const firebaseUrl = await getDownloadURL(storageRef);

      // Auto-paste the Firebase URL to the Prompt Master form
      setNewPromptImage(firebaseUrl);

      // Scroll to the creation form for easy review
      setTimeout(() => {
        document.querySelector('.create-prompt-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (error) {
      console.error("Image generation failed:", error);
      alert("圖片生成或上傳失敗：" + error.message);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!generatedImage) return;
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gemini-gen-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      alert("下載失敗");
    }
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setShowSettings(false);
      alert("API Key 已儲存");
    } else {
      alert("請輸入有效的 API Key");
    }
  };

  const handleCategoryChange = async (id, newCategory) => {
    try {
      // Check if it's a custom prompt (in Firestore)
      const isCustom = customPrompts.some(p => p.id === id);

      if (isCustom) {
        // Update direct in Firestore
        const promptRef = doc(db, "customPrompts", id);
        await updateDoc(promptRef, { category: newCategory });
      } else {
        // It's a static prompt -> "Clone" to Custom with new category, then "Delete" original static
        const staticPrompt = prompts.find(p => p.id === id);
        if (!staticPrompt) return;

        // 1. Create new Custom Prompt
        const newPrompt = {
          ...staticPrompt,
          category: newCategory,
          createdAt: serverTimestamp(),
          originalStaticId: id // Optional: track origin
        };
        // Remove fixed ID to let Firestore generate one, OR use a new unique one
        delete newPrompt.id;

        await addDoc(collection(db, "customPrompts"), newPrompt);

        // 2. Hide the original static prompt
        setDeletedStaticIds(prev => [...prev, id]);
      }
    } catch (error) {
      console.error("Failed to update category:", error);
      alert("分類更新失敗");
    }
  };

  const handleAddPrompt = async () => {
    if (!newPromptText.trim()) {
      alert("請輸入提示詞！");
      return;
    }

    if (newPromptCategory === "create_new" && !customCategoryInput.trim()) {
      alert("請輸入新分類名稱！");
      return;
    }

    setIsGenerating(true); // Reuse loading state for saving
    try {
      let imageUrl = null;
      if (newPromptImage) {
        if (newPromptImage.includes("firebasestorage.googleapis.com")) {
          // Already a Firebase URL (from Gemini generation), use it directly
          imageUrl = newPromptImage;
        } else if (newPromptImage.startsWith("data:")) {
          // Base64 string (manual upload), upload to Storage
          const imageId = `img-${Date.now()}`;
          const storageRef = ref(storage, `prompt-images/${imageId}`);
          await uploadString(storageRef, newPromptImage, 'data_url');
          imageUrl = await getDownloadURL(storageRef);
        } else {
          // External URL (fallback), try to download and upload
          try {
            const response = await fetch(newPromptImage);
            const blob = await response.blob();
            const imageId = `img-${Date.now()}`;
            const storageRef = ref(storage, `prompt-images/${imageId}`);
            await uploadBytes(storageRef, blob);
            imageUrl = await getDownloadURL(storageRef);
          } catch (fetchError) {
            console.error("Failed to process external image URL:", fetchError);
            // Fallback: use the original URL if processing fails
            imageUrl = newPromptImage;
          }
        }
      }

      const category = newPromptCategory === "create_new" ? customCategoryInput.trim() : newPromptCategory;

      // Determine Title: Use AI title if available, otherwise extract keyword from text
      let finalTitle = "自定義提示詞";
      if (aiMetadata && aiMetadata.title) {
        finalTitle = aiMetadata.title;
      } else {
        // Smart Title Extraction: First 15 chars or first logical phrase
        const firstLine = newPromptText.split(/[\n,，,.]/)[0].trim();
        if (firstLine) {
          finalTitle = firstLine.substring(0, 20) + (firstLine.length > 20 ? "..." : "");
        }
      }

      const newPrompt = {
        title: finalTitle,
        category: category,
        prompt: newPromptText,
        description: aiMetadata?.description || "使用者新增的提示詞",
        tags: aiMetadata?.tags || ["自定義", category],
        image: imageUrl,
        model: selectedModel,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "customPrompts"), newPrompt);

      setNewPromptText("");
      setNewPromptImage(null);
      setNewPromptCategory("自定義");
      setCustomCategoryInput("");
      setAiMetadata(null);
      setSelectedCategory("全部");
    } catch (error) {
      console.error("Error adding prompt:", error);
      alert("儲存失敗：" + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("確定要刪除此提示詞嗎？")) {
      // Check if it's a custom prompt (in Firestore)
      const isCustom = customPrompts.some(p => p.id === id);

      if (isCustom) {
        try {
          const promptToDelete = customPrompts.find(p => p.id === id);
          if (promptToDelete && promptToDelete.image && promptToDelete.image.includes("firebasestorage")) {
            // Attempt to delete image from storage
            try {
              const imageRef = ref(storage, promptToDelete.image);
              await deleteObject(imageRef);
            } catch (storageError) {
              console.warn("Storage deletion failed (likely already deleted):", storageError);
            }
          }
          await deleteDoc(doc(db, "customPrompts", id));
        } catch (error) {
          console.error("Error deleting prompt:", error);
          alert("刪除失敗");
        }
      } else {
        // It's a static/built-in prompt -> "Delete" by adding to local blacklist
        setDeletedStaticIds(prev => [...prev, id]);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="status-indicators" style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        display: 'flex',
        gap: '10px',
        zIndex: 1000,
        fontSize: '0.8rem',
        fontWeight: 'bold'
      }}>
        <div style={{
          padding: '4px 8px',
          borderRadius: '4px',
          backgroundColor: 'rgba(0,0,0,0.6)',
          border: `1px solid ${dbStatus === 'connected' ? '#43e97b' : dbStatus === 'error' ? '#ff4444' : '#ff9f43'}`,
          color: dbStatus === 'connected' ? '#43e97b' : dbStatus === 'error' ? '#ff4444' : '#ff9f43'
        }}>
          DB: {dbStatus.toUpperCase()}
        </div>
        <div style={{
          padding: '4px 8px',
          borderRadius: '4px',
          backgroundColor: 'rgba(0,0,0,0.6)',
          border: `1px solid ${apiStatus === 'success' ? '#43e97b' : apiStatus === 'error' ? '#ff4444' : apiStatus === 'fetching' ? '#ff9f43' : '#aaa'}`,
          color: apiStatus === 'success' ? '#43e97b' : apiStatus === 'error' ? '#ff4444' : apiStatus === 'fetching' ? '#ff9f43' : '#aaa'
        }}>
          API: {apiStatus.toUpperCase()}
        </div>
      </div>
      <div className="version-tag">v{pkg.version}</div>
      <header className="hero">
        <div className="container">
          <h1 className="title">🍌 My Prompts</h1>
          <p className="subtitle">Nanobana Pro 提示詞大全</p>
        </div>
      </header>

      <main className="container main-content">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'prompts' ? 'active' : ''}`}
            onClick={() => setActiveTab('prompts')}
          >
            Prompts
          </button>
          <button
            className={`tab-btn ${activeTab === 'aiLogic' ? 'active' : ''}`}
            onClick={() => setActiveTab('aiLogic')}
          >
            Direct AI Logic
          </button>
          <button
            className={`tab-btn ${activeTab === 'otherWebsites' ? 'active' : ''}`}
            onClick={() => setActiveTab('otherWebsites')}
          >
            其他網站
          </button>
          <button
            className="tab-btn"
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️ 設定
          </button>
        </div>

        {showSettings && (
          <div className="settings-panel" style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '1px solid #4facfe'
          }}>
            <h3>⚙️ 系統設定</h3>
            <div className="input-group">
              <label>Gemini API Key</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="輸入您的 Gemini API Key..."
                  style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                  onClick={handleSaveApiKey}
                  style={{ padding: '10px 20px', backgroundColor: '#43e97b', color: '#0a0e27', fontWeight: 'bold', border: 'none', borderRadius: '4px' }}
                >
                  儲存
                </button>
              </div>
              <p style={{ fontSize: '0.8em', color: '#aaa', marginTop: '8px' }}>
                API Key 將儲存在您的瀏覽器本地 (LocalStorage)
              </p>
            </div>

            <div className="input-group" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <label>資料遷移 (Data Migration)</label>
              <p style={{ fontSize: '0.9em', color: '#e0e0e0', marginBottom: '10px' }}>
                {migrationDone
                  ? "✅ 您的資料已全部上雲 (All Data is Online)"
                  : "將預設提示詞遷移到雲端資料庫，以確保您可以永久刪除或修改它們。"}
              </p>
              {!migrationDone && (
                <button
                  onClick={handleMigratePrompts}
                  disabled={isMigrating}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: isMigrating ? '#666' : '#ff9f43',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isMigrating ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isMigrating ? "遷移中 (Migrating)..." : "☁️ 一鍵上雲 (Migrate to Cloud)"}
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'prompts' && (
          <>
            <div className="controls">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="搜尋提示詞..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="category-filters">
                {Array.from(new Set([...categories, ...customPrompts.map(p => p.category)])).map(cat => (
                  <button
                    key={cat}
                    className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="create-prompt-section">
              <h2>✨ 新增自定義提示詞 (AI Prompt Master)</h2>
              <div className="create-form">
                <div className="form-column">
                  <div className="input-group">
                    <label>選擇分類</label>
                    <select
                      value={newPromptCategory}
                      onChange={(e) => setNewPromptCategory(e.target.value)}
                      className="category-select"
                    >
                      <option value="自定義">自定義</option>
                      <option value="create_new">➕ 新增分類...</option>
                      {Array.from(new Set([...categories, ...customPrompts.map(p => p.category)]))
                        .filter(c => c !== "全部" && c !== "自定義")
                        .map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    {newPromptCategory === "create_new" && (
                      <input
                        type="text"
                        placeholder="輸入新分類名稱"
                        value={customCategoryInput}
                        onChange={(e) => setCustomCategoryInput(e.target.value)}
                        className="category-select"
                        style={{ marginTop: '8px' }}
                      />
                    )}
                  </div>
                  <div className="input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ marginBottom: 0 }}>提示詞內容</label>
                      <button
                        onClick={handleAIGenerate}
                        disabled={isGenerating}
                        style={{
                          padding: '4px 8px',
                          fontSize: '0.8em',
                          backgroundColor: '#646cff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: isGenerating ? 'wait' : 'pointer'
                        }}
                      >
                        {isGenerating ? '✨ 生成中...' : '✨ 生成 AI 大師提示詞'}
                      </button>
                    </div>
                    <textarea
                      placeholder="在此輸入您的提示詞... 或輸入主題並點擊「AI 生成」"
                      value={newPromptText}
                      onChange={(e) => setNewPromptText(e.target.value)}
                      className="prompt-input"
                    />
                  </div>
                </div>

                <div className="form-column">
                  <div className="input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ marginBottom: 0 }}>參考圖片 (Ctrl+V 貼上)</label>
                      <label htmlFor="new-prompt-upload" style={{ cursor: 'pointer', fontSize: '0.9em', color: '#646cff', fontWeight: 'bold' }}>
                        📂 上傳圖片
                      </label>
                      <input
                        type="file"
                        id="new-prompt-upload"
                        accept="image/*"
                        onChange={handleNewPromptImageUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <div
                      className="paste-area"
                      onPaste={handlePaste}
                      tabIndex="0"
                    >
                      {newPromptImage ? (
                        <img src={newPromptImage} alt="Pasted preview" className="preview-image" />
                      ) : (
                        <div className="paste-placeholder">
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button className="add-btn" onClick={handleAddPrompt}>
                  新增<br />提示詞
                </button>
              </div>
            </div>

            <section className="gemini-section">
              <div className="gemini-greeting">
                <div className="gemini-hi">
                  <span className="gemini-sparkle">✦</span> Hi aikid
                </div>
                <h2 className="gemini-promo">Happy New Year! Let’s make it your best yet</h2>
              </div>

              <div className="gemini-input-container">
                <div className="gemini-placeholder-row">
                  <span className="gemini-shield-icon">🛡️</span>
                  <textarea
                    className="gemini-textarea"
                    placeholder="Ask Gemini to visualize or write something..."
                    value={interactionPrompt}
                    onChange={(e) => setInteractionPrompt(e.target.value)}
                    disabled={isGenerating}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleGeminiSubmit();
                      }
                    }}
                  />
                </div>
                <div className="gemini-tool-row">
                  <div className="gemini-tools-left">
                    <span className="gemini-icon-btn">＋</span>
                    <span className="gemini-icon-btn">⌥</span>
                    <div className="gemini-active-tool-chip">
                      <span>⛄</span> Image <span className="gemini-close-chip">✕</span>
                    </div>
                  </div>
                  <div className="gemini-tools-right">
                    <div className="gemini-pro-select">Pro <span>⌄</span></div>
                    <button
                      className="gemini-send-btn"
                      onClick={handleGeminiSubmit}
                      disabled={isGenerating || !interactionPrompt.trim()}
                    >
                      {isGenerating ? '...' : '🎙️'}
                    </button>
                  </div>
                </div>
              </div>

              {(isGenerating || isGeneratingImage || generatedImage) && (
                <div className="gemini-result-container">
                  {(isGenerating || isGeneratingImage) ? (
                    <div className="gemini-loader">
                      <div className="gemini-skeleton">正在構思您的畫作... (生成約需 1 分鐘，請耐心等候 ☕)</div>
                    </div>
                  ) : (
                    <div className="gemini-image-preview">
                      <img src={generatedImage} alt="Generated result" />
                      <button className="gemini-download-btn" onClick={handleDownloadImage}>
                        💾 下載圖片
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="gemini-chips-row">
                <button className="gemini-chip" onClick={() => setInteractionPrompt("幫我生成一張...")}>
                  <span>⛄</span> Create image
                </button>
                <button className="gemini-chip" onClick={() => setInteractionPrompt("幫我寫一段...")}>
                  <span>❄️</span> Write anything
                </button>
                <button className="gemini-chip" onClick={() => setInteractionPrompt("我有個點子...")}>
                  Build an idea
                </button>
                <button className="gemini-chip" onClick={() => setInteractionPrompt("我想深入研究...")}>
                  Deep Research
                </button>
                <button className="gemini-chip" onClick={() => setInteractionPrompt("探索視覺主題...")} style={{ width: '100%', maxWidth: 'max-content', marginTop: '4px' }}>
                  Explore visually
                </button>
              </div>
            </section>

            <div className="prompt-grid">
              {filteredPrompts.map(item => (
                <div key={item.id} className="prompt-card">
                  <div className="card-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {/* Replaced Badge with Dropdown */}
                        <select
                          className="category-select-badge"
                          value={item.category}
                          onChange={(e) => handleCategoryChange(item.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            border: '1px solid #ddd',
                            fontSize: '0.8rem',
                            backgroundColor: '#f0f0f0',
                            cursor: 'pointer',
                            outline: 'none'
                          }}
                        >
                          <option value="自定義">自定義</option>
                          {/* Use combined list of categories to include user-created ones like "AI" */}
                          {Array.from(new Set([...categories, ...customPrompts.map(p => p.category)]))
                            .filter(c => c !== "自定義")
                            .map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))
                          }
                        </select>
                        {item.model && <span className="badge" style={{ backgroundColor: '#E3F2FD', color: '#1976D2' }}>{item.model}</span>}
                      </div>
                      {/* Show delete button for ALL items in the custom/filtered view */}
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          color: '#ff4444'
                        }}
                        title="刪除"
                      >
                        🗑️
                      </button>
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                  <p className="description">{item.description}</p>
                  <div className="tags">
                    {item.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                  </div>
                  <div className={`prompt-box ${expandedPrompts[item.id] ? 'expanded' : ''}`}>
                    <code className="prompt-text">{item.prompt}</code>
                    {item.prompt && item.prompt.length > 100 && (
                      <button
                        className="expand-btn"
                        onClick={() => toggleExpand(item.id)}
                      >
                        {expandedPrompts[item.id] ? "收起內容 ↑" : "顯示更多 ↓"}
                      </button>
                    )}
                    <button
                      className={`copy-btn ${copiedId === item.id ? 'copied' : ''}`}
                      onClick={() => handleCopy(item.prompt, item.id)}
                    >
                      {copiedId === item.id ? "已複製!" : "複製"}
                    </button>
                  </div>

                  <div className="image-section">
                    {item.image && (
                      <div className="sample-image">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            const w = window.open("");
                            if (w) {
                              w.document.write(`<img src="${item.image}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">`);
                              w.document.title = item.title;
                              w.document.close();
                            }
                          }}
                          title="點擊查看大圖"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('image-error');
                          }}
                        />
                      </div>
                    )}

                    {customPrompts.some(p => p.id === item.id) && (
                      <div className="upload-control">
                        <label htmlFor={`upload-${item.id}`} className="upload-btn">
                          📷 {item.image ? "更新圖片" : "上傳參考圖"}
                        </label>
                        <input
                          type="file"
                          id={`upload-${item.id}`}
                          accept="image/*"
                          onChange={(e) => handleImageUpload(item.id, e)}
                          style={{ display: 'none' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredPrompts.length === 0 && (
              <div className="no-results">
                <p>沒有找到相關提示詞 🍌</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'aiLogic' && (
          <FirebaseAILogic />
        )}

        {activeTab === 'otherWebsites' && (
          <div className="resources-section" style={{ padding: '20px' }}>
            <div className="resource-card" style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #4facfe'
            }}>
              <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                🔗 相關資源與介紹
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ margin: '15px 0' }}>
                  <a
                    href="https://github.com/ZHO-ZHO-ZHO/ZHO-nano-banana-Creation"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      textDecoration: 'none',
                      color: '#4facfe',
                      fontSize: '1.2em',
                      fontWeight: 'bold'
                    }}
                  >
                    <span>📂</span> ZHO-nano-banana-Creation
                  </a>
                  <p style={{ margin: '8px 0 0 34px', color: '#ccc', lineHeight: '1.6' }}>
                    ZHO Nano Banana Creation 專案的官方代碼庫。您可以在這裡找到更多關於本專案的介紹、源代碼以及相關的開發資源。這是一個集合了多種創意工具與提示詞管理的綜合平台。
                  </p>
                </li>
                <li style={{ margin: '25px 0 15px 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                  <a
                    href="https://github.com/xianyu110/awesome-nanobananapro-prompts"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      textDecoration: 'none',
                      color: '#4facfe',
                      fontSize: '1.2em',
                      fontWeight: 'bold'
                    }}
                  >
                    <span>🌟</span> Awesome NanobanaPro Prompts
                  </a>
                  <p style={{ margin: '8px 0 0 34px', color: '#ccc', lineHeight: '1.6' }}>
                    一個收集了很多 NanobanaPro 相關提示詞的 Awesome 列表，內容豐富，非常值得參考與學習。
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>Designed with Nana Banana Style 🍌</p>
          <p>資料來源參考：茶米老師教室 - Nanobana Pro 提示詞大全</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
