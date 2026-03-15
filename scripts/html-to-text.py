#!/usr/bin/env python3
"""Strip HTML BRD (Confluence) → clean markdown text.

Usage: python3 scripts/html-to-text.py input.html output.md
"""
import sys
from bs4 import BeautifulSoup

def html_to_text(html_path, out_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # Remove script, style, nav, footer
    for tag in soup.find_all(['script', 'style', 'nav', 'footer', 'noscript']):
        tag.decompose()

    # Try to find main content (Confluence patterns)
    content = (
        soup.find('div', {'id': 'main-content'}) or
        soup.find('div', {'class': 'wiki-content'}) or
        soup.find('div', {'id': 'content'}) or
        soup.find('article') or
        soup.find('main') or
        soup.body or
        soup
    )

    lines = []
    for el in content.find_all(['h1','h2','h3','h4','h5','h6','p','li','td','th','tr','pre','code','blockquote']):
        text = el.get_text(strip=True)
        if not text:
            continue

        tag = el.name
        if tag == 'h1':
            lines.append(f"\n# {text}")
        elif tag == 'h2':
            lines.append(f"\n## {text}")
        elif tag == 'h3':
            lines.append(f"\n### {text}")
        elif tag in ('h4','h5','h6'):
            lines.append(f"\n#### {text}")
        elif tag == 'li':
            lines.append(f"- {text}")
        elif tag == 'th':
            lines.append(f"| **{text}** ", )
        elif tag == 'td':
            lines.append(f"| {text} ")
        elif tag in ('pre', 'code'):
            lines.append(f"```\n{text}\n```")
        elif tag == 'blockquote':
            lines.append(f"> {text}")
        else:
            lines.append(text)

    result = '\n'.join(lines)

    # Clean up excessive whitespace
    while '\n\n\n' in result:
        result = result.replace('\n\n\n', '\n\n')

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(result.strip())

    # Stats
    original_size = len(open(html_path, 'r', encoding='utf-8').read())
    clean_size = len(result)
    ratio = (1 - clean_size / original_size) * 100 if original_size > 0 else 0
    print(f"✅ {html_path} → {out_path}")
    print(f"   {original_size:,} bytes → {clean_size:,} bytes ({ratio:.0f}% reduced)")

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python3 scripts/html-to-text.py input.html output.md")
        sys.exit(1)
    html_to_text(sys.argv[1], sys.argv[2])
