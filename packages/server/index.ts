import dotenv from 'dotenv';
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello World" });
})

app.listen(PORT, () => {
  console.log(`started the server on http://localhost:${PORT}`);
})
