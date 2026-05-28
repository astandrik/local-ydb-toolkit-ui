import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath =
  configuredBasePath && configuredBasePath !== "/"
    ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
    : undefined;

const htmlLimitedBots = new RegExp(
  [
    "Googlebot",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "PerplexityBot",
    "Bingbot",
    "BingPreview",
    "Slackbot",
    "Discordbot",
    "Twitterbot",
    "LinkedInBot",
  ].join("|"),
  "i",
);

const nextConfig: NextConfig = {
  basePath,
  htmlLimitedBots,
  turbopack: {
    root,
  },
};

export default nextConfig;
