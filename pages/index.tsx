import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Nav from "../components/nav";
import FooterComponent from "../components/footer-component";
import HomeCmsSections from "../components/home-cms-sections";
import {
  CORE_PROJECT_CARDS,
  EXTRA_PAGE_PROJECT_CARDS,
  OCEAN_FINANCE_PROJECT,
  type WorkProjectCard,
  type WorkTagSpec,
} from "../components/work-examples-portfolio";
import { fetchWorksData } from "../lib/strapi/case-studies";
import { fetchHomePageData, type HomePageCmsData } from "../lib/strapi/home-page";

const SITE_URL = "https://www.hoasen.io";

const TITLE = "Hoasen - Crafting the Future of Blockchain & Fintech";
const DESCRIPTION =
  "Hoasen is a blockchain and fintech development studio based in the UAE. We help startups and enterprises build and launch products on chain — from smart contracts and DApps to AI-driven fintech solutions.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "Hoasen",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/base-logo.svg`,
    width: 512,
    height: 512,
  },
  image: OG_IMAGE,
  description: DESCRIPTION,
  email: "contact@hoasen.io",
  telephone: "+971585401286",
  address: {
    "@type": "PostalAddress",
    streetAddress: "AL Hamra Industrial Zone-FZ",
    addressLocality: "Ras Al Khaimah",
    addressCountry: "AE",
  },
  areaServed: {
    "@type": "GeoShape",
    name: "Worldwide",
  },
  sameAs: [
    "https://www.linkedin.com/company/hoasendigital",
    "https://x.com/hoasenhub",
    "https://t.me/+4rZ4ipEl2yk2ODlk",
  ],
  knowsAbout: [
    "Blockchain Development",
    "Smart Contracts",
    "Decentralized Applications",
    "Fintech",
    "DeFi",
    "Ethereum",
    "Solana",
    "Cardano",
    "Artificial Intelligence",
    "Mobile Development",
    "Web Development",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Blockchain & Fintech Development Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Blockchain Development",
        description:
          "Specializing in creating secure and decentralized applications for various blockchain platforms.",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Solana (Rust) Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "EVM Development (ETH, AVAX)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cardano / Midnight (Haskell)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Solidity Smart Contracts" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move Smart Contracts" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "FunC (TON) Development" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Frontend Development",
        description:
          "Designing and developing visually appealing, responsive user interfaces.",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "React / Next.js Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Angular.JS Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vue Development" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Mobile Development",
        description:
          "Building performant native and cross-platform mobile applications.",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "React Native Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flutter Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Swift (iOS) Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kotlin (Android) Development" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Backend Development",
        description:
          "Building scalable and secure backend systems for web and mobile applications.",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Node.js / Express" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Python Backend" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Golang Backend" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "C# / .NET" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laravel (PHP)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "REST / GraphQL APIs" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Artificial Intelligence",
        description:
          "Integrating AI-driven solutions to automate workflows, enhance products, and unlock new capabilities.",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "LangChain / LangGraph Agents" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "RAG Implementation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Model Fine-tuning" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Product Design & Product Management",
        description:
          "Designing intuitive digital experiences and driving product strategy from discovery to delivery.",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interaction Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Framer / Webflow Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product Management" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Analysis" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Test Automation",
        description:
          "Ensuring product quality through automated testing pipelines, blockchain-specific validation, and end-to-end coverage.",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Playwright / Cypress E2E Testing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Blockchain Testing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "CI/CD Integration" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Jest Unit Testing" } },
        ],
      },
    ],
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Patrick Hizon",
        jobTitle: "CEO",
      },
      reviewBody:
        "Great job and reimagined work of a prior design firm at a much higher quality deliverable. The project management was managed very well - including churning out preliminary deliverables during the Christmas holiday period. They were responsive and on time with deliverables.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
      },
      publisher: {
        "@type": "Organization",
        name: "MuDigital",
        url: "https://mudigital.net",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Frank A.",
        jobTitle: "CTO",
      },
      reviewBody:
        "I worked with the Hoasen team and was impressed by their quality of work and depth of industry knowledge. It was a pleasure working with them.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
      },
      publisher: {
        "@type": "Organization",
        name: "Rain",
        url: "https://rain.com",
      },
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 5,
    reviewCount: 2,
    bestRating: 5,
  },
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Hoasen",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: TITLE,
  description: DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: OG_IMAGE,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ],
};

type HomeProps = {
  featuredProject: WorkProjectCard | null;
  projectCards: WorkProjectCard[];
  homePageData: HomePageCmsData | null;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [cmsWorks, homePageData] = await Promise.all([
    fetchWorksData(),
    fetchHomePageData("en"),
  ]);

  const worksProps =
    cmsWorks.source === "cms" &&
    (cmsWorks.featuredProject || cmsWorks.projectCards.length > 0)
      ? {
          featuredProject: cmsWorks.featuredProject,
          projectCards: cmsWorks.projectCards,
        }
      : {
          featuredProject: OCEAN_FINANCE_PROJECT,
          projectCards: [...CORE_PROJECT_CARDS, ...EXTRA_PAGE_PROJECT_CARDS],
        };

  return {
    props: {
      ...worksProps,
      homePageData: homePageData ?? null,
    },
    revalidate: 60,
  };
};

const Web: NextPage<HomeProps> = ({ featuredProject, projectCards, homePageData }) => {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="author" content="Hoasen" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={TITLE} />

        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content={TITLE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
      </Head>

      <div className="w-full relative bg-dark leading-[normal] tracking-[normal] text-left text-3xl text-white font-sora mq450:h-auto mq450:min-h-[4602]">
        <div className="pointer-events-none absolute top-[456px] left-[0px] w-full h-[348px] overflow-hidden">
          <Image
            className="object-cover ms1024:object-fill"
            src="/graph-wave@2x.png"
            alt=""
            fill
            sizes="100vw"
            priority
          />
        </div>
        <Nav initialTransparent scrollThreshold={80} />
        <HomeCmsSections
          initialHomePageData={homePageData}
          featuredProject={featuredProject}
          projectCards={projectCards}
        />
        <FooterComponent />
      </div>
    </>
  );
};

export default Web;
