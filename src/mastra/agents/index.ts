import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { Agent } from "@mastra/core/agent";
import { MastraMCPClient } from "@mastra/mcp";
import { Memory } from "@mastra/memory";

const contentfulDeliveryClient = new MastraMCPClient({
  name: "contentful-delivery",
  server: {
    command: "npx",
    args: ["-y", "@mshaaban0/contentful-delivery-mcp-server@latest"],
    env: {
      ...process.env,
      CONTENTFUL_ACCESS_TOKEN: "XCgoPvoG9ErCdnJRoAvf10LQvYL_fm7r-LOGoQRAhOE",
      CONTENTFUL_SPACE_ID: "07cd27yms10j",
      CONTENTFUL_CONTENT_TYPE_IDS: "faqItem",
    },
  },
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
  model: anthropic("claude-3-5-sonnet-latest"),
  memory: new Memory({
    options: {
      lastMessages: 10,
      workingMemory: {
        enabled: true,
      },
    },
  }),
});

try {
  await contentfulDeliveryClient.connect();

  // Gracefully handle process exits so the docker subprocess is cleaned up
  process.on("exit", () => {
    contentfulDeliveryClient.disconnect();
  });

  // Get available tools
  const deliveryTools = await contentfulDeliveryClient.tools();

  // In newer versions of Mastra, __setTools expects a record of tools, not an array
  // Make sure we're passing the tools in the correct format
  contentfulDeliveryAgent.__setTools(deliveryTools);
} catch (error) {
  console.error("Error:", error);
}
