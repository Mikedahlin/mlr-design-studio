import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["host.docker.internal", "192.168.4.113"],
};

export default nextConfig;
