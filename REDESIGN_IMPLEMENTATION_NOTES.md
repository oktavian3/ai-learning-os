# Nurai Redesign Implementation Notes

Redesign end to end mengikuti `NURAI_REDESIGN_PROMPT_PACK` + `NURAI_LABS_COPY_AUDIT.md`, dengan referensi visual/motion dari rekaman skazy.ai (bahasa visualnya diadaptasi, aset dibuat dari nol, aksen ungu diganti sistem biru Nurai).

## Design tokens

Semua token ada di `src/app/globals.css` (`:root`):

- Surface: `--bg #030711`, `--bg-elev`, `--bg-card`, `--bg-card-hover`
- Text: `--text`, `--text-2` (grey-blue), `--text-3` (muted)
- Border: `--border`, `--border-strong`
- Blue family: `--blue #2f7bff`, `--electric`, `--cyan`, `--soft`, `--pale`, `--glow`
- State: `--ok`, `--warn`, `--err`
- Type scale (clamp): `--fs-display` 46-104px, `--fs-h1` 38-76px, `--fs-h2` 30-56px, `--fs-h3`, `--fs-lead`
- Spacing: `--section-y` 84-160px, `--section-y-tight`, `--detail-gap`
- Radii: `--r-lg 28px`, `--r-md 18px`, `--r-sm 12px`
- Motion: `--ease-out`, `--ease-spring`, `--dur`

Font tetap Geist / Geist Mono (sudah terpasang, tidak menyalin font proprietary referensi).

## Motion system

Tidak ada dependency animasi baru. Primitives in-house di `src/components/motion.tsx`:

- `Reveal` (variant: fade-up, fade, scale, blur, left, right) — IntersectionObserver + CSS transition
- `RevealLines` — masked line-by-line reveal untuk headline (lines eksplisit supaya pemenggalan Bahasa Indonesia natural)
- `Stagger` — set `--rv-delay` inkremental ke child `[data-rv]`
- `Parallax` — rAF scroll-linked translate, pause saat off-screen
- `Marquee` — track ganda CSS keyframe, seamless loop, pause on hover + off-screen
- `PointerGlowArea` + `.glow-card` — pointer-follow glow
- `ScrollProgress` — reading progress bar di lesson page

`prefers-reduced-motion`: semua reveal langsung tampil, marquee jadi scroll manual, parallax/float/glow mati (CSS + JS guard).

## Halaman

- **Homepage** (`src/app/page.tsx` + `src/components/home/*`): hero sinematik full-height dengan ribbon SVG + parallax, marquee pertanyaan 2 arah, learning system asimetris dengan interface mock orisinal, ecosystem 2x2, course showcase interaktif (list modul → panel aktif), library rail (tools/prompt/workflow), projects grid dengan preview art per project, monetize strip, explore grid asimetris, skill check entry, final CTA. Semua angka diturunkan dari data (`courseModules`, `sourceLessonCount`, `prompts.length`, dst), tidak ada yang di-hardcode.
- **Index pages**: hero copy baru sesuai audit section 4, jumlah + kategori dihitung dari data. `ResourceExplorer` dapat CTA kontekstual per tipe (Buka tool / Salin prompt / Buka workflow / Buka use case / Buka project / Lihat model bisnis / Baca definisi), empty state per tipe, entrance stagger CSS.
- **Detail pages** (`ResourceDetail`): field duplikat dihapus di level data builder (lihat bawah), links dikonsolidasi ke satu grup `Link` di aside, `lastVerified` diformat `Verified Juni 2026`, workflow/use case memakai diagram langkah `flow-diagram` (menggantikan "Alur visual" generik).
- **Course**: module page dan lesson page di-restyle. Lesson page: kolom baca sempit, scroll progress, section "Catatan penting" (editor notes) TIDAK dirender lagi, header objectives "Lesson X dari Y" (fix formatting nempel), tag glossary Title Case.
- **Skill Check**: scoring, kartu hasil, dan share logic tidak diubah. Ditambah tombol Kembali, "Pertanyaan X dari 10", tombol "Simpan" (ganti "Set"), copy tweet tanpa "gue".
- **Navbar**: kapsul floating fixed (logo kiri, link tengah, CTA "Cek level" kanan), lebih pekat setelah scroll, mobile full-screen overlay + scroll lock. Link: Belajar, Roadmap, Tools, Prompt, Workflow, Project, Kamus (Use Cases/Monetize/Cek Level tetap di mobile menu + footer + explore grid).
- **Footer**: grup route + sosial existing + wordmark NURAI besar ter-crop.

## Copy changes (dari audit, opsi rekomendasi)

