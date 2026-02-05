/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
