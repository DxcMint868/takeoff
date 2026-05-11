import Image from "next/image";

type Logo = { src: string; alt: string; url: string; invert?: boolean; name?: string };

const LOGOS: Logo[] = [
  { src: "/mask-group-6@2x.png", alt: "PowerTrade", url: "https://powertrade.com", name: "PowerTrade" },
  { src: "/rain-logo.svg", alt: "Rain", url: "https://rain.com" },
  { src: "/liquid-logo.svg", alt: "Liquid", url: "https://www.liquid.com" },
  { src: "/emurgo-logo.svg", alt: "Emurgo", url: "https://emurgo.io" },
  { src: "/secondswap-logo@2x.png", alt: "SecondSwap", url: "https://secondswap.io" },
  { src: "/mudigital-logo.svg", alt: "MuDigital", url: "https://mudigital.net" },
  { src: "/oceanus-logo@2x.png", alt: "Oceanus", url: "https://oceanus.com.sg", invert: true },
  { src: "/cryptoparadise-logo@2x.png", alt: "Crypto Paradise", url: "https://cryptoparadise.net" },
  { src: "/base-logo.svg", alt: "Base Design", url: "https://www.basedesign.com" },
  { src: "/rice-logo.png", alt: "Rice Studios", url: "https://thisisrice.com", name: "Studios" },
];

type LogoCarouselProps = {
  cmsLogos?: Array<{ url: string; alt: string; link: string; title?: string }>;
};

const LogoCarousel = ({ cmsLogos }: LogoCarouselProps) => {
  const logos: Logo[] =
    cmsLogos && cmsLogos.length > 0
      ? cmsLogos.map((logo) => ({
          src: logo.url,
          alt: logo.alt,
          url: logo.link || "#",
          ...(logo.title ? { name: logo.title } : {}),
        }))
      : LOGOS;

  const doubled = [...logos, ...logos];

  return (
    <div className="group w-full overflow-hidden py-10">
      <style>{`
        @keyframes logo-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{
          animationName: "logo-scroll",
          animationDuration: "30s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {doubled.map((logo, i) => (
          <a
            key={`${logo.alt}-${i}`}
            href={logo.url}
            target={logo.url !== "#" ? "_blank" : undefined}
            rel={logo.url !== "#" ? "noopener noreferrer" : undefined}
            className="mr-16 flex shrink-0 items-center justify-center no-underline"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={50}
              className={`h-[50px] w-auto object-contain opacity-80 transition-opacity hover:opacity-100 ${logo.invert ? "brightness-0 invert" : ""}`}
              unoptimized={logo.src.endsWith(".svg") || logo.src.startsWith("http")}
            />
            {logo.name && (
              <span className="ml-2 whitespace-nowrap text-10xl font-semibold text-white no-underline opacity-80 transition-opacity hover:opacity-100">
                {logo.name}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;
