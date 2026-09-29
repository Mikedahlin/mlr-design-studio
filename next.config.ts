import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["host.docker.internal", "192.168.4.113"],
  async redirects() {
    return [
      { source: "/work", destination: "/", permanent: false },
      { source: "/work/:path*", destination: "/", permanent: false },
      { source: "/services", destination: "/", permanent: false },
      { source: "/about", destination: "/", permanent: false },
      { source: "/templates/:path*", destination: "/", permanent: false },
      { source: "/source-preview/:path*", destination: "/", permanent: false },
      { source: "/studio", destination: "/", permanent: false },
      { source: "/exhibit", destination: "/", permanent: false },
      { source: "/exhibit/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
