import { handlePromoMcpRequest } from "@/lib/mcp-http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  return handlePromoMcpRequest(req);
}

export function GET(): Response {
  return methodNotAllowed();
}

export function DELETE(): Response {
  return methodNotAllowed();
}

function methodNotAllowed(): Response {
  return Response.json(
    {
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed.",
      },
      id: null,
    },
    {
      status: 405,
      headers: {
        Allow: "POST",
      },
    },
  );
}
