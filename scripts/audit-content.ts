import fs from "node:fs";
import path from "node:path";

type ExtractedLesson = {
  code: string;
  title: string;
  slug: string;
};

type ExtractedModule = {
  lessons: ExtractedLesson[];
};

type ExtractedCourse = {
  modules: ExtractedModule[];
};

const root = process.cwd();
const outDir = path.join(root, "reports");
const label = process.argv[2]?.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
const outFile = path.join(outDir, label ? `content-audit-${label}.json` : "content-audit-latest.json");

const repeatedPhrases = [
  "perlu dipahami sebagai bagian dari",
  "Ini penting karena lesson",
  "Kesalahan umum: menganggap",
  "tanpa harus hafal jargon",
  "Kita bongkar",
  "Contoh paling gampang",
  "Output lolos checklist",
  "Bukan cuma definisi",
  "Checklist tambahan"
];

const acronymPatterns = [
  "aPI",
  "lLM",
  "rAG",
  "jSON",
  "hTTP",
  "oAuth",
  "mCP"
];

const mixedLanguageFragments = [
  "Define",
  "Process",
  "Using",
  "Not utilizing",
  "Best for",
  "Choose model",
  "Setup",
  "Implement",
  "Monitor",
  "Optimize",
  "output final"
];

const genericFragments = [
  "sesuai kebutuhan",
  "meningkatkan efisiensi",
  "membantu pekerjaan",
  "hasil yang lebih baik",
  "mengoptimalkan proses"
];

function readText(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(dir: string, files: string[] = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git", "reports"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(ts|tsx|json|md)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function countMatches(text: string, phrase: string, caseSensitive = false) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (text.match(new RegExp(escaped, caseSensitive ? "g" : "gi")) || []).length;
}

function countEnglishFragment(text: string, phrase: string) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  return (text.match(new RegExp(`\\b${escaped}\\b`, "g")) || []).length;
}

function contentForAudit(file: string, text: string) {
  if (file.endsWith(path.join("src", "data", "expanded.ts"))) {
    return text.replace(/function naturalToolText[\s\S]*?function naturalToolList/, "function naturalToolList");
  }
  return text;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractQuotedStrings(text: string) {
  const strings: string[] = [];
  const regex = /(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text))) {
    const value = match[2]
      .replace(/\\n/g, " ")
      .replace(/\\"/g, "\"")
      .replace(/\\'/g, "'")
      .replace(/\s+/g, " ")
      .trim();
    if (value.length >= 60 && !value.includes("${")) strings.push(value);
  }
  return strings;
}

function collectJsonStrings(value: unknown, strings: string[] = []) {
  if (typeof value === "string") strings.push(value);
  else if (Array.isArray(value)) value.forEach(item => collectJsonStrings(item, strings));
  else if (value && typeof value === "object") Object.values(value).forEach(item => collectJsonStrings(item, strings));
  return strings;
}

function extractArrayAfter(source: string, marker: string) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return "";
  const start = source.indexOf("[", markerIndex);
  if (start === -1) return "";
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  return "";
}

function extractArraysAfter(source: string, marker: string) {
  const blocks: string[] = [];
  let offset = 0;
  while (offset < source.length) {
    const markerIndex = source.indexOf(marker, offset);
    if (markerIndex === -1) break;
    const block = extractArrayAfter(source.slice(markerIndex), marker);
    if (block) blocks.push(block);
    offset = markerIndex + marker.length;
  }
  return blocks;
}

function extractCourseRoutes(courseSource: string, extracted: ExtractedCourse) {
  const byCode = new Map(extracted.modules.flatMap(module => module.lessons.map(lesson => [lesson.code, lesson])));
  const modules: Array<{ moduleSlug: string; codes: string[] }> = [];
  const moduleRegex = /module\(\s*\d+\s*,\s*"([^"]+)"[\s\S]*?\[([^\]]*)\]\s*\)/g;
  let match: RegExpExecArray | null;
  while ((match = moduleRegex.exec(courseSource))) {
    const moduleSlug = match[1];
    const codes = Array.from(match[2].matchAll(/"([A-Z]\d{2}\.L\d{2})"/g)).map(item => item[1]);
    modules.push({ moduleSlug, codes });
  }
  return modules.flatMap(module =>
    module.codes.map(code => {
      const lesson = byCode.get(code);
      return lesson ? `/course/${module.moduleSlug}/${lesson.slug}` : `/course/${module.moduleSlug}/${code}`;
    })
  );
}

function countTopLevelArrays(block: string) {
  let count = 0;
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = 0; index < block.length; index += 1) {
    const char = block[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "[") {
      if (depth === 1 && /["'`]/.test(block.slice(index + 1).trimStart()[0] || "")) count += 1;
      depth += 1;
    } else if (char === "]") {
      depth -= 1;
    }
  }
  return count;
}

function topLevelTupleFirstStrings(block: string) {
  const values: string[] = [];
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = 0; index < block.length; index += 1) {
    const char = block[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "[") {
      if (depth === 1) {
        const rest = block.slice(index + 1).trimStart();
        const tupleQuote = rest[0];
        if (tupleQuote === "\"" || tupleQuote === "'" || tupleQuote === "`") {
          let value = "";
          let tupleEscaped = false;
          for (let inner = 1; inner < rest.length; inner += 1) {
            const innerChar = rest[inner];
            if (tupleEscaped) {
              value += innerChar;
              tupleEscaped = false;
            } else if (innerChar === "\\") {
              tupleEscaped = true;
            } else if (innerChar === tupleQuote) {
              values.push(value);
              break;
            } else {
              value += innerChar;
            }
          }
        }
      }
      depth += 1;
    } else if (char === "]") {
      depth -= 1;
    }
  }
  return values;
}

