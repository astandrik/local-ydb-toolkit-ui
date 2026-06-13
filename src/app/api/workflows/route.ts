import { WORKFLOWS } from "@/lib/product-data";
import { discoveryHeaders } from "@/lib/discovery-links";

export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(
    {
      workflows: WORKFLOWS,
    },
    {
      headers: discoveryHeaders("application/json"),
    },
  );
}
