import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";

import { weatherAgent, contentfulAgent } from "./agents";

export const mastra = new Mastra({
  agents: { weatherAgent, contentfulAgent },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),
});
