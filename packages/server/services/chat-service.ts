import fs from 'fs';
import path from 'path';
import OpenAI from "openai";
import { conversationrepository } from "../repositories/conversation.repositories";
import template from '../prompts/WonderWorld.txt';

type MessageSuccessResponse = {
  id: string;
  message: string;
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const parkInfo = fs.readFileSync(path.join(__dirname, '..', 'prompts', 'WonderWorld.md'), 'utf-8');
const instructions = template.replace('{{parkInfo}}', parkInfo);

export const chatService = {
  async sendMessage(conversationId: string, prompt: string): Promise<MessageSuccessResponse> {
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      instructions,
      temperature: 0.3,
      max_output_tokens: 500,
      previous_response_id: conversationrepository.getLastResponseId(conversationId),
    })

    conversationrepository.setResponseId(conversationId, response.id);

    return {
      id: response.id,
      message: response.output_text
    }
  }
}
