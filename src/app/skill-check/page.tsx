import { PageHero } from "@/components/Primitives";
import { SkillCheck } from "@/components/SkillCheck";

export const metadata = { title: "Cek Level AI" };

export default function Page() {
  return (
    <>
      <PageHero
        label="10 pertanyaan · 3 menit"
        title="Sekarang di level berapa?"
        description="Bukan ujian, cuma cara ngasih rekomendasi mulai dari level mana. Kalau workflow dasar belum pernah dibikin, tidak masuk akal mulai dari agent orchestration."
      />
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 820 }}><SkillCheck /></div>
      </section>
    </>
  );
}
