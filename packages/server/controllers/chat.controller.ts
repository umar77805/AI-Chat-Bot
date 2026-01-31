import type { Request, Response } from "express"
import { chatService } from "../services/chat-service";
import z from "zod";

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, 'Prompt is required!')
    .max(1000, 'Prompt too large (Max 100 characters)'),
  conversationId: z.uuid('Must be a valid UUID')
})

export const chatController = {
  async sendMessage(req: Request, res: Response) {
    const parseSchema = chatSchema.safeParse(req.body);

    if (!parseSchema.success) {
      res.status(400).json({ message: z.treeifyError(parseSchema.error) });
      return;
    }

    try {
      const { prompt, conversationId } = req.body;
      const response = await chatService.sendMessage(conversationId, prompt)
      res.json({ message: response.message });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate a response" });
    }
  }
}