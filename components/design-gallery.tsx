import Image from "next/image";
import type { DesignGalleryViewModel } from "../lib/strapi/design-projects";

type DesignGalleryProps = {
  gallery: DesignGalleryViewModel;
  className?: string;
};

export default function DesignGallery({
  gallery,
  className,
}: DesignGalleryProps) {
  const { title, description, medias, mediaLayout } = gallery;

  if (medias.length === 0 && !title && !description) return null;

  const gridClass =
    mediaLayout === "two columns - compact"
      ? "grid grid-cols-2 gap-2 mq700:grid-cols-1"
      : mediaLayout === "two columns"
        ? "grid grid-cols-2 gap-6 mq700:grid-cols-1"
        : "flex flex-col gap-6";

  return (
    <section
      className={`w-full bg-dark px-5 py-16 mq900:py-12 ${className ?? ""}`.trim()}
    >
      <div className="mx-auto max-w-[1132px]">
        {(title || description) && (
          <div className="mb-10">
            {title && (
              <h2 className="m-0 font-sora text-[72px] font-semibold leading-none text-white/10 mq900:text-[52px] mq450:text-[36px]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 max-w-[720px] font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
                {description}
              </p>
            )}
          </div>
        )}

        {medias.length > 0 && (
          <div className={gridClass}>
            {medias.map((media, i) => (
              <div
                key={`${media.url}-${i}`}
                className="relative w-full overflow-hidden rounded-[12px]"
              >
                <Image
                  src={media.url}
                  alt={media.alt || ""}
                  width={1132}
                  height={800}
                  sizes={
                    mediaLayout === "one column"
                      ? "100vw"
                      : "(max-width: 700px) 100vw, 50vw"
                  }
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
