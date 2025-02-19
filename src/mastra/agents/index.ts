import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { MastraMCPClient } from "@mastra/mcp";
import { Memory } from "@mastra/memory";
import { weatherTool } from "../tools";

const CONTENTFUL_CMA_TOKEN = process.env.CONTENTFUL_CMA_TOKEN || "";
const CONTENTFUL_HOST = process.env.CONTENTFUL_HOST || "";

const contentfulClient = new MastraMCPClient({
  name: "contentful",
  server: {
    command: "npx",
    args: [
      "-y",
      "@ivotoby/contentful-management-mcp-server",
      "--management-token",
      CONTENTFUL_CMA_TOKEN,
      "--host",
      CONTENTFUL_HOST,
    ],
  },
});

export const contentfulAgent = new Agent({
  name: "Contentful Management",
  instructions: `
    You are a contentful assistant that helps with contentful operations, use tools to do contentful operations
  `,
  model: openai("gpt-4o"),
  memory: new Memory(),
});

try {
  // Connect to the MCP server
  await contentfulClient.connect();

  // Gracefully handle process exits so the docker subprocess is cleaned up
  process.on("exit", () => {
    contentfulClient.disconnect();
  });

  // Get available tools
  const tools = await contentfulClient.tools();

  // Use the agent with the MCP tools
  contentfulAgent.__setTools(tools);
} catch (error) {
  console.error("Error:", error);
} finally {
  // Always disconnect when done
  // await contentfulClient.disconnect();
}

export const weatherAgent = new Agent({
  name: "Weather Agent",
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  model: openai("gpt-4o"),
  tools: { weatherTool },
});
