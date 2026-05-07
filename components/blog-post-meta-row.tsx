import type { BlogPostPreview } from "../lib/blog-posts";
import { BlogShareButton } from "./blog-share-button";

type BlogPostMetaRowProps = {
  post: BlogPostPreview;
  dateFormatter: (iso: string) => string;
};

export function BlogPostMetaRow({ post, dateFormatter }: BlogPostMetaRowProps) {
  return (
    <div className="mt-auto flex w-full flex-row items-center justify-between gap-4 pt-6">
      <p className="m-0 font-reg text-[11px] font-medium uppercase leading-tight tracking-[0.12em] text-white-60">
        By: {post.author} • {dateFormatter(post.publishedAt)}
      </p>
      <BlogShareButton slug={post.slug} title={post.title} />
    </div>
  );
}
