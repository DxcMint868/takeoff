import Image from "next/image";
import type { DesignGalleryViewModel } from "../lib/strapi/design-projects";

function isVideo(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

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

  const isTwoColumnLayout =
    mediaLayout === "two columns" || mediaLayout === "two columns - compact";
  /** One item in a 2-col grid would sit in column 1 only; center it like a lone column. */
  const centerSingleInTwoColumn = medias.length === 1 && isTwoColumnLayout;

  const gridClass = centerSingleInTwoColumn
    ? "flex w-full flex-col items-center"
    : mediaLayout === "two columns - compact"
      ? "grid grid-cols-2 gap-2 mq700:grid-cols-1"
      : mediaLayout === "two columns"
        ? "grid grid-cols-2 gap-6 mq700:grid-cols-1"
        : "flex flex-col gap-6";

  const singleItemMaxWidthClass = centerSingleInTwoColumn
    ? mediaLayout === "two columns - compact"
      ? "max-w-[calc(50%-0.25rem)] mq700:max-w-full"
      : "max-w-[calc(50%-0.75rem)] mq700:max-w-full"
    : "";

  const isFullBleed = mediaLayout === "one column";

  return (
    <section
      className={`w-full bg-dark py-16 mq900:py-12 ${className ?? ""}`.trim()}
    >
      {(title || description) && (
        <div className="mx-auto mb-10 max-w-[1132px] px-5">
          {title && (
            <h2 className="m-0 font-sora text-[72px] font-semibold leading-none text-white/10 mq900:text-[52px] mq450:text-[36px]">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 font-reg text-sm font-normal leading-[22px] tracking-[0.02em] text-white-60">
              {description}
            </p>
          )}
        </div>
      )}

      {medias.length > 0 && (
        <div
          className={
            isFullBleed
              ? "flex flex-col gap-6"
              : `mx-auto max-w-[1132px] px-5 ${mediaLayout === "two columns" ? "mq700:px-0" : ""}`
          }
        >
          <div className={isFullBleed ? "flex flex-col gap-12" : gridClass}>
            {medias.map((media, i) => (
              <div
                key={`${media.url}-${i}`}
                className={`relative w-full ${singleItemMaxWidthClass} rounded-none overflow-hidden ${
                  isFullBleed
                    ? ""
                    : `rounded-[12px] ${mediaLayout === "two columns" ? "mq700:rounded-none" : ""}`
                }`}
              >
                {isVideo(media.url) ? (
                  <video
                    src={media.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-auto w-full object-cover"
                  />
                ) : (
                  <Image
                    src={media.url}
                    alt={media.alt || ""}
                    width={1440}
                    height={800}
                    sizes={
                      isFullBleed ? "100vw" : "(max-width: 700px) 100vw, 50vw"
                    }
                    className="h-auto w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
