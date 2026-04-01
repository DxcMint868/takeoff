type Logo = { src: string; alt: string; url: string; invert?: boolean };

const logos: Logo[] = [
  { src: "/mask-group-6@2x.png", alt: "PowerTrade", url: "https://powertrade.com" },
  { src: "/rain-logo.svg", alt: "Rain", url: "https://rain.com" },
  { src: "/liquid-logo.svg", alt: "Liquid", url: "https://www.liquid.com" },
  { src: "/emurgo-logo.svg", alt: "Emurgo", url: "https://emurgo.io" },
  { src: "/secondswap-logo@2x.png", alt: "SecondSwap", url: "https://secondswap.io" },
  { src: "/mudigital-logo.svg", alt: "MuDigital", url: "https://mudigital.net" },
  { src: "/oceanus-logo@2x.png", alt: "Oceanus", url: "https://oceanus.com.sg", invert: true },
  { src: "/cryptoparadise-logo@2x.png", alt: "Crypto Paradise", url: "https://cryptoparadise.net" },
  { src: "/base-logo.svg", alt: "Base Design", url: "https://www.basedesign.com" },
  { src: "/rice-logo.png", alt: "Rice Studios", url: "https://thisisrice.com", invert: true },
];

const ITEM_WIDTH = 260;

const LogoTrack = () => (
  <div className="flex items-center shrink-0">
    {logos.map((logo) => (
      <a
        key={logo.alt}
        href={logo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
        style={{ width: `${ITEM_WIDTH}px`, padding: "0 32px" }}
      >
        <img
          src={logo.src}
          alt={logo.alt}
          style={{ height: "50px", width: "auto" }}
          className={`object-contain opacity-80 hover:opacity-100 transition-opacity ${logo.invert ? "brightness-0 invert" : ""}`}
        />
      </a>
    ))}
  </div>
);

const LogoCarousel = () => (
  <div className="w-full overflow-hidden py-10">
    <style>{`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${ITEM_WIDTH * logos.length}px); }
      }
      .logo-scroll {
        display: flex;
        animation: scroll 30s linear infinite;
        width: max-content;
      }
      .logo-scroll:hover {
        animation-play-state: paused;
      }
    `}</style>
    <div className="logo-scroll">
      <LogoTrack />
      <LogoTrack />
    </div>
  </div>
);

export default LogoCarousel;
