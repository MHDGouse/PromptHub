export default function getNextConfig() {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"], // Added "avatars.githubusercontent.com"
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  return nextConfig;
}
