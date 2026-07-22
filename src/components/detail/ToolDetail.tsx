import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { DirectoryItem } from "@/data/types";
import { DetailHero, Shell, Main, Aside, Section, P, Card, MetaList, StepFlow, SideCard, Related, BackToIndex } from "./DetailKit";
import { asArray, sameCategory, sectionContent, toRelated, tools, workflowsUsingTool } from "./related";

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
function formatVerified(value?: string) {
  if (!value) return null;
  const match = value.match(/^(\d{4})-(\d{2})/);
  if (!match) return `Verified ${value}`;
  const month = monthNames[Number(match[2]) - 1];
  return month ? `Verified ${month} ${match[1]}` : `Verified ${match[1]}`;
}

export function ToolDetail({ item }: { item: DirectoryItem }) {
  const useFor = asArray(sectionContent(item, "Kegunaan utama"));
  const notFor = item.notFor ?? asArray(sectionContent(item, "Hindari untuk"));
  const mistakes = asArray(sectionContent(item, "Kesalahan yang sering muncul"));
  const flow = asArray(sectionContent(item, "Contoh workflow"));
  const alternatives = asArray(sectionContent(item, "Alternatif"));
  const privacy = sectionContent(item, "Catatan privacy") as string | undefined;
  const verified = formatVerified(item.lastVerified);

  const relatedTools = sameCategory(tools, item, 3);
  const relatedWorkflows = workflowsUsingTool(item.title, 3);

  const sideRows: { k: string; v: ReactNode }[] = [
    { k: "Kategori", v: item.category },
    { k: "Harga", v: item.pricingLabel || item.tag },
    { k: "Level", v: item.level },
  ];
  if (item.platforms?.length) sideRows.push({ k: "Platform", v: item.platforms.join(", ") });
  if (verified) sideRows.push({ k: "Diverifikasi", v: verified });

  return (
    <>
      <DetailHero
        backHref="/tools"
        backLabel="Semua tools"
        eyebrow={`Tool · ${item.category}`}
        title={item.title}
        description={item.description}
        meta={<><span className="pill">{item.category}</span><span className="pill">{item.pricingLabel || item.tag}</span><span className="pill">Level {item.level}</span></>}
      />
      <Shell>
        <Main>
          {useFor.length > 0 && (
            <Section kicker="Paling cocok untuk" title="Kapan tool ini benar-benar berguna">
              <P>Beri konteks yang cukup di setiap permintaan, seperti tujuan, audience, dan batasan. Hasil pertama biasanya masih umum, jadi perlakukan sebagai draft yang masih diperbaiki, bukan jawaban final.</P>
              <Card><MetaList items={useFor} /></Card>
            </Section>
          )}

          {flow.length > 0 && (
            <Section kicker="Alur pakai" title="Contoh cara memakainya">
              <StepFlow steps={flow.map(step => ({ body: step }))} />
            </Section>
          )}

          {notFor.length > 0 && (
            <Section kicker="Batas" title="Kapan sebaiknya tidak dipakai">
              <P>Tidak semua pekerjaan cocok diserahkan ke tool ini. Beberapa situasi yang lebih baik ditangani cara lain atau tetap butuh keputusan manusia:</P>
              <Card><MetaList items={notFor} /></Card>
            </Section>
          )}

          {mistakes.length > 0 && (
            <Section kicker="Hindari" title="Kesalahan yang sering muncul">
              <Card><MetaList items={mistakes} /></Card>
            </Section>
          )}

          {privacy && (
            <Section kicker="Risiko & privasi" title="Yang perlu diperhatikan sebelum pakai">
              <P>{privacy}</P>
            </Section>
          )}

          {alternatives.length > 0 && (
            <Section kicker="Alternatif" title="Tool lain yang sering dibandingkan">
              <P>Alternatif berikut sering dipertimbangkan di kategori {item.category}. Pilih berdasarkan kecocokan dengan workflow dan kebijakan data, bukan sekadar popularitas.</P>
              <Card><MetaList items={alternatives} /></Card>
            </Section>
          )}

          <BackToIndex href="/tools" label="Lihat tool lain" />
        </Main>
        <Aside>
          <SideCard
            type="Tool"
            tag={item.pricingLabel || item.tag}
            title={item.title}
            rows={sideRows}
            cta={
              <>
                {item.officialUrl && <a className="btn btn-primary btn-sm" href={item.officialUrl} target="_blank" rel="noopener noreferrer">Buka website resmi<ArrowUpRight className="arrow-icon" size={13} /></a>}
                {item.docsUrl && item.docsUrl !== item.officialUrl && <a className="btn btn-sm" href={item.docsUrl} target="_blank" rel="noopener noreferrer">Dokumentasi<ArrowUpRight size={13} /></a>}
              </>
            }
          />
          {relatedWorkflows.length > 0 && <Related title="Workflow yang memakai tool ini" items={toRelated(relatedWorkflows, "/workflows")} />}
          {relatedTools.length > 0 && <Related title={`Tool lain di ${item.category}`} items={toRelated(relatedTools, "/tools", false)} />}
        </Aside>
      </Shell>
    </>
  );
}
