import type { Root, Content, Text, Parent } from 'mdast';
import { linkifyParagraph } from './core';
import type { InternalLang } from './dictionaries';

type Options = {
  lang: InternalLang;
};

function isParent(node: any): node is Parent {
  return node && typeof node === 'object' && Array.isArray(node.children);
}

function replaceChild(parent: Parent, index: number, newNodes: Content[]) {
  parent.children.splice(index, 1, ...newNodes);
}

function isTextNode(node: any): node is Text {
  return node?.type === 'text' && typeof node.value === 'string';
}

function makeLinkNode(href: string, value: string, title?: string): Content {
  return {
    type: 'link',
    url: href,
    title: title,
    children: [{ type: 'text', value }],
  } as any;
}

/**
 * Remark plugin: converts service/city keywords inside markdown text nodes into internal links.
 * Skips: headings, existing links, code/inlineCode, html.
 */
export default function remarkInternalLinks(options: Options) {
  const lang = options?.lang || 'ar';

  return function transformer(tree: Root) {
    // Per-page anti-spam: max 3 links per destination
    const pageCounts = new Map<string, number>();

    const walk = (node: any, parent: Parent | null) => {
      if (!node) return;

      // Skip headings entirely to avoid affecting H1/H2 layout
      if (node.type === 'heading') return;

      // Skip code blocks, inline code, and raw HTML
      if (node.type === 'code' || node.type === 'inlineCode' || node.type === 'html') return;

      // Don't touch existing links
      if (node.type === 'link') return;

      if (isParent(node)) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];

          // Process paragraph-like contexts: paragraph, listItem, blockquote.
          const isParagraphScope = node.type === 'paragraph' || node.type === 'listItem' || node.type === 'blockquote';

          if (isParagraphScope && isTextNode(child)) {
            const paragraphUsed = new Set<string>();
            const segs = linkifyParagraph(child.value, {
              lang,
              paragraphDestinationsUsed: paragraphUsed,
              allocate: (href, allocationId) => {
                // allocationId from core will be stable enough within this run
                void allocationId;
                const key = String(href || '').replace(/\/+$/, '');
                const current = pageCounts.get(key) || 0;
                if (current >= 3) return false;
                pageCounts.set(key, current + 1);
                return true;
              },
              paragraphKey: `md:${node.type}:${i}`,
            });

            if (segs.length === 1 && segs[0].type === 'text') {
              // no change
              continue;
            }

            const newNodes: Content[] = segs.map((s) => {
              if (s.type === 'text') return { type: 'text', value: s.value } as any;
              return makeLinkNode(s.href, s.value, s.title);
            });

            replaceChild(node, i, newNodes);
            i += newNodes.length - 1;
            continue;
          }

          // Recurse
          walk(child, node);
        }
      }

      // No-op for leaf nodes
      void parent;
    };

    walk(tree, null);
  };
}
