import type { NextPage } from "next";
import Nav from "../components/nav";
import FrameComponent from "../components/frame-component";
import ContactComponent from "../components/group-component1";
import ServicesContent from "../components/services-content";

const Web: NextPage = () => {
  return (
    <div className="w-full relative bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:h-auto mq450:min-h-[4602]">
      <img
        className="absolute top-[3225px] left-[calc(50%_-_256px)] w-[452px] h-[356px]"
        loading="lazy"
        alt=""
        src="/vector-4.svg"
      />
      <img
        className="absolute top-[456px] left-[0px] w-full h-[348px] overflow-hidden object-cover ms1024:object-fill"
        alt=""
        src="/graph-wave@2x.png"
      />
      <Nav />
      <section id="about-us" className="w-full flex flex-col items-start justify-start gap-14 max-w-full mq900:gap-7 pt-[70px]">
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
        <ServicesContent />
      </div>
      <img
        className="absolute top-[3178px] left-[390px] w-[660px] h-[340px] overflow-hidden object-contain hidden"
        alt=""
        src="/cirlce-half@2x.png"
      />
      {/* <section className="absolute top-[3147px] left-[150px] w-[1110px] flex flex-col items-start justify-start gap-3 min-h-[929px] max-w-full text-right text-xs text-white font-reg"> */}
        {/* <div className="w-[79px] relative tracking-[0.2em] leading-[16px] uppercase inline-block [transform:_rotate(-90deg)]">
          About Us
        </div> */}
      {/* </section> */}
      <ContactComponent />

    </div>
  );
};

export default Web;
