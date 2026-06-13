import {
  buildGuidesIndexMarkdown,
  markdownResponse,
} from "@/lib/agent-markdown";

export function GET() {
  return markdownResponse(buildGuidesIndexMarkdown());
}
