/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // روش قدیمی (فقط دامنه)
    domains: ["randomuser.me"], 
    
    // روش جدید و پیشنهادی (با جزئیات بیشتر)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-api.kelidari.ir",
        port: "",
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;