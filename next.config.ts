import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "nyc3.digitaloceanspaces.com",

      },
      {
        protocol: "http", // Allow HTTP protocol for localhost
        hostname: "localhost",
        port: "5000", // Specify the port your local server is running on
      },
    ],
  },
};

export default nextConfig;
