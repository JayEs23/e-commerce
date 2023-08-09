/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['inshoppermedia.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
