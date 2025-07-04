import { GoogleGenAI } from "@google/genai";


export class GeminiService {
  static genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || '<INSERT_GEMINI_API_KEY_HERE>');

  static buildPrompt(message, subject, learningRate, chatHistory, context) {
    return `
      You are Ilm, an AI tutor specialized in personalized learning.
      
      Student Context:
      - Subject: ${subject}
      - Learning Rate: ${learningRate}% (1-100 scale)
      - Chat History Summary: ${chatHistory.join('; ')}
      - Additional Context: ${context || 'None'}
      
      Learning Rate Guidelines:
      - If learning rate > 80: Provide concise, challenging content
      - If learning rate 60-80: Provide balanced explanations with examples
      - If learning rate < 60: Provide detailed, step-by-step explanations
      
      Student Question: ${message}
      
      Provide a helpful, personalized response that matches the student's learning level.
    `;
  }

  static async generateResponse({ message, subject, learningRate, chatHistory, context }) {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = this.buildPrompt(message, subject, learningRate, chatHistory, context);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  static async generateContent({ topic, difficulty, contentType, targetAudience }) {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `
        Generate educational content for the following:
        - Topic: ${topic}
        - Difficulty Level: ${difficulty}
        - Content Type: ${contentType}
        - Target Audience: ${targetAudience}

        Provide a title, main content, practice exercises, suggested duration, and learning objectives.
        Format the output as a JSON object.
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate content');
    }
  }

  static async analyzePerformance({ studentData, subject }) {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `
        Analyze the following student performance data for the subject: ${subject}.
        Student Data: ${JSON.stringify(studentData)}

        Provide an analysis that includes:
        - Overall performance summary
        - Key strengths
        - Areas for improvement (weaknesses)
        - Actionable recommendations
        - A predicted outcome
        - A boolean indicating if intervention is needed.

        Format the output as a JSON object.
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to analyze performance');
    }
  }
}