- H1 homepage: "Belajar AI dari yang bisa langsung dipakai kerja." (Opsi A)
- Subheadline, section /01 ("Konsep. Praktik. Bukti kerja."), 4 kartu metode, section monetize ("Sekarang caranya jualan gimana?"), skill check ("Sekarang di level berapa?") sesuai audit 4.1.
- Section CTA duplikat "Cek level AI kamu. Tiga menit, beres." dihapus (audit 4.1.12), diganti `FinalCTA` sesuai pack section 9.
- Hero index pages sesuai audit 4.2-4.11, angka derived.
- Microcopy sesuai audit 6.1-6.6 (CTA per tipe, Simpan, empty states, progress).

## Data changes

Semua di level builder sehingga berlaku ke seluruh item:

- `expanded.ts` prompts: hapus "Dipakai buat apa" + "Template prompt" (redundan dengan `action` yang dirender sebagai "Prompt" dengan satu tombol "Salin prompt"); rename Variabel / Cara pakai / Tips untuk kategori ini / Output yang diharapkan.
- `expanded.ts` workflows: hapus "Masalah yang dibereskan"; rename Cocok untuk / Kapan dipakai / Input / Langkah kerja / Titik approval / Yang bisa salah / Cara ukur keberhasilan / Cara monetize workflow ini.
- `expanded.ts` tools: hapus "Apa tool ini", "Pakai kalau" (isi identik dengan "Kegunaan utama"), "Website resmi"/"Docs"/"Source URLs" (pindah ke aside Link), "Label harga"; rename Kegunaan utama / Hindari untuk / Kesalahan yang sering muncul. Tanggal verifikasi hanya di detail (dihapus dari card index).
- `expanded.ts` projects: hapus "Tingkat kesulitan" + "Estimasi waktu" dari body (sudah di eyebrow/aside).
- `useCases.ts`: hapus "Masalah nyata" (dup subtitle); rename mengikuti pola workflow.
- `glossary.ts`: merge "Definisi sederhana" + "Penjelasan natural" jadi "Apa itu [istilah]"; hapus template kosong "Bedanya dengan [X]"; rename Contoh / Terkait / Yang sering keliru; badge "Istilah AI" diganti level; typo pemengaturan/memengatur/mememroses diperbaiki.
- `course.ts`: durasi lesson "25 sampai 35 menit" (bukan "25-35"); rename modul 01 "Dasar AI", 02 "Cara Kerja LLM", 03 "Prompting", 05 "Memilih Tools AI" (slug TIDAK berubah, route aman); level modul 05 → Pemula, modul 13 & 14 → Lanjutan (verdict audit section 3).
- `extracted-course.json`: dua kalimat editor note yang bocor ke body content dihapus ("Untuk website course, ..."). Field `notes` (catatan produksi) tetap di data tapi tidak pernah dirender publik.
- `SkillCheck.tsx` LEVELS disinkronkan dengan nama modul baru.

## Yang sengaja TIDAK dilakukan

- **Restrukturisasi IA penuh** (15 modul / 44 lesson, split modul 06, pindah modul 12, lesson baru dari audit section 5). Audit sendiri menandai ini "major refactor, discuss dengan Satya dulu" (Task 21) dan butuh penulisan konten lesson baru. Struktur 14 modul / 39 lesson existing dipertahankan; semua count diturunkan dari data sehingga tetap konsisten.
- Menghapus lesson, route, atau data apa pun.
- Menambah dependency (tidak ada Framer Motion / GSAP / Three.js — semua motion CSS + IO + rAF).

## Assets

`public/assets/nurai/`: `ribbon.svg`, `mesh.svg`. Sisanya inline SVG di `src/components/visuals.tsx` (RibbonVisual, MeshVisual, CourseLayersVisual, PromptCardsVisual, WorkflowNodesVisual, ProjectWindowVisual, ProjectPreviewArt) — satu keluarga visual, dibuat dari nol.

## Responsive

Breakpoint: 1024 (grid collapse, showcase jadi satu kolom), 900 (nav → burger overlay, footer 2 kolom), 620 (semua grid 1 kolom, rail swipe, filter horizontal-scroll). `overflow-x: clip` di html/body mencegah horizontal scroll dari elemen dekoratif. Diverifikasi 375px tanpa overflow.

## Testing yang dijalankan

- `npm run lint` → 0 error, 0 warning
- `npm run build` → sukses, 443 halaman statis
- Dev server + browser: homepage, roadmap, course index, module, lesson, tools index+detail, prompts index+detail, workflows detail, use-cases detail, projects detail, monetize detail, glossary index+detail, skill-check (jawab + kembali + progress), 404
- Console: bersih di semua halaman yang dicek
- Mobile 375px: tidak ada horizontal overflow; mobile menu buka/tutup + scroll lock OK

