import type { NextPage } from "next";
import Head from "next/head";
import FooterComponent from "../components/footer-component";
import Nav from "../components/nav";
import WorksPageMain from "../components/works-page-main";

const SITE_URL = "https://www.hoasen.io";
const TITLE = "Our Work Examples | Hoasen";
const DESCRIPTION =
  "Featured projects and case studies: fintech, blockchain, and enterprise software built by Hoasen.";

const Works: NextPage = () => {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/works`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/works`} />
      </Head>

      <div className="w-full min-h-screen bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:min-h-0">
        <Nav initialTransparent />
        <WorksPageMain />
        <FooterComponent />
      </div>
    </>
  );
};

export default Works;
