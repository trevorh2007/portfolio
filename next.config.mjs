/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "development" ? "" : "/portfolio",
  assetPrefix: process.env.NODE_ENV === "development" ? "" : "/portfolio/",
  output: process.env.NODE_ENV === "development" ? undefined : "export",
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
