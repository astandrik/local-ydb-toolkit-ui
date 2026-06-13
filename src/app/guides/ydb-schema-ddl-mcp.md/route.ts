import {
  buildYdbSchemaDdlMcpGuideMarkdown,
  markdownResponse,
} from "@/lib/agent-markdown";

export function GET() {
  return markdownResponse(buildYdbSchemaDdlMcpGuideMarkdown());
}
