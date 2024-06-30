/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Enable WebAssembly experiments
      config.experiments = {
        ...config.experiments, // Spread existing experiments (if any)
        asyncWebAssembly: true,
      };
  
      // Return the modified config
      return config;
    },
  };
  
  export default nextConfig;