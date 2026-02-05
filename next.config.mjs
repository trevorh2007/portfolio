/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
