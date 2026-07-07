import json
import re
from pathlib import Path
from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph
from docx.oxml.table import CT_Tbl
from docx.oxml.text.paragraph import CT_P

SOURCE=Path(r"C:\Users\oktav\Downloads\Materi_Lengkap_Course_AI_Learning_OS_Indonesia.docx")
OUTPUT=Path(r"C:\Users\oktav\Documents\New project\src\data\extracted-appendices.json")
doc=Document(SOURCE)
data={"useCases":[],"prompts":[],"workflows":[],"projects":[],"glossary":[],"quiz":[]}
appendix=""; subheading=""

def clean(value): return re.sub(r"\s+"," ",value).strip()

for child in doc.element.body.iterchildren():
  if isinstance(child,CT_P):
    p=Paragraph(child,doc); text=clean(p.text); style=p.style.name if p.style else ""
    if style=="Heading 1" and text.startswith("APPENDIX"):
      appendix=text; subheading=""
    elif appendix.startswith("APPENDIX A") and style=="Heading 2":
      subheading=text
    elif appendix.startswith("APPENDIX A") and style.startswith("List") and text:
      data["useCases"].append({"title":text,"category":subheading})
  elif isinstance(child,CT_Tbl):
    table=Table(child,doc)
    rows=[[clean(cell.text) for cell in row.cells] for row in table.rows]
    if appendix.startswith("APPENDIX B"):
      data["prompts"] += [{"title":r[0],"template":r[1]} for r in rows[1:] if len(r)>1 and r[0]]
    elif appendix.startswith("APPENDIX C"):
      data["workflows"] += [{"title":r[0],"steps":r[1],"audience":r[2]} for r in rows[1:] if len(r)>2 and r[0]]
    elif appendix.startswith("APPENDIX D"):
      data["projects"] += [{"level":r[0],"title":r[1],"description":r[2]} for r in rows[1:] if len(r)>2 and r[1]]
    elif appendix.startswith("APPENDIX E"):
      data["glossary"] += [{"title":r[0],"definition":r[1]} for r in rows[1:] if len(r)>1 and r[0]]
    elif appendix.startswith("APPENDIX F"):
      data["quiz"] += [{"topic":r[0],"question":r[1],"answer":r[2]} for r in rows[1:] if len(r)>2 and r[1]]

OUTPUT.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding="utf-8")
print(f"Wrote {OUTPUT}")
for key,value in data.items(): print(f"{key}: {len(value)}")
