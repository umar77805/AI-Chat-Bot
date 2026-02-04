# AI Chatbot

A simple chatbot application built with **Bun**.  
The project is structured as a **monorepo** with separate client and server packages.

Both client and server must be running for the application to work correctly.

---

## Requirements

Bun (latest recommended)

Install Bun if not already installed:

```
curl -fsSL https://bun.sh/install | bash
```

Setup:
```
1. Install dependencies (from root)
bun install

2. Configure environment variables
packages/server/.env

Create this file by copying the example:
cp packages/server/.env.example packages/server/.env

Fill in values:
OPENAI_API_KEY=your_api_key_here
PORT=your_port
```

Running the application:
```
Start server

cd packages/server
bun run dev

Start client (new terminal)
cd packages/client
bun run dev
```

Both services must be running at the same time.

Build (optional):
```
Client
cd packages/client
bun run build

Server
cd packages/server
bun run build
```

You can play with the model and it's configurations inside the chat service file ``` packages/server/chat-service.ts ```

The chatbot acts as a support assistant for an imaginary theme park called WonderWorld. If you wish to use the application for your specific usecase, please update the ``` packages/server/prompts ``` directory and it's subsequent code inside chat service. If you wish to use the chatbot for general purpose, please remove the ``` instructions ``` key in the chat service when configuring the model.

Notes:
1. Server depends on OPENAI_API_KEY.
2. Ensure the server port matches the client configuration if changed (check the proxy settings inside packages/client/vite.config.ts).
3. Run commands from the respective package directories unless stated otherwise.
