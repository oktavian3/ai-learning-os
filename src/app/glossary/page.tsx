import { PageHero } from "@/components/Primitives";
import { ResourceExplorer } from "@/components/ResourceExplorer";
import { glossary } from "@/data/library";

export const metadata = { title: "Kamus AI" };

export default function Page() {
  const categories = new Set(glossary.map(term => term.category)).size;
  return (
    <>
      <PageHero
        label={`${glossary.length} istilah · ${categories} kategori`}
        title="Kamus istilah AI dalam Bahasa Indonesia."
        description="Semua istilah datang dengan definisi singkat, penjelasan konteks, contoh penggunaan, dan istilah terkait. Beberapa istilah punya perbandingan dengan istilah yang sering dianggap sama."
      />
      <section className="section-tight">
        <div className="container"><ResourceExplorer items={glossary} basePath="/glossary" /></div>
      </section>
    </>
  );
}
