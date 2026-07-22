import { PageHero } from "@/components/Primitives";
import { ResourceExplorer } from "@/components/ResourceExplorer";
import { tools } from "@/data/library";

export const metadata = { title: "Tools AI" };

export default function Page() {
  const categories = new Set(tools.map(tool => tool.category)).size;
  return (
    <>
      <PageHero
        label={`${tools.length} tool · ${categories} kategori`}
        title="Tools AI yang worth dipelajari."
        description="Setiap tool dinilai dari fungsi, biaya, risiko privasi, dan siapa yang cocok pakai. Kalau ada alternatif open-source atau lebih murah, dicantumkan."
      />
      <section className="section-tight">
        <div className="container"><ResourceExplorer items={tools} basePath="/tools" /></div>
      </section>
    </>
  );
}
