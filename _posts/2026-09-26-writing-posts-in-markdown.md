---
# ---------------------------------------------------------------------------
# Example post. It is NOT published (published: false) so it never shows up on
# the live site. Use it as a template: copy this file, rename it to
# `YYYY-MM-DD-your-slug.md`, edit the front matter and write Markdown below.
# Preview unpublished posts locally with `bundle exec jekyll serve --unpublished`.
# ---------------------------------------------------------------------------
title: "Writing Posts in Markdown"
date: 2026-09-26 10:00:00       # no timezone offset, so the site shows this date as written
published: false
description: >-
  A tour of everything a post can contain — headings, lists, quotes, tables,
  code, math, images and footnotes — all written in plain Markdown.
tags: [guide, markdown]
# cover: /assets/images/covers/STEER_cover.jpg   # optional; shown on the blog list
---

Every post is a single Markdown file in the `_posts/` folder. The file name sets
the date and the URL, and the front matter above sets the title, the one-line
description shown on the blog list, optional tags and an optional cover image.

## Text and lists

Regular paragraphs support **bold**, *italic*, `inline code`, and
[links](https://jluo111.github.io). Lists work as you would expect:

- Reinforcement learning with verifiable rewards
- Curriculum design for reasoning
  - nested items are fine too
- Neural operators for scientific computing

1. First, write the draft.
2. Then, preview it locally.
3. Finally, commit and push.

> A blockquote is a good place for a key takeaway or a quotation from a paper.

## Math

Math is rendered with KaTeX. Wrap inline math in double dollar signs, like
$$\mathcal{L}(\theta) = -\mathbb{E}_{x \sim \mathcal{D}}[\log p_\theta(x)]$$,
and put display math on its own lines. A single dollar sign is just a dollar
sign, so a sentence about a $5 API bill and a $10 one stays intact.

$$
H(\pi_\theta) = -\sum_{a} \pi_\theta(a \mid s) \log \pi_\theta(a \mid s)
$$

## Code

```python
import torch

def entropy(logits: torch.Tensor) -> torch.Tensor:
    """Token-level entropy of a categorical policy."""
    log_p = torch.log_softmax(logits, dim=-1)
    return -(log_p.exp() * log_p).sum(dim=-1)
```

## Tables

| Method     | AIME24 | MATH500 | Avg.  |
|:-----------|-------:|--------:|------:|
| Baseline   |  30.0  |  82.4   | 56.2  |
| Ours       |  33.3  |  84.1   | 58.7  |

## Images

![Cover figure of the STEER paper](/assets/images/covers/STEER_cover.jpg)

## Footnotes

Footnotes are handy for references.[^1]

[^1]: Hao et al., *Rethinking Entropy Interventions in RLVR: An Entropy Change Perspective*, ACL 2026.
