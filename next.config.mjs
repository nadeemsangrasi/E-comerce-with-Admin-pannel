/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  images: {
    domains: ["img.clerk.com", "res.cloudinary.com", "via.placeholder.com"],
  },
};

export default nextConfig;
