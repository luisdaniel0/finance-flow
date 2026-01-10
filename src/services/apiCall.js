import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
}); // No need to pass key if using GEMINI_API_KEY

export const autoCategorizeDescription = async (desc, category) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `auto categorize this description based on these categories. Description: ${desc}. Categories: ${category}. Only return the category name you see in the list, nothing else.`,
  });
  console.log(response.text);
  return response.text;
};
