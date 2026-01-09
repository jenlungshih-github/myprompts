import React from 'react';

function FirebaseAILogic() {
  const codeExample = `
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(YOUR_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const handleAIGenerate = async (topic) => {
  const prompt = \`Generate a creative prompt for: \${topic}\`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
  `;

  return (
    <div className="firebase-ai-logic-container">
      <h2>Direct AI Logic Explained</h2>
      <p>
        This application leverages the power of Google's generative AI to help you create interesting and creative prompts. Recently, we migrated from Firebase Functions to <strong>Direct Client-Side Integration</strong> for better performance and reliability.
      </p>

      <h3>Core Technologies</h3>
      <ul>
        <li><strong>Google Generative AI SDK:</strong> We use the <code>@google/generative-ai</code> library to communicate directly with the AI model from your browser.</li>
        <li><strong>Gemini 1.5 Flash:</strong> We are using Google's powerful and versatile Gemini 1.5 Flash model.</li>
        <li><strong>Local Storage:</strong> Your API Key is stored securely in your browser's <code>localStorage</code>, so you don't have to keep re-entering it.</li>
      </ul>

      <h3>How it Works</h3>
      <ol>
        <li>When you click "AI Generate", the app initializes the <code>GoogleGenerativeAI</code> instance using your saved API Key.</li>
        <li>It sends your topic along with a specialized <strong>System Instruction</strong> to the Gemini model.</li>
        <li>The model generates a structured JSON response containing the prompt, title, description, and tags.</li>
        <li>The application parses this JSON and automatically fills in the form for you.</li>
      </ol>

      <h3>Code Example (Direct Integration)</h3>
      <p>Here is the logic that powers this feature:</p>
      <pre>
        <code>
          {codeExample}
        </code>
      </pre>

      <p>
        This combination of Firebase and Vertex AI allows for a powerful and scalable way to integrate cutting-edge AI features directly into the application.
      </p>
    </div>
  );
}

export default FirebaseAILogic;
