/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages deployment — no trailing slash so links work correctly
  trailingSlash: false,
  // Images are unoptimized because static export cannot use the server-side image optimizer
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
