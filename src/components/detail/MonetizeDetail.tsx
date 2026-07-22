import { DirectoryItem } from "@/data/types";
import { DetailHero, Shell, Main, Aside, Section, P, Lead, Card, MetaList, SideCard, Related, BackToIndex } from "./DetailKit";
import { asArray, monetization, projectFromText, sectionContent, toRelated } from "./related";

export function MonetizeDetail({ item }: { item: DirectoryItem }) {
  const client = sectionContent(item, "Siapa yang membayar") as string | undefined;
  const deliverables = asArray(sectionContent(item, "Yang diterima klien"));
  const starter = asArray(sectionContent(item, "Paket starter"));
  const premium = asArray(sectionContent(item, "Paket premium"));
  const proof = asArray(sectionContent(item, "Bukti yang perlu disiapkan"));
  const outreach = sectionContent(item, "Cara mulai ngobrol") as string | undefined;
  const portfolio = sectionContent(item, "Project buat portfolio") as string | undefined;
  const mistakes = asArray(sectionContent(item, "Kesalahan yang sering muncul"));
  const realistic = sectionContent(item, "Batas realistis") as string | undefined;

  const starterProject = portfolio ? projectFromText(portfolio) : undefined;
  const otherModels = monetization.filter(model => model !== item).slice(0, 3);

  return (
    <>
      <DetailHero
        backHref="/monetize"
        backLabel="Semua model bisnis"
        eyebrow={`Model bisnis · Level ${item.level}`}
        title={item.title}
        description={item.description}
        meta={<><span className="pill">Level {item.level}</span><span className="pill">Model bisnis</span></>}
      />
      <Shell>
        <Main>
          {client && (
            <Section kicker="Pasar" title="Siapa yang membayar">
              <P>{client}</P>
            </Section>
          )}

          {deliverables.length > 0 && (
            <Section kicker="Deliverable" title="Yang diterima klien">
              <Card><MetaList items={deliverables} /></Card>
            </Section>
          )}

          {(starter.length > 0 || premium.length > 0) && (
            <Section kicker="Scope" title="Paket layanan">
              {starter.length > 0 && <><P><strong>Paket starter</strong>, buat masuk dengan scope kecil dan jelas:</P><Card><MetaList items={starter} /></Card></>}
              {premium.length > 0 && <><P style={{ marginTop: 16 }}><strong>Paket premium</strong>, kalau klien butuh cakupan dan pendampingan lebih:</P><Card><MetaList items={premium} /></Card></>}
            </Section>
          )}

          {proof.length > 0 && (
            <Section kicker="Bukti" title="Cara menunjukkan bukti kerja">
              <P>Klien tidak beli janji. Yang bikin mereka bayar adalah bukti spesifik bahwa masalah serupa pernah dibereskan. Siapkan ini sebelum menawarkan jasa:</P>
              <Card><MetaList items={proof} /></Card>
            </Section>
          )}

          {outreach && (
            <Section kicker="Outreach" title="Cara mulai ngobrol dengan calon klien">
              <P>{outreach}</P>
            </Section>
          )}

          {mistakes.length > 0 && (
            <Section kicker="Hindari" title="Kesalahan yang sering bikin scope melebar">
              <Card><MetaList items={mistakes} /></Card>
            </Section>
          )}

          {realistic && (
            <Section kicker="Ekspektasi" title="Batas realistis">
              <Lead><P>{realistic}</P></Lead>
            </Section>
          )}

          <BackToIndex href="/monetize" label="Lihat model bisnis lain" />
        </Main>
        <Aside>
          <SideCard
            type="Model bisnis"
            tag={`Level ${item.level}`}
            title={item.title}
            rows={[
              { k: "Klien", v: item.category },
              { k: "Level", v: item.level },
            ]}
          />
          {starterProject && <Related title="Starter project" items={toRelated([starterProject], "/projects", false)} />}
          {otherModels.length > 0 && <Related title="Model bisnis lain" items={toRelated(otherModels, "/monetize", false)} />}
        </Aside>
      </Shell>
    </>
  );
}