## Visual QA round 2 (screenshot-based, vs reference)

Screenshot audit desktop 1440 + mobile 390 (Playwright, full-page), dibandingkan dengan rekaman referensi. Fix yang diterapkan:

1. **Hero display type kegedean + terpaksa 3 baris.** `--fs-display` 46-104px diturunkan ke 42-86px, `max-width` hero dinaikkan ke 1180px, `line-height` 0.98 → 1.02. Sekarang headline muat 2 baris rapi seperti referensi.
2. **Ribbon hero nyaris tak terlihat** (vignette terlalu pekat menutupi). Opacity vignette dikurangi (radial 0.5→0.28, linear 0.5→0.42), ribbon opacity 0.85→1, width 1500→1600px. Ribbon sekarang terbaca sebagai focal decorative object.
3. **Ecosystem card: judul menabrak visual mesh/nodes.** Ditambah `::before` gradient shield + `z-index` layering supaya copy selalu di atas visual. Di mobile visual di-dim ke opacity 0.3.
4. **Interface mock floating fragments numpuk di mobile.** `.mock-float` di-`display:none` di bawah 620px (fragmen dekoratif hanya untuk desktop).
5. **Skill-check entry card render full-width (bug).** Ternyata stale dev CSS; di production `.sc-entry-grid` benar (`grid`, kolom 360px). Diverifikasi via `next start` bukan dev server.
6. **Horizontal scroll 31px di /tools, /glossary, /monetize (mobile).** `.toolbar::before` (backdrop sticky, `inset:0 -30px`) lepas ke viewport saat toolbar jadi `position:static` di mobile. Di-`display:none` di bawah 900px (backdrop hanya perlu saat sticky). Plus `.filters { min-width:0 }` untuk flexbox scroll-row. Hasil: 0 overflow di 10 route × 3 lebar (375/390/1440).
7. **Project card level dobel** (eyebrow + meta pill). Level dipindah ke card-top, dihapus dari meta.
8. **Library rail count "8+"** diganti angka asli (`total` dari data): Tools (53), Prompt (60), Workflow (28).
9. **Glossary contoh** `category.toLowerCase()` bikin "genai & llm" (case rusak) → pakai category asli.
10. **Detail eyebrow "Pemula · Pemula"** saat category==level (glossary/project) → tampil sekali.

Data count final (dihitung langsung dari source, bukan hardcoded): 12 modul, 39 lesson, 112 istilah glossary, 60 prompt, 28 workflow, 12 project, 100 use case, 8 monetize, 53 tool (54 spec, 1 duplikat URL v0.dev di-dedup di builder).

Catatan angka use case: audit menyebut 88, tapi source `useCases.ts` sekarang berisi **100** (12 kategori: 11 × 8 item + "Design, Visual & Artist" 12 item). Homepage benar menampilkan 100 karena diturunkan dari data. Angka 88 di audit sudah stale terhadap data aktual.

Screenshot tersimpan di `reports/screenshots/` (14 file: home, course, lesson, prompt-detail, workflow-detail, skill-check-result — masing-masing desktop + mobile, plus home-hero).

## Resource detail pages redesign (dedicated per-type templates)

Seluruh 7 halaman detail resource ditata ulang jadi kurang mirip listing database dan lebih seperti panduan editorial. Homepage, design system, nav, footer, dan route lain tidak disentuh.

**Arsitektur baru**
- `ResourceDetail.tsx` sekarang cuma dispatcher: memilih template per tipe (route page.tsx tidak berubah, tetap kirim `{item, type, basePath}`).
- Template khusus di `src/components/detail/`: `ToolDetail`, `PromptDetail`, `WorkflowDetail`, `UseCaseDetail`, `ProjectDetail`, `MonetizeDetail`, `GlossaryDetail`.
- Primitive bersama di `DetailKit.tsx`: `DetailHero`, `Shell/Main/Aside`, `Section` (kicker + heading), `P`, `Lead`, `Card`, `MetaList`, `Checklist`, `StepFlow` (diagram step vertikal bernomor), `MiniFlow` (Input→Proses→Review→Output), `VarTable`, `CopyBlock`, `SideCard`, `Related`, `BackToIndex`.
- `related.ts`: pencarian related resource yang aman (hanya item nyata): tool sekategori, workflow yang memakai tool, tools yang dipakai workflow/use case/project, istilah terkait glossary, starter project dari teks portfolio monetize.
- CSS baru dinamespace `.rd-*` di globals.css. Class lama (`.detail-layout`, `.prose`, `.callout`, `.flow-diagram`) tidak diubah supaya halaman lesson/course aman.

