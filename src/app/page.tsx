import { AgentModeView } from "@/components/AgentMode/AgentModeView";
import { PromoPage } from "@/components/PromoPage/PromoPage";

type HomeProps = {
  searchParams?: Promise<{
    mode?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomeProps = {}) {
  const params = await searchParams;
  const mode = Array.isArray(params?.mode) ? params.mode[0] : params?.mode;

  if (mode === "agent") {
    return <AgentModeView />;
  }

  return <PromoPage />;
}
