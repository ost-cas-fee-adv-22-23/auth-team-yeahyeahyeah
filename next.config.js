/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yeahyeahyeah-qlabww.zitadel.cloud',
        port: '',
        pathname: '/assets/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/assets/**',
      },
    ],
  },
};

module.exports = nextConfig;
