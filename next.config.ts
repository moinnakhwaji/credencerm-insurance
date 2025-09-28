/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elportalimaging.com', // Keep the one from the Topbar
        port: '',
        pathname: '/wp-content/themes/elportal/assets/img/**',
      },
      {
        protocol: 'https',
        hostname: 'credencerm.com', // Add the new domain for the footer logo
        port: '',
        pathname: '/assets/images/**',
      },
    ],
  },
};

module.exports = nextConfig;