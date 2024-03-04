/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "development" ? "" : "/portfolio",
  assetPrefix: process.env.NODE_ENV === "development" ? "" : "/portfolio/",
  output: process.env.NODE_ENV === "development" ? undefined : "export",
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
