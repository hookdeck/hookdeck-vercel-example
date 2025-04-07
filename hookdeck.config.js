if (typeof EdgeRuntime !== "string") {
  const { loadEnvConfig } = require("@next/env");

  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
}

const {
  RetryStrategy,
  DestinationRateLimitPeriod,
} = require("@hookdeck/sdk/api");

/** @type {import("@hookdeck/vercel").HookdeckConfig} */
const hookdeckConfig = {
  vercel_url: process.env.BASE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL,
  match: {
    "/api/webhooks": {
      retry: {
        strategy: RetryStrategy.Linear,
        count: 5,
        interval: 1 * 60 * 1000, // in milliseconds
      },
      rate: {
        limit: 10,
        period: DestinationRateLimitPeriod.Minute,
      },
    },
  },
};

module.exports = hookdeckConfig;
