# jluo111.github.io

Personal academic homepage, built with [Jekyll](https://jekyllrb.com/) on the
[academic-homepage](https://github.com/luost26/academic-homepage) template and published by GitHub Pages.

## Where things live

| What | Where |
|---|---|
| Name, positions, bio, research interests, links, portrait | `_data/profile.yml` |
| Navigation bar | `_data/navigation.yml` |
| Co-author links and the bolded name | `_data/authors.yml` |
| Publications | `_publications/<year>/<slug>.md` |
| Blog posts | `_posts/YYYY-MM-DD-slug.md` |
| Blog tagline, footer text | `_data/display.yml` |
| Colours, fonts, spacing | `assets/css/global.css` (all colours are variables at the top) |

## Publications

Each paper is one Markdown file with only front matter:

```yaml
---
title: "Neural Krylov Iteration for Accelerating Linear System Solving"
date: 2024-09-12                         # sorts the list (newest first)
selected: true                           # show on the home page
pub: "Advances in Neural Information Processing Systems (NeurIPS)"   # the text in (...) becomes the "NeurIPS 2024" chip
pub_date: "2024"                         # year in the chip and the year group on the Publications page
award: Spotlight                         # or: awards: [Oral, Outstanding Paper Award]
# status: Under Review                   # for preprints / submissions
# venue: "NeurIPS 2024"                  # override the auto-generated chip
abstract: >-
  ...
cover: /assets/images/covers/NeurKItt_cover.jpg
authors:
  - Jian Luo                             # add * for equal contribution, # for corresponding author
  - Jie Wang
links:
  Paper: https://...
  Code: https://github.com/...
---
```

Badge colours are chosen from the award text: *Best / Outstanding / … Award* (gold on navy),
*Honorable Mention*, *Oral*, *Spotlight*, *Highlight*, *Workshop*, *Poster*, *Under Review*, *Preprint*.
Anything else gets a neutral badge; force a tier with `awards: [{ name: "...", type: oral }]`.

## Blog posts

Create `_posts/YYYY-MM-DD-slug.md`:

```yaml
---
title: "Post title"
date: 2026-09-26 10:00:00                           # no timezone offset, so the site shows it as written
description: One sentence shown on the blog list.   # optional
tags: [llm, rl]                                     # optional
cover: /assets/images/....jpg                       # optional
---
Markdown body: headings, lists, tables, fenced code, footnotes, images, and math.
```

Math uses double dollar signs everywhere: `$$x^2$$` inside a sentence is inline, `$$` on its own
lines is a display equation. A single `$` is never math, so prices in prose are safe.

The post appears at `/blog/YYYY/slug/`. Add `published: false` to keep a draft out of the live site
(`_posts/2026-09-26-writing-posts-in-markdown.md` is such a draft and doubles as a syntax reference).

## Local preview

```bash
bundle install
bundle exec jekyll serve --unpublished
```

then open <http://localhost:4000>.
