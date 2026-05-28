import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { createPromoMcpServer } from "@/lib/mcp-server";

export async function handlePromoMcpRequest(req: Request): Promise<Response> {
  const server = createPromoMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  try {
    await server.connect(transport);
    return await transport.handleRequest(req);
  } catch {
    return Response.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error.",
        },
        id: null,
      },
      { status: 500 },
    );
  } finally {
    await transport.close();
    await server.close();
  }
}
