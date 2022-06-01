/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "ts6.x1.international.travian.com",
    ],
  },
};

module.exports = nextConfig;
