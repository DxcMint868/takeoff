import type { NextPage } from "next";
import Nav from "../components/nav";
import FrameComponent from "../components/frame-component";
import FooterComponent from "../components/footer-component";
import ContactSection from "../components/contact-section";
import TechnologiesSection from "../components/technologies-section";
import WorksSection from "../components/works-section";
import TeamSection from "../components/team-section";
const Web: NextPage = () => {
  return (
    <div className="w-full relative bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:h-auto mq450:min-h-[4602]">
      <img
        className="absolute top-[456px] left-[0px] w-full h-[348px] overflow-hidden object-cover ms1024:object-fill"
        alt=""
        src="/graph-wave@2x.png"
      />
      <Nav />
      <section className="w-full flex flex-col items-start justify-start gap-14 max-w-full mq900:gap-7 pt-[70px]">
        <FrameComponent />
      </section>

      {/* <section className="absolute top-[3643px] left-[100px] w-[1240px] h-[442px]">
        <img
          className="absolute top-[0px] left-[0px] w-full h-full object-cover"
          alt=""
          src="/mask-group-1@2x.png"
        />
        <img
          className="absolute top-[363px] left-[1130px] w-[30px] h-5 z-[1]"
          loading="lazy"
          alt=""
          src="/arrow.svg"
        />
      </section> */}
      <div className="w-full flex justify-center">
        <div
        className={`flex flex-col pt-96 items-start justify-start gap-3 max-w-[1200px] w-full text-center text-xs text-white font-reg`}
        >
          <TechnologiesSection />
          <WorksSection />
          <TeamSection />
          <ContactSection />
        </div>
      </div>
      {/* <section className="absolute top-[3147px] left-[150px] w-[1110px] flex flex-col items-start justify-start gap-3 min-h-[929px] max-w-full text-right text-xs text-white font-reg"> */}
        {/* <div className="w-[79px] relative tracking-[0.2em] leading-[16px] uppercase inline-block [transform:_rotate(-90deg)]">
          About Us
        </div> */}
      {/* </section> */}
      <FooterComponent />

    </div>
  );
};

export default Web;
