/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "ts6.x1.international.travian.com",
      "wallpaperaccess.com",
      "cdn-icons-png.flaticon.com",
    ],
  },
};

module.exports = nextConfig;
