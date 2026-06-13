import { INSTALL_OPTIONS } from "@/lib/product-data";
import { discoveryHeaders } from "@/lib/discovery-links";

export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(
    {
      installOptions: INSTALL_OPTIONS,
    },
    {
      headers: discoveryHeaders("application/json"),
    },
  );
}
