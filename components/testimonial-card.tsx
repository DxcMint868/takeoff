import Image from "next/image";
import React from 'react';

interface TestimonialCardProps {
  id?: string;
  name: string;
  position: string;
  quote: string;
  companyLogo: string;
  companyWebsite: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  id,
  name,
  position,
  quote,
  companyLogo,
  companyWebsite,
}) => (
  <div
    id={id}
    className="flex-1 shadow-[0_0_24px_0_#261E4D] rounded-3xs bg-dark border-gray border-[1px] border-solid box-border flex flex-col items-end justify-between pt-[30px] px-[23px] pb-[18px] gap-6 min-w-[286px] max-w-full h-[300px] mq900:flex-1"
  >
    <div className="self-stretch flex flex-col items-start justify-start gap-6">
      <div className="self-stretch flex flex-row items-start justify-center py-0 pl-0.5 pr-0">
        <div className="relative tracking-[0.2em] leading-[16px] uppercase z-[1]">
          {`${name} - ${position}`}
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-end py-0 px-2 box-border max-w-full text-sm text-white-60">
        <blockquote className="m-0 flex-1 relative tracking-[0.02em] leading-[22px] font-light inline-block max-w-full z-[1] overflow-hidden">
          <p className="m-0 line-clamp-6">&ldquo;{quote}&rdquo;</p>
        </blockquote>
      </div>
    </div>
    <div className="w-[246px] flex flex-row items-start justify-between gap-5 text-right text-purple">
      <Image
        className="relative object-contain z-[1]"
        alt=""
        src={companyLogo}
        width={100}
        height={40}
        unoptimized={companyLogo.endsWith(".svg")}
      />
      <div className="flex flex-col items-start justify-start pt-[9px] px-0 pb-0">
        <a
          href={`https://${companyWebsite}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative [text-decoration:underline] tracking-[0.02em] leading-[22px] font-medium inline-block min-w-[44px] z-[1] text-purple hover:text-mediumpurple transition-colors"
        >
          {companyWebsite}
        </a>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
