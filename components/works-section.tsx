import TestimonialCard from "./testimonial-card";
import LogoCarousel from "./logo-carousel";

const TESTIMONIALS = [
  {
    id: "testimonial-mudigital",
    name: "Patrick Hizon",
    position: "CEO",
    quote:
      "Great job and reimagined work of a prior design firm at a much higher quality deliverable. and the project management was managed very well - including churning out preliminary deliverables during the Christmas holiday period. They were responsive and on time with deliverables",
    companyLogo: "/mudigital-logo.svg",
    companyWebsite: "mudigital.net",
  },
  {
    id: "testimonial-rain",
    name: "Frank A.",
    position: "CTO",
    quote:
      "I worked with Meg and Marek [Hoasen team] and was impressed by their quality of work and depth of industry knowledge. It was a pleasure working with them",
    companyLogo: "/group-289496@2x.png",
    companyWebsite: "rain.com",
  },
];

const WorksSection = () => (
  <section id="testimonials" className="w-full">
    <div className="box-border flex w-full max-w-full flex-row items-start justify-start px-2 pb-[52px] pt-64 font-sora text-29xl">
      <div className="flex max-w-full flex-1 flex-row items-end justify-between gap-5">
        <div
          id="works-intro"
          className="flex w-full max-w-[calc(100%_-_21px)] flex-col items-center gap-4 text-center"
        >
          <h1 className="font-[inherit] relative m-0 font-normal leading-[58px] text-inherit mq450:text-10xl mq450:leading-[35px] mq900:text-19xl mq900:leading-[46px]">
            Who we&apos;ve worked with
          </h1>
          <div className="relative self-stretch font-reg text-base font-light leading-[24px] tracking-[0.02em] text-white-60">
            Our team has experience working with companies large and small
          </div>
        </div>
      </div>
    </div>

    <div className="box-border flex max-w-full flex-row items-start justify-center self-stretch pb-[88px] pl-[22px] pr-5 pt-0">
      <div className="flex w-[904px] max-w-full flex-col items-start justify-start gap-9">
        <div
          id="works-testimonials"
          className="flex max-w-full flex-row items-start justify-start gap-6 self-stretch mq900:flex-wrap"
        >
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>

    <div id="works-logo-marquee">
      <LogoCarousel />
    </div>
  </section>
);

export default WorksSection;
