import {
  buildBestToolsLocalYdbAiAgentsGuideMarkdown,
  markdownResponse,
} from "@/lib/agent-markdown";

export function GET() {
  return markdownResponse(buildBestToolsLocalYdbAiAgentsGuideMarkdown());
}
