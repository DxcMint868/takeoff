/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config.js");

const remotePatterns = [];

if (process.env.NEXT_PUBLIC_STRAPI_URL) {
  try {
    const cmsUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL);
    remotePatterns.push({
      protocol: cmsUrl.protocol.replace(":", ""),
      hostname: cmsUrl.hostname,
      port: cmsUrl.port || "",
      pathname: "/**",
    });
  } catch {
    // Ignore invalid URL; fallback paths and hardcoded assets will still work.
  }
}

const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    remotePatterns,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: "/works/:slug/llms.txt",
        destination: "/api/works-llms-txt/:slug",
      },
    ];
  },
};

module.exports = nextConfig;
