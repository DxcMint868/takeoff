import Image from "next/image";

export function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

type UrlImageOrVideoProps = {
  url: string;
  alt: string;
  className: string;
} & ({ layout: "fill"; sizes: string } | { layout: "inline" });

export function UrlImageOrVideo(props: UrlImageOrVideoProps) {
  const { url, alt, className, layout } = props;
  if (isVideoUrl(url)) {
    return (
      <video
        src={url}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt}
        className={
          layout === "fill"
            ? `absolute inset-0 h-full w-full ${className}`
            : className
        }
      />
    );
  }
  if (layout === "fill") {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        sizes={props.sizes}
        className={className}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} className={className} />;
}
