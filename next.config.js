/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Allows smooth local image loading without server-side sharp dependency
  },
};

module.exports = nextConfig;

