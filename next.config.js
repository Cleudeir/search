/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "media.tenor.com"]
  }
};

module.exports = nextConfig;
