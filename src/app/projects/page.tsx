import { PageHero } from "@/components/Primitives";
import { ResourceExplorer } from "@/components/ResourceExplorer";
import { projects } from "@/data/library";

export const metadata = { title: "Project Bank" };

export default function Page() {
  return (
    <>
      <PageHero
        label={`${projects.length} project · level Pemula sampai Lanjutan`}
        title="Project untuk portfolio yang bisa ditanya detailnya."
        description="Pilih satu, bangun versi kecilnya dulu, tes dengan real input, lalu dokumentasikan prosesnya. Tutorial yang cuma dikonsumsi tidak masuk di portfolio."
      />
      <section className="section-tight">
        <div className="container"><ResourceExplorer items={projects} basePath="/projects" /></div>
      </section>
    </>
  );
}
