import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Speed up module resolution for heavy packages
    optimizePackageImports: ["framer-motion", "lucide-react", "@react-three/fiber", "@react-three/drei", "three"],
  },
};

export default nextConfig;
