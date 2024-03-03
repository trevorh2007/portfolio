/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NODE_ENV === "development" ? "" : "/fatality-discord-bot",
    assetPrefix: process.env.NODE_ENV === "development" ? "" : "/fatality-discord-bot/",
    output: process.env.NODE_ENV === "development" ? undefined : "export",
    reactStrictMode: true
};

export default nextConfig;
