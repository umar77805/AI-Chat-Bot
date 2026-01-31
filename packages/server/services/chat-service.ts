import OpenAI from "openai";
import { conversationrepository } from "../repositories/conversation.repositories";

type MessageSuccessResponse = {
  id: string;
  message: string;
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const chatService = {
  async sendMessage(conversationId: string, prompt: string): Promise<MessageSuccessResponse> {
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.3,
      max_output_tokens: 100,
      previous_response_id: conversationrepository.getLastResponseId(conversationId),
    })

    conversationrepository.setResponseId(conversationId, response.id);

    return {
      id: response.id,
      message: response.output_text
    }
  }
}
