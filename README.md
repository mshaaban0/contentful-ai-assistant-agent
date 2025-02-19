````markdown README.md
# Contentful Assistant

A Mastra-powered application that integrates with OpenAI and Contentful, featuring weather functionality.

## Prerequisites

- Node.js
- OpenAI API key
- Contentful CMA token

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```
````

3. Create a `.env.development` file based on `.env.development.Example`:

```
OPENAI_API_KEY=your_api_key
CONTENTFUL_CMA_TOKEN=your_contentful_token
CONTENTFUL_HOST=api.flinkly.com
```

## Features

- Weather conditions reporting with detailed weather codes
- Contentful integration
- Built with Mastra framework

## Development

To run the development server:

```bash
npm run dev
```

## Project Structure

- `index.ts` - Main application entry point
- `agents/` - Contains weather and contentful agents
- Environment configuration files

## Dependencies

- [@ai-sdk/openai](https://www.npmjs.com/package/@ai-sdk/openai) - OpenAI integration
- [@mastra/core](https://www.npmjs.com/package/@mastra/core) - Core Mastra framework
- [@mastra/mcp](https://www.npmjs.com/package/@mastra/mcp) - Mastra MCP functionality
- [@mastra/memory](https://www.npmjs.com/package/@mastra/memory) - Mastra memory management

## License

ISC

```

Note: Based on the provided files, I've created a basic README. Some sections (like detailed usage instructions) couldn't be included because the full functionality of the agents isn't visible in the shared code. To make this README more comprehensive, you might want to include:

1. More details about the weather and contentful agents
2. Specific usage examples
3. API documentation
4. Configuration options
5. Deployment instructions

These could be added once more information about the project's functionality is available.
```
