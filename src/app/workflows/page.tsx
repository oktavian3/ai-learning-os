import { PageHero } from "@/components/Primitives";
import { ResourceExplorer } from "@/components/ResourceExplorer";
import { workflows } from "@/data/library";

export const metadata = { title: "Workflow Library" };

export default function Page() {
  const categories = new Set(workflows.map(workflow => workflow.category)).size;
  return (
    <>
      <PageHero
        label={`${workflows.length} workflow · ${categories} kategori`}
        title="Workflow yang sudah diuji di kerja nyata."
        description="Setiap workflow mulai dari masalah, langkah demi langkah, sampai output final. Aturan main: jalankan manual dulu sampai hasilnya konsisten. Otomasi datang setelah alurnya benar, tidak sebelum."
      />
      <section className="section-tight">
        <div className="container"><ResourceExplorer items={workflows} basePath="/workflows" /></div>
      </section>
    </>
  );
}
