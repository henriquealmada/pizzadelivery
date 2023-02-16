/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i0.wp.com', 'res.cloudinary.com']
  },
  env: {
    TOKEN: process.env.TOKEN
  }
}

module.exports = nextConfig
