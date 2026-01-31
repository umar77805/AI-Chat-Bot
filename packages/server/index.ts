import dotenv from 'dotenv';
import express from "express";
import OpenAI from 'openai';

dotenv.config();

const app = express();

app.use(express.json());

const openAiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello World" });
})

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    res.json({ message: "Please send a prompt" }).status(400);
    return;
  }

  const response = await openAiClient.responses.create({
    model: 'gpt-4o-mini',
    input: prompt,
    temperature: 0.3,
    max_output_tokens: 100
  })

  res.json({ message: response.output_text });
  return;
})

app.listen(PORT, () => {
  console.log(`Started the server on http://localhost:${PORT}`);
})
