import { Fragment, type ReactNode } from "react";
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
      const href = ((node as unknown as { url?: string }).url || "").trim();
      return (
        <a
          key={key}
          href={href || "#"}
          target="_blank"
          rel="noreferrer"
          className="underline"
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

export default function StrapiBlocks({
  blocks,
  className = "",
}: StrapiBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const key = `block-${index}`;
        const inline = renderInline(block.children, `${key}-inline`);

        switch (block.type) {
          case "heading": {
            const level = block.level ?? 3;
            if (level === 1) return <h1 key={key}>{inline}</h1>;
            if (level === 2) return <h2 key={key}>{inline}</h2>;
            if (level === 3) return <h3 key={key}>{inline}</h3>;
            if (level === 4) return <h4 key={key}>{inline}</h4>;
            return <h5 key={key}>{inline}</h5>;
          }

          case "list": {
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
