// This module will solely be responsible to expose interface to the rest of the application for interacting with an llm
// The type of llm client we use should be irrelevent to the application because in future that might change
// What's necessary is that we predefine a proper input and output structure to talk with an llm
// As an example we are going to use OpenAI's LLM

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

type GenerateTextOptions = {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  instructions?: string;
  previousResponseId?: string | null;
}

type GenerateTextResponse = {
  id: string;
  text: string;
}

export const llmClient = {
  async generateText({
    model = 'gpt-4o-mini',
    prompt,
    maxTokens = 300,
    temperature = 0.3,
    instructions = '',
    previousResponseId
  }: GenerateTextOptions): Promise<GenerateTextResponse> {
    const response = await client.responses.create({
      model,
      input: prompt,
      temperature, 
      max_output_tokens: maxTokens,
      instructions,
      previous_response_id: previousResponseId
    })

    return {
      id: response.id,
      text: response.output_text
    }
  }
}