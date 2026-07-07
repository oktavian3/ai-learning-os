import json
import re
import unicodedata
from pathlib import Path

from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph
from docx.oxml.table import CT_Tbl
from docx.oxml.text.paragraph import CT_P

SOURCE = Path(r"C:\Users\oktav\Downloads\Materi_Lengkap_Course_AI_Learning_OS_Indonesia.docx")
OUTPUT = Path(r"C:\Users\oktav\Documents\New project\src\data\extracted-course.json")

def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode().lower()
    value = re.sub(r"^m\d+\.l\d+\s*[-–—]\s*", "", value)
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value[:80]

def iter_blocks(doc):
    for child in doc.element.body.iterchildren():
        if isinstance(child, CT_P):
            yield Paragraph(child, doc)
        elif isinstance(child, CT_Tbl):
            yield Table(child, doc)

def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()

doc = Document(SOURCE)
modules = []
current_module = None
current_lesson = None
current_section = None
allowed_sections = {
    "Konsep kunci": "concepts",
    "Materi utama": "content",
    "Contoh praktis": "examples",
    "Latihan": "exercises",
    "Prompt praktik": "prompts",
    "Quiz singkat": "quiz",
    "Assignment": "assignments",
    "Catatan implementasi website": "notes",
}

for block in iter_blocks(doc):
    if isinstance(block, Paragraph):
        text = clean(block.text)
        if not text:
            continue
        style = block.style.name if block.style else ""
        if style == "Heading 1" and re.match(r"MODULE\s+\d+", text, re.I):
            match = re.match(r"MODULE\s+(\d+)\s*[-–—]\s*(.+)", text, re.I)
            if not match:
                continue
            current_module = {"sourceNumber": int(match.group(1)), "sourceTitle": clean(match.group(2)), "lessons": []}
            modules.append(current_module)
            current_lesson = None
            current_section = None
            continue
        if style == "Heading 2" and re.match(r"M\d+\.L\d+", text, re.I) and current_module:
            code, title = re.split(r"\s*[-–—]\s*", text, maxsplit=1)
            current_lesson = {
                "code": code.upper(), "title": clean(title), "slug": slugify(text),
                "concepts": [], "content": [], "examples": [], "exercises": [],
                "prompts": [], "quiz": [], "assignments": [], "notes": []
            }
            current_module["lessons"].append(current_lesson)
            current_section = None
            continue
        if style == "Heading 3" and current_lesson:
            current_section = allowed_sections.get(text)
            continue
        if current_lesson and current_section:
            current_lesson[current_section].append(text)
    elif isinstance(block, Table) and current_lesson and current_section:
        for row in block.rows:
            cells = [clean(cell.text) for cell in row.cells if clean(cell.text)]
            if cells:
                current_lesson[current_section].append(" | ".join(cells))

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(json.dumps({"source": SOURCE.name, "modules": modules}, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Wrote {OUTPUT}")
print(f"Modules: {len(modules)}")
print(f"Lessons: {sum(len(m['lessons']) for m in modules)}")
for module in modules:
    print(f"M{module['sourceNumber']:02d}: {len(module['lessons'])} lessons")
