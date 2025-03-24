import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: ['res.cloudinary.com', 'ext.same-assets.com', 'images.unsplash.com', 'placehold.co'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dnimr7n8t/**', // Match the Cloudinary account ID path
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  //  redirect handling for routes
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en/Home',
        permanent: true,
      },
      {
        source: '/Home',
        destination: '/en/Home',
        permanent: true,
      }
    ]
  },
}

export default withNextIntl(nextConfig);