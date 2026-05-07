/** @type {import('next').NextConfig} */
const remotePatterns = [
  {
    protocol: "https",
    hostname: "blockworks.co",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "blockworks-co.imgix.net",
    pathname: "/**",
  },
];

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
