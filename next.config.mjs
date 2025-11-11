/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Removed output: 'export' to allow dynamic routes
  // If you need static export, ensure all dynamic routes have generateStaticParams
};

export default nextConfig;