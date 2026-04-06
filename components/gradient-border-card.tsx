import Image from "next/image";
import type { ReactNode } from "react";

const DEFAULT_PADDING =
  "relative z-[1] px-[70px] py-[72px] mq900:px-10 mq900:py-14 mq450:px-5 mq450:py-10";

type GradientBorderCardProps = {
  children: ReactNode;
  backgroundSrc: string;
  /** Decorative backgrounds should use "" */
  backgroundAlt?: string;
  backgroundClassName?: string;
  /** Card fill behind the image (Tailwind class, e.g. bg-[#282042]) */
  surfaceClassName?: string;
  sizes?: string;
  contentClassName?: string;
};

export function GradientBorderCard({
  children,
  backgroundSrc,
  backgroundAlt = "",
  backgroundClassName = "pointer-events-none object-cover",
  surfaceClassName = "bg-dark",
  sizes = "1132px",
  contentClassName = DEFAULT_PADDING,
}: GradientBorderCardProps) {
  return (
    <div
      className={`gradient-border relative overflow-hidden rounded-[20px] shadow-card ${surfaceClassName}`}
    >
      <Image
        src={backgroundSrc}
        alt={backgroundAlt}
        fill
        className={backgroundClassName}
        sizes={sizes}
        aria-hidden={backgroundAlt === ""}
      />
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
