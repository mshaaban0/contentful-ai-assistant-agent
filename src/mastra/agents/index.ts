import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { MastraMCPClient } from "@mastra/mcp";
import { Memory } from "@mastra/memory";

const CONTENTFUL_CMA_TOKEN = process.env.CONTENTFUL_CMA_TOKEN || "";
const CONTENTFUL_HOST = process.env.CONTENTFUL_HOST || "";

const contentfulManagementClient = new MastraMCPClient({
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

const contentfulDeliveryClient = new MastraMCPClient({
  name: "contentful-delivery",
  server: {
    command: "npx",
    args: ["-y", "@mshaaban0/contentful-delivery-mcp-server@latest"],
    env: {
      ...process.env,
      CONTENTFUL_ACCESS_TOKEN: "XCgoPvoG9ErCdnJRoAvf10LQvYL_fm7r-LOGoQRAhOE",
      CONTENTFUL_SPACE_ID: "07cd27yms10j",
    },
  },
});

export const contentfulManagementAgent = new Agent({
  name: "Contentful Management",
  instructions: `
    You are a contentful assistant that helps with contentful operations, use tools to do contentful operations
  `,
  model: openai("gpt-4o"),
  memory: new Memory(),
});

export const contentfulDeliveryAgent = new Agent({
  name: "Customers Assistant Bot",
  instructions: `
    You are an assistant bot that helps customers with their questions, your data source is contentful, 
    try to search for information in contentful before answering questions, 
    use the search tools to find relevant information and provide accurate answers based on the contentful data
    Do not tell the user anything about contentful, the data sources, or how you got the content.
    You can only use these tools to find information to answer questions in the background.
    If you don't find relevant information in contentful, let the user know that you don't have enough information to answer their question accurately.
    Your primary search is query entries but if you don't find things there try to get all entries and find what you're looking for there.
  `,
  model: openai("gpt-4o"),
  memory: new Memory(),
});

try {
  // Connect to the MCP server
  await contentfulDeliveryClient.connect();
  await contentfulManagementClient.connect();

  // Gracefully handle process exits so the docker subprocess is cleaned up
  process.on("exit", () => {
    contentfulDeliveryClient.disconnect();
    contentfulManagementClient.disconnect();
  });

  // Get available tools
  const deliveryTools = await contentfulDeliveryClient.tools();
  const managementTools = await contentfulManagementClient.tools();

  // Use the agent with the MCP tools
  contentfulDeliveryAgent.__setTools(deliveryTools);
  contentfulManagementAgent.__setTools(managementTools);
} catch (error) {
  console.error("Error:", error);
}
