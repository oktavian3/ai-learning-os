import { DirectoryItem } from "@/data/types";
import { DetailHero, Shell, Main, Aside, Section, P, Lead, Card, MetaList, Checklist, StepFlow, CopyBlock, SideCard, Related, BackToIndex } from "./DetailKit";
import { asArray, sameCategory, sectionContent, toRelated, toolsFromNames, useCases } from "./related";

export function UseCaseDetail({ item }: { item: DirectoryItem }) {
  const target = sectionContent(item, "Cocok untuk") as string | undefined;
  const goal = sectionContent(item, "Yang mau dicapai") as string | undefined;
  const ucTools = asArray(sectionContent(item, "Tools yang bisa dipakai"));
  const steps = asArray(sectionContent(item, "Langkah kerja"));
  const prompt = sectionContent(item, "Prompt template") as string | undefined;
  const output = sectionContent(item, "Output yang diharapkan") as string | undefined;
  const checklist = asArray(sectionContent(item, "Cek kualitas"));
  const monetize = sectionContent(item, "Cara monetize") as string | undefined;

  const relatedTools = toolsFromNames(ucTools, 4);
  const relatedCases = sameCategory(useCases, item, 3);

  return (
    <>
      <DetailHero
        backHref="/use-cases"
        backLabel="Semua use case"
        eyebrow={`Use case · ${item.category}`}
        title={item.title}
        description={item.description}
        meta={<><span className="pill">{item.category}</span><span className="pill">Level {item.level}</span><span className="pill">{item.tag}</span></>}
      />
      <Shell>
        <Main>
          {(target || goal) && (
            <Section kicker="Konteks" title="Cocok untuk siapa dan tujuannya">
              {target && <P><strong>Cocok untuk:</strong> {target}</P>}
              {goal && <P>{goal}</P>}
            </Section>
          )}

          {ucTools.length > 0 && (
            <Section kicker="Persiapan" title="Tools yang bisa dipakai">
              <Card><MetaList items={ucTools} /></Card>
            </Section>
          )}

          {steps.length > 0 && (
            <Section kicker="Detail" title="Langkah kerja">
              <StepFlow steps={steps.map(step => ({ body: step }))} />
            </Section>
          )}

          {prompt && (
            <Section kicker="Prompt" title="Prompt yang dipakai">
              <CopyBlock text={prompt} label="Salin prompt" />
            </Section>
          )}

          {output && (
            <Section kicker="Hasil" title="Output yang diharapkan">
              <P>{output}</P>
            </Section>
          )}

          {checklist.length > 0 && (
            <Section kicker="Quality gate" title="Cek kualitas sebelum dipakai">
              <P>Sebelum hasil dipakai untuk hal penting atau dikirim ke orang lain, lewati checklist ini dulu. Bagian ini juga menandai di mana review manusia paling penting.</P>
              <Card><Checklist items={checklist} /></Card>
            </Section>
          )}

          {monetize && (
            <Section kicker="Monetisasi" title="Cara menjadikannya layanan">
              <Lead><P>{monetize}</P></Lead>
            </Section>
          )}

          <BackToIndex href="/use-cases" label="Lihat use case lain" />
        </Main>
        <Aside>
          <SideCard
            type="Use case"
            tag={item.tag}
            title={item.title}
            rows={[
              { k: "Kategori", v: item.category },
              { k: "Level", v: item.level },
              { k: "Estimasi", v: item.tag },
            ]}
          />
          {relatedTools.length > 0 && <Related title="Tools yang dipakai" items={toRelated(relatedTools, "/tools", false)} />}
          {relatedCases.length > 0 && <Related title={`Use case lain di ${item.category}`} items={toRelated(relatedCases, "/use-cases", false)} />}
        </Aside>
      </Shell>
    </>
  );
}
