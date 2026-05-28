import { buildMcpServerCard } from "@/lib/mcp-registry";

export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(buildMcpServerCard(), {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
