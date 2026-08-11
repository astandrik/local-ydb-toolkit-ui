import {
  buildListingsMarkdown,
  markdownResponse,
} from "@/lib/agent-markdown";

export function GET() {
  return markdownResponse(buildListingsMarkdown());
}
