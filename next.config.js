/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'media.tenor.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movie',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
