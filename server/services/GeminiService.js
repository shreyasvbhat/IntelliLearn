import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  buildPrompt(message, subject, learningRate, chatHistory, context) {
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

  async generateResponse({ message, subject, learningRate, chatHistory, context }) {
    try {
      const prompt = this.buildPrompt(message, subject, learningRate, chatHistory, context);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  async generateContent({ topic, difficulty, contentType, targetAudience }) {
    try {
      const prompt = `
        You are Ilm, an AI content generator for teachers.

        Generate ${contentType} content on the topic "${topic}" with the following parameters:
        - Difficulty: ${difficulty}
        - Target Audience: ${targetAudience}

        Ensure the content is engaging, educational, and tailored to the specified audience.
      `;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate AI content');
    }
  }
  async analyzePerformance({ studentId, courseId }) {
    try {
      const prompt = `
        You are Ilm, an AI performance analyst.

        Analyze the performance of student ID ${studentId} in course ID ${courseId}.
        Provide insights on strengths, weaknesses, and areas for improvement.
      `;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to analyze student performance');
    }
  }

  

}