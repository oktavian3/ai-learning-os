import { DirectoryItem } from "@/data/types";
import { DetailHero, Shell, Main, Aside, Section, P, Lead, Card, MetaList, Checklist, StepFlow, SideCard, Related, BackToIndex } from "./DetailKit";
import { asArray, projects, sectionContent, toRelated, toolsFromNames } from "./related";

export function ProjectDetail({ item }: { item: DirectoryItem }) {
  const output = sectionContent(item, "Hasil akhirnya") as string | undefined;
  const completion = asArray(sectionContent(item, "Selesai kalau"));
  const smallStart = sectionContent(item, "Versi kecil untuk mulai") as string | undefined;
  const prTools = asArray(sectionContent(item, "Tools"));
  const steps = asArray(sectionContent(item, "Langkah kerja"));
  // proofItems() puts the portfolio line first; it gets its own section below, so drop it here to avoid repeating it.
  const proofAll = asArray(sectionContent(item, "Bukti yang bisa ditunjukkan"));
  const portfolioText = sectionContent(item, "Cara masukin ke portfolio") as string | undefined;
  const proof = proofAll.filter(entry => entry !== portfolioText);
  const upgrades = asArray(sectionContent(item, "Kalau mau dinaikkan levelnya"));
  const portfolio = sectionContent(item, "Cara masukin ke portfolio") as string | undefined;

  const estimasi = item.details.find(detail => detail.startsWith("Estimasi:"))?.replace("Estimasi: ", "") || item.tag;
  const relatedTools = toolsFromNames(prTools, 4);
  const relatedProjects = projects.filter(project => project !== item && project.level === item.level).slice(0, 3);

  return (
    <>
      <DetailHero
        backHref="/projects"
        backLabel="Semua project"
        eyebrow={`Project · Level ${item.level}`}
        title={item.title}
        description={item.description}
        meta={<><span className="pill">Level {item.level}</span><span className="pill">Estimasi {estimasi}</span></>}
      />
      <Shell>
        <Main>
          {(output || completion.length > 0) && (
            <Section kicker="Target" title="Hasil akhir yang mau dicapai">
              {output && <P>{output}</P>}
              {completion.length > 0 && <Card><Checklist items={completion} /></Card>}
            </Section>
          )}

          {smallStart && (
            <Section kicker="Mulai kecil" title="Versi kecil untuk memulai">
              <Lead><P>{smallStart}</P></Lead>
            </Section>
          )}

          {prTools.length > 0 && (
            <Section kicker="Persiapan" title="Tools yang dipakai">
              <Card><MetaList items={prTools} /></Card>
            </Section>
          )}

          {steps.length > 0 && (
            <Section kicker="Build" title="Langkah membangun">
              <StepFlow steps={steps.map(step => ({ body: step }))} />
            </Section>
          )}

          {proof.length > 0 && (
            <Section kicker="Dokumentasi" title="Bukti kerja yang disiapkan">
              <P>Ini yang membedakan project dari sekadar tutorial: hasilnya bisa dibuka, dites, dan dijelaskan prosesnya. Siapkan bukti berikut supaya project layak masuk portfolio.</P>
              <Card><MetaList items={proof} /></Card>
            </Section>
          )}

          {upgrades.length > 0 && (
            <Section kicker="Level up" title="Kalau mau dinaikkan levelnya">
              <Card><MetaList items={upgrades} /></Card>
            </Section>
          )}

          {portfolio && (
            <Section kicker="Portfolio" title="Cara memasukkannya ke portfolio">
              <P>{portfolio}</P>
            </Section>
          )}

          <BackToIndex href="/projects" label="Lihat project lain" />
        </Main>
        <Aside>
          <SideCard
            type="Project"
            tag={`Level ${item.level}`}
            title={item.title}
            rows={[
              { k: "Level", v: item.level },
              { k: "Estimasi", v: estimasi },
              { k: "Output", v: output ? output.split(",")[0] : "-" },
            ]}
          />
          {relatedTools.length > 0 && <Related title="Tools yang dipakai" items={toRelated(relatedTools, "/tools", false)} />}
          {relatedProjects.length > 0 && <Related title={`Project lain level ${item.level}`} items={toRelated(relatedProjects, "/projects", false)} />}
        </Aside>
      </Shell>
    </>
  );
}
