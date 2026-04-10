import { GoogleGenAI } from "@google/genai";
import type { Transaction } from "../types";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY as string,
});

export const autoCategorizeDescription = async (
  desc: string,
  category: string[],
): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `"${desc}" is a description for an expense/income for a finance tracker app, please auto categorize this description based on the categories given to you, only return
    that category word with the first letter capitalized, nothing else. the categories are in an array like so: ${category}`,
  });

  return response.text ?? "";
};

export const categorizeImportedTransactions = async (
  tran: Transaction,
  category: string[],
): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `Categorize this transaction: ${JSON.stringify(tran)}

    Choose exactly ONE category from this list: ${category}

    Respond with ONLY the category name. No explanation, no punctuation, just the single word.`,
  });

  return response.text ?? "";
};
