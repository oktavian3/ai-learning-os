import { PageHero } from "@/components/Primitives";
import { ResourceExplorer } from "@/components/ResourceExplorer";
import { prompts } from "@/data/library";

export const metadata = { title: "Prompt Library" };

export default function Page() {
  const categories = new Set(prompts.map(prompt => prompt.category)).size;
  return (
    <>
      <PageHero
        label={`${prompts.length} template · ${categories} kategori`}
        title="Prompt yang sudah teruji, siap disesuaikan."
        description="Setiap template punya variabel yang bisa diganti, contoh input, dan hasil yang diharapkan. Template ini titik awal, bukan jawaban akhir. Setelah disalin, tetap isi konteks spesifik dan cek hasilnya sebelum dipakai untuk hal penting."
      />
      <section className="section-tight">
        <div className="container"><ResourceExplorer items={prompts} basePath="/prompts" copyable /></div>
      </section>
    </>
  );
}