**Komposisi (mengikuti ritme reference)**
- Hero compact: back link, eyebrow (kategori/tipe), judul proporsional (clamp 31-54px), deskripsi pendek, meta pills. Tidak memenuhi viewport, langsung diikuti body dengan jarak wajar (bukan gap 160px seperti sebelumnya).
- Grid dua kolom rapat: main `minmax(0,1fr)` (dominan, max 780px) + sidebar `minmax(292px,340px)`, gap 30-48px, `align-items:start` supaya sidebar sejajar section pertama. Sidebar sticky (`top:88px`), non-sticky kalau viewport pendek (`max-height:760px`) dan di bawah 900px.
- Section pakai kicker mono + heading editorial + paragraf. Bullet hanya untuk metadata/checklist/input-output. Penjelasan konsep pakai paragraf.
- Deskripsi hero tidak diulang di section pertama.

**Per tipe (semua dari data nyata, tidak mengarang)**
- Tool: hero + "kapan berguna" (kegunaan) + step alur pakai + kapan tidak dipakai + kesalahan + risiko/privasi + alternatif (framing jujur, tanpa klaim fitur per-alternatif). Sidebar: fakta + CTA "Buka website resmi" + "Workflow yang memakai tool ini" + "Tool lain di kategori".
- Prompt: satu blok prompt + satu tombol "Salin prompt" (duplikat dihapus), variabel, contoh input, output, step cara pakai, tips perbaiki hasil. Sidebar: fakta + prompt sekategori.
- Workflow: cocok untuk + hasil akhir, input, MiniFlow schematic, langkah kerja (step diagram), titik approval manusia, yang bisa salah + fallback, checklist quality gate, kapan layak diotomasi, prompt templates, KPI, cara monetize. Sidebar: fakta + tools yang dipakai (hanya tool nyata) + workflow sekategori.
- Use case: konteks (cocok untuk + tujuan), tools, langkah kerja, prompt, output, checklist kualitas, cara jadi layanan. Sidebar: fakta + tools + use case sekategori.
- Project: hasil akhir + completion checklist, versi kecil, tools, langkah build, bukti kerja (dokumentasi), level up, cara masuk portfolio. Sidebar: fakta + tools + project selevel.
- Monetize: siapa membayar, deliverable, paket starter/premium, bukti kerja, outreach, kesalahan scope, batas realistis (anti-hype). Sidebar: fakta + starter project + model bisnis lain.
- Glossary: apa itu, contoh, kenapa penting, yang sering keliru (field template kosong "Bedanya dengan X" dihapus). Sidebar: fakta + istilah terkait + lainnya di kategori.

**Dedup yang diperbaiki saat QA**
- Monetize eyebrow tidak lagi memakai `category` (yang untuk sebagian item berupa kalimat panjang dari field client); diganti `Model bisnis · Level X`.
- Project: baris `portfolio` sama dengan `proof[0]`, jadi difilter dari list "Bukti kerja" supaya tidak muncul dua kali (tetap tampil di section "Cara masukin ke portfolio").

**Data yang secara struktur minim (dirender jujur, tidak dipadatkan dengan copy generik)**
- Glossary: tiap field satu kalimat. Dirender jadi section pendek yang tetap editorial, bukan diisi filler.
- Prompt: variabel hanya nama (tanpa arti/contoh/kesalahan per-variabel di data). Dirender sebagai list + satu "Contoh input" konkret, bukan tabel yang dikarang.
- Langkah kerja (workflow/use case/project): tiap step string pendek; dirender sebagai diagram bernomor tanpa mengarang sub-field tool/input/output per-step. Review manusia disurface lewat section "Titik approval" (data nyata), bukan ditempel ke tiap step.
- Tool alternatif: hanya nama; diberi framing kategori, tanpa klaim fitur.
- Monetize: metode pricing tidak ada di data; ditampilkan scope paket starter/premium, bukan formula harga karangan.

Screenshot detail (desktop + mobile per tipe) di `reports/screenshots/detail-*`. QA: 21 slug detail x 2 lebar (390/1440) semua status 200, 0 horizontal overflow. Build 443 halaman, lint 0 error.

## Maintenance

- Copy hero index dan homepage ada di masing-masing `page.tsx` / `components/home/*`; copy per-item ada di `src/data/*`.
- Kalau menambah item data, count di homepage/index otomatis ikut.
- Kalau menambah section title baru di data, cek mapping render di `ResourceDetail.tsx` (numbered = mengandung "langkah kerja"/"cara pakai"/"workflow"; copybox = mengandung "prompt").
- Motion baru sebaiknya lewat primitives `motion.tsx` supaya reduced-motion tetap terjaga.
