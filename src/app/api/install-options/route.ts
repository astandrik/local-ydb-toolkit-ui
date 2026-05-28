import { INSTALL_OPTIONS } from "@/lib/product-data";

export const runtime = "nodejs";

export function GET(): Response {
  return Response.json(
    {
      installOptions: INSTALL_OPTIONS,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600",
      },
    },
  );
}
