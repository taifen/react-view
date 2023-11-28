import type { PlaywrightTestConfig } from "@playwright/test";

const getCommand = (type?: string): string => {
  switch (type) {
    case "dev":
      return "pnpm ladle serve";
    case "prod":
      return "pnpm ladle build && pnpm ladle preview";
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const config: PlaywrightTestConfig = {
  testMatch: "examples/**/*.spec.ts",
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,
  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: `http://localhost:61000`,
  },
  webServer: {
    reuseExistingServer: true,
    command: getCommand(process.env.TYPE),
    url: `http://localhost:61000`,
  },
};

export default config;
