import fs from 'fs';
import path from 'path';
import OpenAI from "openai";
import { conversationRepository } from "../repositories/conversation.repository";
import template from '../prompts/WonderWorld.txt';
import { llmClient } from '../llm/client';

type MessageSuccessResponse = {
  id: string;
  message: string;
}

const parkInfo = fs.readFileSync(path.join(__dirname, '..', 'prompts', 'WonderWorld.md'), 'utf-8');
const instructions = template.replace('{{parkInfo}}', parkInfo);

export const chatService = {
  async sendMessage(conversationId: string, prompt: string): Promise<MessageSuccessResponse> {
    const response = await llmClient.generateText({
      model: 'gpt-4o-mini',
      prompt,
      instructions,
      temperature: 0.3,
      maxTokens: 500,
      previousResponseId: conversationRepository.getLastResponseId(conversationId),
    })

    conversationRepository.setResponseId(conversationId, response.id);

    return {
      id: response.id,
      message: response.text
    }
  }
}
