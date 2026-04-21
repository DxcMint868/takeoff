import { Fragment, type ReactNode } from "react";

const SAFE_URL_RE = /^(https?|mailto|tel):/i;

function sanitizeHref(raw: string): string | undefined {
  const url = raw.trim();
  if (!url || !SAFE_URL_RE.test(url)) return undefined;
  return url;
}
import type {
  StrapiBlocksNode,
  StrapiTextNode,
} from "../lib/strapi/case-studies";

type StrapiBlocksProps = {
  blocks: StrapiBlocksNode[];
  className?: string;
};

function isTextNode(
  node: StrapiBlocksNode | StrapiTextNode,
): node is StrapiTextNode {
  return node.type === "text";
}

function renderTextLeaf(node: StrapiTextNode, key: string) {
  let content: ReactNode = node.text;

  if (node.code) content = <code>{content}</code>;
  if (node.bold) content = <strong>{content}</strong>;
  if (node.italic) content = <em>{content}</em>;
  if (node.underline) content = <u>{content}</u>;
  if (node.strikethrough) content = <s>{content}</s>;

  return <Fragment key={key}>{content}</Fragment>;
}

function renderInline(
  nodes: Array<StrapiBlocksNode | StrapiTextNode> | undefined,
  keyBase: string,
) {
  if (!nodes || nodes.length === 0) return null;

  return nodes.map((node, index) => {
    const key = `${keyBase}-${index}`;

    if (isTextNode(node)) {
      return renderTextLeaf(node, key);
    }

    if (node.type === "link") {
      const href = sanitizeHref(
        (node as unknown as { url?: string }).url ?? "",
      );
      if (!href) {
      return (
        <span key={key} className="underline" style={{ color: "#735FD4" }}>
          {renderInline(node.children, `${key}-child`)}
        </span>
      );
    }
    const isExternal = /^https?:/i.test(href);
    return (
      <a
        key={key}
        href={href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="underline"
        style={{ color: "#735FD4" }}
      >
          {renderInline(node.children, `${key}-child`)}
        </a>
      );
    }

    return (
      <Fragment key={key}>
        {renderInline(node.children, `${key}-child`)}
      </Fragment>
    );
  });
}

function getNodeChildren(node: StrapiBlocksNode | StrapiTextNode) {
  if ("children" in node) {
    return node.children;
  }
  return undefined;
}

type MergedListBlock = {
  type: "list";
  format: "ordered" | "unordered";
  children: Array<StrapiBlocksNode | StrapiTextNode>;
  mergeKey: string;
};

type RenderBlock = StrapiBlocksNode | MergedListBlock;

function isEmptyParagraph(block: StrapiBlocksNode): boolean {
  if (block.type !== "paragraph") return false;
  if (!block.children || block.children.length === 0) return true;
  return block.children.every(
    (child) => isTextNode(child) && child.text.trim() === "",
  );
}

function mergeAdjacentLists(blocks: StrapiBlocksNode[]): RenderBlock[] {
  const result: RenderBlock[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type !== "list") {
      result.push(block);
      i++;
      continue;
    }

    const format = block.format ?? "unordered";
    const mergedChildren = [...(block.children ?? [])];
    let j = i + 1;

    while (j < blocks.length) {
      const next = blocks[j];

      if (next.type === "list" && (next.format ?? "unordered") === format) {
        mergedChildren.push(...(next.children ?? []));
        j++;
      } else if (isEmptyParagraph(next)) {
        // Peek past empty paragraphs to see if the same list format continues
        let k = j + 1;
        while (k < blocks.length && isEmptyParagraph(blocks[k])) k++;

        if (
          k < blocks.length &&
          blocks[k].type === "list" &&
          (blocks[k].format ?? "unordered") === format
        ) {
          mergedChildren.push(...(blocks[k].children ?? []));
          j = k + 1;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    result.push({
      type: "list",
      format,
      children: mergedChildren,
      mergeKey: `list-${i}`,
    });
    i = j;
  }

  return result;
}

export default function StrapiBlocks({
  blocks,
  className = "",
}: StrapiBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const renderBlocks = mergeAdjacentLists(blocks);

  return (
    <div className={className}>
      {renderBlocks.map((block, index) => {
        const key = "mergeKey" in block ? block.mergeKey : `block-${index}`;
        const inline =
          "mergeKey" in block
            ? null
            : renderInline(block.children, `${key}-inline`);

        if ("mergeKey" in block) {
          const items = block.children || [];
          if (block.format === "ordered") {
            return (
              <ol key={key} className="list-decimal pl-5">
                {items.map((item, itemIndex) => (
                  <li key={`${key}-item-${itemIndex}`}>
                    {renderInline(
                      getNodeChildren(item),
                      `${key}-item-inline-${itemIndex}`,
                    )}
                  </li>
                ))}
              </ol>
            );
          }
          return (
            <ul key={key} className="list-disc pl-5">
              {items.map((item, itemIndex) => (
                <li key={`${key}-item-${itemIndex}`}>
                  {renderInline(
                    getNodeChildren(item),
                    `${key}-item-inline-${itemIndex}`,
                  )}
                </li>
              ))}
            </ul>
          );
        }

        switch (block.type) {
          case "heading": {
            const level = block.level ?? 3;
            if (level === 1) return <h1 key={key}>{inline}</h1>;
            if (level === 2) return <h2 key={key}>{inline}</h2>;
            if (level === 3) return <h3 key={key}>{inline}</h3>;
            if (level === 4) return <h4 key={key}>{inline}</h4>;
            return <h5 key={key}>{inline}</h5>;
          }

          case "quote":
            return (
              <blockquote
                key={key}
                className="border-l-2 border-white/25 pl-4 italic"
              >
                {inline}
              </blockquote>
            );

          case "paragraph":
          default:
            return <p key={key}>{inline}</p>;
        }
      })}
    </div>
  );
}
