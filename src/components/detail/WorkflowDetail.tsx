import { ReactNode } from "react";
import { DirectoryItem } from "@/data/types";
import { DetailHero, Shell, Main, Aside, Section, P, Lead, Card, MetaList, Checklist, StepFlow, MiniFlow, CopyBlock, SideCard, Related, BackToIndex } from "./DetailKit";
import { asArray, sameCategory, sectionContent, toRelated, toolsFromNames, workflows } from "./related";

export function WorkflowDetail({ item }: { item: DirectoryItem }) {
  const bestFor = sectionContent(item, "Cocok untuk") as string | undefined;
  const trigger = item.trigger || (sectionContent(item, "Kapan dipakai") as string | undefined);
  const inputs = item.inputs ?? asArray(sectionContent(item, "Input"));
  const wfTools = asArray(sectionContent(item, "Tools yang dibutuhkan"));
  const steps = asArray(sectionContent(item, "Langkah kerja"));
  const approvals = item.approvalPoints ?? asArray(sectionContent(item, "Titik approval"));
  const failures = item.failureModes ?? asArray(sectionContent(item, "Yang bisa salah"));
  const fallbacks = asArray(sectionContent(item, "Langkah cadangan"));
  const kpi = item.kpi ?? asArray(sectionContent(item, "Cara ukur keberhasilan"));
  const maintenance = sectionContent(item, "Perawatan") as string | undefined;
  const promptTemplates = asArray(sectionContent(item, "Prompt template"));
  const output = (item.outputs?.[0]) || (sectionContent(item, "Hasil akhirnya") as string | undefined);
  const checklist = asArray(sectionContent(item, "Checklist kualitas"));
  const monetize = sectionContent(item, "Cara monetize workflow ini") as string | undefined;

  const relatedTools = toolsFromNames(wfTools, 4);
  const relatedWorkflows = sameCategory(workflows, item, 3);

  const sideRows: { k: string; v: ReactNode }[] = [];
  if (item.industry) sideRows.push({ k: "Industri", v: item.industry });
  if (trigger) sideRows.push({ k: "Kapan dipakai", v: trigger });
  if (item.estimatedSetup) sideRows.push({ k: "Estimasi setup", v: item.estimatedSetup });
  if (maintenance) sideRows.push({ k: "Perawatan", v: maintenance });

  return (
    <>
      <DetailHero
        backHref="/workflows"
        backLabel="Semua workflow"
        eyebrow={`Workflow · ${item.industry || item.category}`}
        title={item.title}
        description={item.description}
        meta={<><span className="pill">Level {item.level}</span>{item.estimatedSetup && <span className="pill">Setup {item.estimatedSetup}</span>}<span className="pill">{item.tag}</span></>}
      />
      <Shell>
        <Main>
          <Section kicker="Konteks" title="Cocok untuk siapa dan hasil akhirnya">
            {bestFor && <P>{bestFor}</P>}
            {output && <Lead><P><strong>Hasil akhirnya:</strong> {output}</P></Lead>}
          </Section>

          {inputs.length > 0 && (
            <Section kicker="Persiapan" title="Input yang perlu disiapkan">
              <Card><MetaList items={inputs} /></Card>
            </Section>
          )}

          <Section kicker="Alur" title="Gambaran singkat">
            <MiniFlow nodes={[
              { label: "Input", value: "Data & brief masuk" },
              { label: "Proses", value: "Langkah AI + tools" },
              { label: "Review", value: "Cek manusia" },
              { label: "Output", value: output ? output.split(",")[0] : "Hasil final" },
            ]} />
          </Section>

          {steps.length > 0 && (
            <Section kicker="Detail" title="Langkah kerja">
              <StepFlow steps={steps.map(step => ({ body: step }))} />
            </Section>
          )}

          {approvals.length > 0 && (
            <Section kicker="Kontrol" title="Titik yang wajib dicek manusia">
              <P>Automasi tidak berarti tanpa pengawasan. Berhenti dan minta review pada titik berikut sebelum hasil dipakai keluar:</P>
              <Card><MetaList items={approvals} /></Card>
            </Section>
          )}

          {failures.length > 0 && (
            <Section kicker="Antisipasi" title="Yang bisa salah, dan cara jaga-jaga">
              <Card><MetaList items={failures} /></Card>
              {fallbacks.length > 0 && <Lead><P><strong>Kalau terjadi:</strong> {fallbacks.join(". ")}.</P></Lead>}
            </Section>
          )}

          {checklist.length > 0 && (
            <Section kicker="Quality gate" title="Checklist sebelum dianggap selesai">
              <Card><Checklist items={checklist} /></Card>
            </Section>
          )}

          {(item.estimatedSetup || maintenance) && (
            <Section kicker="Automasi" title="Kapan layak diotomasi">
              <P>Jalankan manual dulu sampai hasilnya konsisten. Otomasi baru masuk akal kalau input sudah konsisten, output punya format jelas, error bisa dideteksi, dan masih ada titik review manusia. {maintenance}</P>
            </Section>
          )}

          {promptTemplates.length > 0 && (
            <Section kicker="Prompt" title="Prompt yang bisa dipakai">
              {promptTemplates.map((prompt, index) => <div key={index} style={{ marginBottom: 16 }}><CopyBlock text={prompt} label="Salin prompt" /></div>)}
            </Section>
          )}

          {kpi.length > 0 && (
            <Section kicker="Ukuran" title="Cara ukur keberhasilan">
              <Card><MetaList items={kpi} /></Card>
            </Section>
          )}

          {monetize && (
            <Section kicker="Monetisasi" title="Cara menjual workflow ini">
              <P>{monetize}</P>
            </Section>
          )}

          <BackToIndex href="/workflows" label="Lihat workflow lain" />
        </Main>
        <Aside>
          <SideCard type="Workflow" tag={item.tag} title={item.title} rows={sideRows} />
          {relatedTools.length > 0 && <Related title="Tools yang dipakai" items={toRelated(relatedTools, "/tools", false)} />}
          {relatedWorkflows.length > 0 && <Related title={`Workflow lain di ${item.category}`} items={toRelated(relatedWorkflows, "/workflows", false)} />}
        </Aside>
      </Shell>
    </>
  );
}
