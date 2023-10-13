/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

module.exports = {
  images: {
    domains: ["unimeet-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
  compiler: {
    styledComponents: true,
  },
};
