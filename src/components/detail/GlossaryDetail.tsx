import { DirectoryItem } from "@/data/types";
import { DetailHero, Shell, Main, Aside, Section, P, SideCard, Related, BackToIndex } from "./DetailKit";
import { asArray, glossary, glossaryByNames, sectionContent, toRelated } from "./related";

export function GlossaryDetail({ item }: { item: DirectoryItem }) {
  const plain = sectionContent(item, `Apa itu ${item.title}`);
  const example = sectionContent(item, "Contoh");
  const why = sectionContent(item, "Kenapa penting");
  const mistake = sectionContent(item, "Yang sering keliru");
  const related = asArray(sectionContent(item, "Terkait"));
  const relatedTerms = glossaryByNames(related);
  const moreInCategory = glossary.filter(term => term !== item && term.category === item.category && !relatedTerms.includes(term)).slice(0, 3);

  return (
    <>
      <DetailHero
        backHref="/glossary"
        backLabel="Kamus AI"
        eyebrow={`Istilah · ${item.category}`}
        title={item.title}
        description={item.description}
        meta={<><span className="pill">{item.category}</span><span className="pill">Level {item.level}</span></>}
      />
      <Shell>
        <Main>
          {plain && <Section kicker="Penjelasan" title={`Apa itu ${item.title}`}><P>{plain as string}</P></Section>}
          {example && <Section kicker="Contoh" title="Kelihatan seperti apa di praktik"><P>{example as string}</P></Section>}
          {why && <Section kicker="Kenapa relevan" title="Kenapa istilah ini penting"><P>{why as string}</P></Section>}
          {mistake && <Section kicker="Hati-hati" title="Yang sering keliru dipahami"><P>{mistake as string}</P></Section>}
          <BackToIndex href="/glossary" label="Lihat istilah lain" />
        </Main>
        <Aside>
          <SideCard
            type="Istilah"
            tag={item.level}
            title={item.title}
            rows={[
              { k: "Kategori", v: item.category },
              { k: "Level", v: item.level },
              { k: "Terkait", v: related.join(", ") || "-" },
            ]}
          />
          {relatedTerms.length > 0 && <Related title="Istilah terkait" items={toRelated(relatedTerms, "/glossary", false)} />}
          {moreInCategory.length > 0 && <Related title={`Lainnya di ${item.category}`} items={toRelated(moreInCategory, "/glossary", false)} />}
        </Aside>
      </Shell>
    </>
  );
}
