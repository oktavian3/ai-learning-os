import { PageHero } from "@/components/Primitives";
import { ResourceExplorer } from "@/components/ResourceExplorer";
import { monetization } from "@/data/library";

export const metadata = { title: "Monetize Skill AI" };

export default function Page() {
  return (
    <>
      <PageHero
        label={`${monetization.length} model bisnis · tanpa janji cuan semalam`}
        title="Cara jualan skill AI supaya benar-benar dibayar."
        description="Yang bikin klien bayar bukan skill AI, tapi masalah spesifik yang berhasil dibereskan. Setiap model bisnis di sini punya profil klien, deliverable yang jelas, dan starter project untuk portfolio."
      />
      <section className="section-tight">
        <div className="container"><ResourceExplorer items={monetization} basePath="/monetize" /></div>
      </section>
    </>
  );
}
