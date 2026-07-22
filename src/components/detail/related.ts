import { DirectoryItem } from "@/data/types";
import { resourceSlug } from "@/data/resources";
import { tools, prompts, workflows, projects, monetization, glossary, useCases } from "@/data/library";
import { RelatedItem } from "./DetailKit";

/* All matching below returns real existing items only. No fabrication. */

const sectionContent = (item: DirectoryItem, title: string) =>
  item.sections?.find(section => section.title === title)?.content;

const asArray = (content: string | string[] | undefined): string[] =>
  content === undefined ? [] : Array.isArray(content) ? content : [content];

export function toRelated(items: DirectoryItem[], basePath: string, showCat = true): RelatedItem[] {
  return items.map(item => ({ href: `${basePath}/${resourceSlug(item)}`, title: item.title, cat: showCat ? item.category : undefined }));
}

export function sameCategory(items: DirectoryItem[], current: DirectoryItem, max = 3): DirectoryItem[] {
  return items.filter(item => item !== current && item.category === current.category).slice(0, max);
}

/* Tools whose name appears in a list of free-text tool strings (workflow/project/use-case tools). */
export function toolsFromNames(names: string[], max = 4): DirectoryItem[] {
  const out: DirectoryItem[] = [];
  for (const name of names) {
    const match = tools.find(tool => name.toLowerCase().includes(tool.title.toLowerCase()) && !out.includes(tool));
    if (match) out.push(match);
    if (out.length >= max) break;
  }
  return out;
}

/* Workflows that list a given tool among their required tools. */
export function workflowsUsingTool(toolTitle: string, max = 3): DirectoryItem[] {
  const needle = toolTitle.toLowerCase();
  return workflows
    .filter(workflow => asArray(sectionContent(workflow, "Tools yang dibutuhkan")).some(t => t.toLowerCase().includes(needle)))
    .slice(0, max);
}

/* Glossary entries matching a list of related term names. */
export function glossaryByNames(names: string[], max = 5): DirectoryItem[] {
  const out: DirectoryItem[] = [];
  for (const name of names) {
    const match = glossary.find(term => term.title.toLowerCase() === name.toLowerCase() && !out.includes(term));
    if (match) out.push(match);
    if (out.length >= max) break;
  }
  return out;
}

/* A project whose title is referenced in a piece of text (e.g. monetize portfolio starter). */
export function projectFromText(text: string): DirectoryItem | undefined {
  return projects.find(project => text.toLowerCase().includes(project.title.toLowerCase()));
}

export { tools, prompts, workflows, projects, monetization, glossary, useCases, sectionContent, asArray };