function between(source: string, startMarker: string, endMarker: string) {
  const start = source.indexOf(startMarker);
  if (start === -1) return "";
  const end = source.indexOf(endMarker, start);
  return source.slice(start, end === -1 ? undefined : end);
}

function countTitleObjectsInSection(source: string, startMarker: string, endMarker: string) {
  return (between(source, startMarker, endMarker).match(/\{title:/g) || []).length;
}

function countUniqueUrlsInToolSpecs(source: string) {
  const section = between(source, "const toolSpecs", "const seenToolUrls");
  return new Set(Array.from(section.matchAll(/url:"([^"]+)"/g)).map(match => match[1].toLowerCase())).size;
}

function buildReport() {
  const extracted = JSON.parse(readText("src/data/extracted-course.json")) as ExtractedCourse;
  const courseSource = readText("src/data/course.ts");
  const glossarySource = readText("src/data/glossary.ts");
  const useCasesSource = readText("src/data/useCases.ts");
  const expandedSource = readText("src/data/expanded.ts");
  const sourceFiles = walk(path.join(root, "src")).filter(file => !file.endsWith(path.join("src", "data", "extracted-course.json")));
  const combined = sourceFiles.map(file => contentForAudit(file, fs.readFileSync(file, "utf8"))).join("\n");
  const allStrings = sourceFiles.flatMap(file => {
    const text = contentForAudit(file, fs.readFileSync(file, "utf8"));
    if (file.endsWith(".json")) {
      try {
        return collectJsonStrings(JSON.parse(text));
      } catch {
        return extractQuotedStrings(text);
      }
    }
    return extractQuotedStrings(text);
  });

  const duplicateMap = new Map();
  for (const value of allStrings) {
    const normalized = value.toLowerCase().replace(/\s+/g, " ").trim();
    if (normalized.length < 80) continue;
    duplicateMap.set(normalized, (duplicateMap.get(normalized) || 0) + 1);
  }
  const duplicates = Array.from(duplicateMap.entries())
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([text, count]) => ({ count, text }));

  const courseRoutes = extractCourseRoutes(courseSource, extracted);
  const glossaryTerms = extractArraysAfter(glossarySource, "terms:").flatMap(block => topLevelTupleFirstStrings(block));
  const useCaseTitles = extractArraysAfter(useCasesSource, "items:").flatMap(block => topLevelTupleFirstStrings(block));
  const moduleRoutes = Array.from(courseSource.matchAll(/module\(\s*\d+\s*,\s*"([^"]+)"/g)).map(match => `/course/${match[1]}`);
  const promptCount = extractArraysAfter(expandedSource, "\"").length === 0
    ? 0
    : Array.from(expandedSource.matchAll(/"\w[\w &/-]*"\s*:\s*\[/g)).reduce((total, match) => {
      const block = extractArrayAfter(expandedSource.slice(match.index || 0), "[");
      return total + countTopLevelArrays(block);
    }, 0);

  const counts = {
    sourceLessons: extracted.modules.flatMap(module => module.lessons).length,
    renderedCourseLessons: new Set(Array.from(courseSource.matchAll(/"([A-Z]\d{2}\.L\d{2})"/g)).map(match => match[1])).size,
    courseModules: moduleRoutes.length,
    glossary: glossaryTerms.length,
    useCases: useCaseTitles.length,
    workflows: countTitleObjectsInSection(expandedSource, "const workflowSpecs", "export const expandedWorkflows"),
    tools: countUniqueUrlsInToolSpecs(expandedSource),
    prompts: promptCount,
    projects: countTitleObjectsInSection(expandedSource, "const projectSpecs", "export const expandedProjects"),
    monetization: countTitleObjectsInSection(expandedSource, "const monetizationSpecs", "export const expandedMonetization")
  };

  const routes = [
    "/",
    "/course",
    ...moduleRoutes,
    ...courseRoutes,
    "/glossary",
    ...glossaryTerms.map(term => `/glossary/${slugify(term)}`),
    "/use-cases",
    ...useCaseTitles.map(title => `/use-cases/${slugify(title)}`),
    "/workflows",
    "/tools",
    "/prompts",
    "/projects",
    "/monetize",
    "/roadmap",
    "/skill-check"
  ];

  return {
    generatedAt: new Date().toISOString(),
    counts,
    routes: {
      totalListed: routes.length,
      sample: routes.slice(0, 25),
      courseLessons: courseRoutes
    },
    repeatedPhrases: repeatedPhrases.map(phrase => ({ phrase, count: countMatches(combined, phrase) })).filter(item => item.count > 0),
    acronymErrors: acronymPatterns.map(pattern => ({ pattern, count: countMatches(combined, pattern, true) })).filter(item => item.count > 0),
    duplicateContent: duplicates,
    mixedLanguageFragments: mixedLanguageFragments.map(fragment => ({ fragment, count: countEnglishFragment(combined, fragment) })).filter(item => item.count > 0),
    genericCopy: genericFragments.map(fragment => ({ fragment, count: countMatches(combined, fragment) })).filter(item => item.count > 0)
  };
}

const report = buildReport();
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
