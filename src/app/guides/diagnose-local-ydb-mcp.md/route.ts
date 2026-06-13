import {
  buildDiagnoseLocalYdbMcpGuideMarkdown,
  markdownResponse,
} from "@/lib/agent-markdown";

export function GET() {
  return markdownResponse(buildDiagnoseLocalYdbMcpGuideMarkdown());
}
