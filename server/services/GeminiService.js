import { GoogleGenerativeAI } from "@google/generative-ai";
import { User } from "../models/User.js";
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

export class GeminiService {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    this.md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      breaks: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return `<pre class="hljs"><code class="${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
          } catch (__) {}
        }
        return `<pre class="hljs"><code>${str}</code></pre>`; // use external default escaping
      }
    });
    
    // Additional plugins and configurations for better formatting
    this.md.renderer.rules.paragraph_open = () => '<p class="mb-4">';
    this.md.renderer.rules.heading_open = (tokens, idx) => {
      const level = tokens[idx].tag;
      return `<${level} class="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">`;
    };
    this.md.renderer.rules.list_item_open = () => '<li class="mb-2">';
  }

  formatResponse(text, status) {
    // Pre-process text to ensure proper markdown formatting
    let processedText = text
      // Ensure proper spacing around headings
      .replace(/(?<!#)(#{1,6})\s/g, '\n\n$1 ')
      // Ensure proper spacing around lists
      .replace(/(?<!\n)\n([*-])/g, '\n\n$1')
      // Add spacing between paragraphs
      .replace(/\n(?!\n)/g, '\n\n')
      // Format code blocks properly
      .replace(/```(\w+)?\n/g, '\n```$1\n');

    const formattedText = this.md.render(processedText);
    
    return {
      content: `<div class="gemini-content">${formattedText}</div>`,
      status: status,
      timestamp: new Date().toISOString(),
      metadata: {
        format: 'markdown',
        wordCount: text.split(/\s+/).length,
        charCount: text.length,
        sections: (text.match(/#{1,6}\s[^\n]+/g) || []).length
      }
    };
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
      const rawText = await response.text();
      
      return this.formatResponse(rawText, 'success');
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
      const rawText = await response.text();

      return this.formatResponse(rawText, 'success');
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate AI content');
    }
  }

  async analyzePerformance({ studentData, subject }) {
    try {
      const prompt = `
        You are Ilm, an AI performance analyst. Analyze the following student data and provide detailed insights:

        Subject: ${subject}
        Student Data: ${JSON.stringify(studentData)}

        Please provide a comprehensive analysis including:
        1. Overall Performance Assessment
        2. Strengths Identified
        3. Areas for Improvement
        4. Specific Recommendations
        5. Study Strategies

        Format your response using markdown with proper headings, bullet points, and emphasis where appropriate.
      `;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const rawText = await response.text();

      return this.formatResponse(rawText, 'analysis_complete');
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to analyze student performance');
    }
  }

}