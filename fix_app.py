import re

# Read the file
with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the malformed function
old_pattern = r'// We "pre-load" the image to ensure it\'s ready.*?// Scroll to the creation form for easy review\s+setTimeout\(\(\) => \{'
new_code = '''// Download the image as a blob
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
      setTimeout(() => {'''

content = re.sub(old_pattern, new_code, content, flags=re.DOTALL)

# Write back
with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed!")
