import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = "AIzaSyAv9QY2qPKoCb3akC5jwocHIHrkdYTQVFc";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateContent(prompt) {
  try {
    
    const result = await model.generateContent(prompt);

    const generatedText = result.response.text();

    return generatedText;
  } catch (error) {
    console.error("Erreur lors de la génération du contenu:", error);
    throw error;
  }
}

