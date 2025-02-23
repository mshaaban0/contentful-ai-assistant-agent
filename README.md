# AI Assistant Chatbot with Contentful

A Mastra-powered AI Chatbot application that integrates with OpenAI, Anthropic Claude and Contentful MCP Servers.
Aims to provide an intelligent conversational based on your contentful data while maintaining a secure and accurate chatbot that doesn't hallucinate.

## Prerequisites

- Node.js
- OpenAI API key
- Anthropic API Key
- Contentful Space ID, CDA and (CMA Token for Contentful Agent)

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.development` file based on `.env.development.Example`:

```
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
CONTENTFUL_SPACE_ID=your_contentful_space_id
CONTENTFUL_CDA_TOKEN=your_contentful_CDA_token
CONTENTFUL_CMA_TOKEN=your_contentful_CMA_token
CONTENTFUL_HOST=api.contentful.com
```

## Features

It has two agents in place (Contentful Management) and (Assistant Bot)

- Assistant Bot: an agent that uses Contentful CDA (Content Delivery API) to fetch and search through your content to answer questions from your content
- Contentful Management: an agent that operates on your Contentful space (create, update, delete) content

## Development

To run the development server:

```bash
npm run dev
```

## Project Structure

- `index.ts` - Main application entry point
- `agents/` - Contains contentful assistant, and contentful management agents
- Environment configuration files

## Dependencies

- [@ai-sdk/openai](https://www.npmjs.com/package/@ai-sdk/openai) - OpenAI integration
- [@mastra/core](https://www.npmjs.com/package/@mastra/core) - Core Mastra framework
- [@mastra/mcp](https://www.npmjs.com/package/@mastra/mcp) - Mastra MCP functionality
- [@mastra/memory](https://www.npmjs.com/package/@mastra/memory) - Mastra memory management

## License

MIT
