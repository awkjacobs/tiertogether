/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        reactCompiler: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.themoviedb.org",
                port: "",
                pathname: "/3/**",
            },
            {
                protocol: "http",
                hostname: "image.tmdb.org",
                port: "",
                pathname: "/t/p/**",
            },
            {
                protocol: "https",
                hostname: "images.igdb.com",
                port: "",
                pathname: "/igdb/image/upload/**",
            },
        ],
    },
}

export default nextConfig
