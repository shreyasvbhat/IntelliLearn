import { promises as fs } from 'fs';
import { join } from 'path';

export class LearningRateManager {
  static async getUserLearningRate(userId) {
    try {
      const filePath = join(process.cwd(), 'data', 'learning_rates', `${userId}.json`);
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Return default learning rate if file doesn't exist
      return {
        userId,
        overallRate: 50,
        subjects: {},
        lastUpdated: new Date(),
        interactions: []
      };
    }
  }

  static async updateLearningRate(userId, interaction) {
    try {
      const currentData = await this.getUserLearningRate(userId);
      
      // Update learning rate based on interaction
      const rateChange = this.calculateRateChange(interaction);
      
      // Update overall rate
      currentData.overallRate = Math.max(1, Math.min(100, currentData.overallRate + rateChange));
      
      // Update subject-specific rate
      if (interaction.subject) {
        if (!currentData.subjects[interaction.subject]) {
          currentData.subjects[interaction.subject] = 50;
        }
        currentData.subjects[interaction.subject] = Math.max(1, 
          Math.min(100, currentData.subjects[interaction.subject] + rateChange)
        );
      }
      
      // Add interaction to history
      currentData.interactions.push({
        ...interaction,
        timestamp: new Date(),
        rateChange
      });
      
      // Keep only last 50 interactions
      if (currentData.interactions.length > 50) {
        currentData.interactions = currentData.interactions.slice(-50);
      }
      
      currentData.lastUpdated = new Date();
      
      // Save updated data
      await this.saveLearningRate(userId, currentData);
      
      return currentData;
    } catch (error) {
      console.error('Error updating learning rate:', error);
      throw error;
    }
  }

  static calculateRateChange(interaction) {
    const { type, score, timeSpent, difficulty } = interaction;
    
    let baseChange = 0;
    
    switch (type) {
      case 'quiz':
        baseChange = (score - 70) / 10; // +3 for 100%, -7 for 0%
        break;
      case 'doubt':
        baseChange = -1; // Asking questions slightly decreases confidence
        break;
      case 'content_view':
        baseChange = 0.5; // Small positive for engagement
        break;
      case 'assignment':
        baseChange = (score - 60) / 15;
        break;
      default:
        baseChange = 0;
    }
    
    // Adjust based on difficulty
    if (difficulty) {
      const difficultyMultiplier = {
        'easy': 0.8,
        'medium': 1.0,
        'hard': 1.3
      };
      baseChange *= difficultyMultiplier[difficulty] || 1.0;
    }
    
    // Adjust based on time spent (if provided)
    if (timeSpent) {
      const expectedTime = 30; // 30 minutes expected
      const timeRatio = Math.min(timeSpent / expectedTime, 2.0);
      baseChange *= (0.5 + timeRatio * 0.5); // 0.5x to 1.5x multiplier
    }
    
    return Math.round(baseChange * 100) / 100; // Round to 2 decimal places
  }

  static async saveLearningRate(userId, data) {
    try {
      const dirPath = join(process.cwd(), 'data', 'learning_rates');
      const filePath = join(dirPath, `${userId}.json`);
      
      // Ensure directory exists
      await fs.mkdir(dirPath, { recursive: true });
      
      // Save data
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving learning rate:', error);
      throw error;
    }
  }

  static async getChatHistory(userId, subject) {
    try {
      const learningData = await this.getUserLearningRate(userId);
      
      // Filter interactions for specific subject
      const subjectInteractions = learningData.interactions
        .filter(i => i.subject === subject)
        .slice(-10); // Last 10 interactions
      
      return this.summarizeInteractions(subjectInteractions);
    } catch (error) {
      console.error('Error getting chat history:', error);
      return [];
    }
  }

  static summarizeInteractions(interactions) {
    // Simple summarization - in production, this could use AI
    const summary = interactions.map(interaction => {
      switch (interaction.type) {
        case 'quiz':
          return `Scored ${interaction.score}% on ${interaction.topic} quiz`;
        case 'doubt':
          return `Asked about ${interaction.topic}`;
        case 'content_view':
          return `Studied ${interaction.topic}`;
        case 'assignment':
          return `Completed ${interaction.topic} assignment (${interaction.score}%)`;
        default:
          return `Interacted with ${interaction.topic}`;
      }
    });
    
    return summary;
  }
}