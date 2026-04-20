/** @type {import('next').NextConfig} */
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
  reactStrictMode: true,
  images: {
    remotePatterns,
  },
};

module.exports = nextConfig;
