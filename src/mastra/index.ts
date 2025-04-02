import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";

import { contentfulDeliveryAgent } from "./agents";

export const mastra = new Mastra({
  agents: { contentfulDeliveryAgent },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
