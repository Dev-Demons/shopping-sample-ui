/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  },
  images: {
    domains: ["s3.dev.datamall.ai"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
