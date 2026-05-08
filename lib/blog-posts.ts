export type BlogPostPreview = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  /** Approximate reading time in seconds */
  timeToRead: number;
  content: string;
  /** Cover image — local `/public/...` or remote URL if configured in `next.config.js` */
  image: string;
  /** Populated when loaded from Strapi Block editor */
  contentBlocks?: import("./strapi/case-studies").StrapiBlocksNode[];
  /** Strapi `is_featured` (localized) */
  isFeatured?: boolean;
  /** Strapi document id — same across locales for one translated entry */
  documentId?: string;
};

/** Fallback cover when Strapi `cover_image` is missing (used by `lib/strapi/blogs.ts`). */
export const LEGACY_BLOG_COVER_IMAGE =
  "https://blockworks.co/_next/image?url=https://blockworks-co.imgix.net/wp-content/uploads/2024/11/btc-pastel-stripes.jpg&w=1920&q=75&webp=false";
