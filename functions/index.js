const { onRequest, onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { VertexAI } = require("@google-cloud/vertexai");

// Set global options
setGlobalOptions({ maxInstances: 10 });

// Initialize Vertex AI
const vertex_ai = new VertexAI({ project: "chinese-prompts", location: "us-central1" });
const model = "gemini-1.5-flash"; // Upgrading to flash for faster/more stable response

// Instantiate the model
const generativeModel = vertex_ai.getGenerativeModel({
    model: model,
    generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 0.8,
    },
});

exports.generatePrompt = onCall({
    invoker: "public",
    region: "us-central1"
}, async (request) => {
    const topic = request.data.topic;

    if (!topic) {
        throw new HttpsError("invalid-argument", "The function must be called with a 'topic' argument.");
    }

    const systemInstruction = `
    You are an expert prompt engineer for "Nanobana Pro" (a high-quality image generation model).
    Your goal is to create detailed, artistic, and effective image generation prompts based on a user's simple idea.
    
    The user will provide a topic (e.g., "cute cat", "cyberpunk city").
    You must generate a response in JSON format with the following fields:
    - prompt: The full English prompt. It should be descriptive, including style, lighting, composition, and mood.
    - title: A short, catchy title in Traditional Chinese (e.g., "可愛太空貓").
    - description: A brief description in Traditional Chinese.
    - tags: An array of 3-5 relevant tags in Traditional Chinese.
    
    Example Input: "sushi"
    Example Output:
    {
      "prompt": "A close-up, high-resolution photo of a premium sushi platter, fresh salmon and tuna, glistening texture, soft studio lighting, bokeh background, 8k, photorealistic, culinary art",
      "title": "頂級壽司拼盤",
      "description": "展現新鮮食材質感的高級壽司攝影。",
      "tags": ["美食", "壽司", "攝影", "日式"]
    }
    
    Ensure the output is valid JSON. Do not include markdown code blocks.
  `;

    const chat = generativeModel.startChat({});
    const prompt = `${systemInstruction}\n\nUser Topic: ${topic}`;

    // Mock response for local emulator (Vertex AI not available in emulator)
    if (process.env.FUNCTIONS_EMULATOR === 'true') {
        return {
            prompt: `A stunning, high-resolution image of ${topic}, featuring vibrant colors, dramatic lighting, professional composition, 8k quality, photorealistic details, cinematic atmosphere`,
            title: `精美的${topic}`,
            description: `展現${topic}的精緻細節與藝術美感。`,
            tags: ["AI生成", topic, "高品質"]
        };
    }

    try {
        const result = await chat.sendMessage(prompt);
        const response = result.response;
        let text = response.candidates[0].content.parts[0].text;

        // Clean up markdown if present
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(text);
    } catch (error) {
        console.error("Error generating prompt:", error);
        throw new HttpsError("internal", "Failed to generate prompt.");
    }
});
