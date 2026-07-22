import { DirectoryItem } from "@/data/types";
import { DetailHero, Shell, Main, Aside, Section, P, Lead, Card, MetaList, StepFlow, CopyBlock, SideCard, Related, BackToIndex } from "./DetailKit";
import { asArray, prompts, sameCategory, sectionContent, toRelated } from "./related";

export function PromptDetail({ item }: { item: DirectoryItem }) {
  const variables = asArray(sectionContent(item, "Variabel"));
  const usage = asArray(sectionContent(item, "Cara pakai"));
  const tips = asArray(sectionContent(item, "Tips untuk kategori ini"));
  const inputExample = sectionContent(item, "Contoh input") as string | undefined;
  const output = sectionContent(item, "Output yang diharapkan") as string | undefined;
  const related = sameCategory(prompts, item, 4);

  return (
    <>
      <DetailHero
        backHref="/prompts"
        backLabel="Prompt Library"
        eyebrow={`Prompt · ${item.category}`}
        title={item.title}
        description={item.description}
        meta={<><span className="pill">{item.category}</span><span className="pill">Level {item.level}</span><span className="pill">{variables.length} variabel</span></>}
      />
      <Shell>
        <Main>
          {item.action && (
            <Section kicker="Template" title="Prompt lengkap">
              <P>Ganti setiap teks dalam tanda kurung siku dengan konteks nyata sebelum menjalankan. Semakin spesifik konteksnya, semakin relevan hasilnya.</P>
              <CopyBlock text={item.action} label="Salin prompt" />
            </Section>
          )}

          {variables.length > 0 && (
            <Section kicker="Yang perlu diisi" title="Variabel dalam prompt">
              <Card><MetaList items={variables} /></Card>
            </Section>
          )}

          {inputExample && (
            <Section kicker="Contoh" title="Contoh input yang bisa dipakai">
              <Lead><P>{inputExample}</P></Lead>
            </Section>
          )}

          {output && (
            <Section kicker="Hasil" title="Output yang diharapkan">
              <P>{output}</P>
            </Section>
          )}

          {usage.length > 0 && (
            <Section kicker="Alur" title="Cara memakai prompt ini">
              <StepFlow steps={usage.map(step => ({ body: step }))} />
            </Section>
          )}

          {tips.length > 0 && (
            <Section kicker="Perbaiki hasil" title="Tips supaya output lebih tajam">
              <P>Kalau hasil pertama masih terlalu umum, salah format, atau tidak sesuai audience, biasanya masalahnya di konteks. Beberapa hal yang membantu untuk kategori ini:</P>
              <Card><MetaList items={tips} /></Card>
            </Section>
          )}

          <BackToIndex href="/prompts" label="Lihat prompt lain" />
        </Main>
        <Aside>
          <SideCard
            type="Prompt"
            tag="Template"
            title={item.title}
            rows={[
              { k: "Kategori", v: item.category },
              { k: "Level", v: item.level },
              { k: "Variabel", v: variables.join(", ") || "-" },
            ]}
          />
          {related.length > 0 && <Related title={`Prompt lain di ${item.category}`} items={toRelated(related, "/prompts", false)} />}
        </Aside>
      </Shell>
    </>
  );
}
