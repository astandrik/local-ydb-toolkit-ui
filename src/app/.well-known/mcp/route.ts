import { handlePromoMcpRequest } from "@/lib/mcp-http";
import { buildMcpRegistryServerMetadata } from "@/lib/mcp-registry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(): Response {
  return Response.json(buildMcpRegistryServerMetadata(), {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}

export async function POST(req: Request): Promise<Response> {
  return handlePromoMcpRequest(req);
}
