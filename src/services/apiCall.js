import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
}); // No need to pass key if using GEMINI_API_KEY

export const autoCategorizeDescription = async (desc, category) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `"${desc}" is a description for an expense/income for a finance tracker app, please auto categorize this description based on the categories given to you, only return 
    that category word with the first letter capitalized, nothing else. the categories are in an array like so: ${category}`,
  });
  console.log(response.text);
  return response.text;
};
