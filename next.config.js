/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'your-supabase-project.supabase.co'],
  },
  experimental: {
    serverComponentsExternalPackages: ['qrcode'],
  },
};

module.exports = nextConfig;
