import { DirectoryItem } from "@/data/types";
import { ToolDetail } from "./detail/ToolDetail";
import { PromptDetail } from "./detail/PromptDetail";
import { WorkflowDetail } from "./detail/WorkflowDetail";
import { UseCaseDetail } from "./detail/UseCaseDetail";
import { ProjectDetail } from "./detail/ProjectDetail";
import { MonetizeDetail } from "./detail/MonetizeDetail";
import { GlossaryDetail } from "./detail/GlossaryDetail";

/* Thin dispatcher: each resource type renders its own dedicated template.
   Route files keep passing { item, type, basePath } unchanged. */
export function ResourceDetail({ item, basePath }: { item: DirectoryItem; type: string; basePath: string }) {
  if (basePath.includes("tools")) return <ToolDetail item={item} />;
  if (basePath.includes("prompts")) return <PromptDetail item={item} />;
  if (basePath.includes("workflows")) return <WorkflowDetail item={item} />;
  if (basePath.includes("use-cases")) return <UseCaseDetail item={item} />;
  if (basePath.includes("projects")) return <ProjectDetail item={item} />;
  if (basePath.includes("monetize")) return <MonetizeDetail item={item} />;
  return <GlossaryDetail item={item} />;
}
