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

const LogoCarousel = () => {
  const doubled = [...LOGOS, ...LOGOS];

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
            target="_blank"
            rel="noopener noreferrer"
            className="mr-16 flex shrink-0 items-center justify-center no-underline"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className={`h-[50px] w-auto object-contain opacity-80 transition-opacity hover:opacity-100 ${logo.invert ? "brightness-0 invert" : ""}`}
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
