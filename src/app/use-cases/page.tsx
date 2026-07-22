import { PageHero } from "@/components/Primitives";
import { ResourceExplorer } from "@/components/ResourceExplorer";
import { useCases } from "@/data/library";

export const metadata = { title: "Use Cases" };

export default function Page() {
  const categories = new Set(useCases.map(useCase => useCase.category)).size;
  return (
    <>
      <PageHero
        label={`${useCases.length} contoh · ${categories} kategori pekerjaan`}
        title="Contoh nyata AI dipakai di kerja sehari-hari."
        description="Bagian yang paling laku diotomasi biasanya bukan pekerjaan besar, tapi bagian yang repetitif: bersihkan data, buat draft awal, cek fakta, dan mindahin informasi antar sistem. Setiap use case di sini punya langkah detail, tools yang direkomendasikan, dan template prompt."
      />
      <section className="section-tight">
        <div className="container"><ResourceExplorer items={useCases} basePath="/use-cases" /></div>
      </section>
    </>
  );
}
