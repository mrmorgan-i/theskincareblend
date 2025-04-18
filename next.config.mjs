/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "lh3.googleusercontent.com" },
        { protocol: "https", hostname: "avatars.githubusercontent.com" },
        { protocol: "https", hostname: "utfs.io" },
        { protocol: "https", hostname: "plus.unsplash.com" },
        { protocol: 'https', hostname: 'i.imgur.com'},
      ],
    },
  }
  
  export default nextConfig
  