import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";

import { contentfulDeliveryAgent, contentfulManagementAgent } from "./agents";

export const mastra = new Mastra({
  agents: { contentfulDeliveryAgent, contentfulManagementAgent },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
