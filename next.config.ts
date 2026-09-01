import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 // Allow googleapis module to be used in server components
 serverExternalPackages: ['googleapis', 'google-auth-library'],
};

export default nextConfig;
