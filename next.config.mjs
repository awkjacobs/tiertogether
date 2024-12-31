/** @type {import('next').NextConfig} */

const nextConfig = {
    // webpack(config) {
    //     config.resolve.fallback = {
    //         // if you miss it, all the other options in fallback, specified
    //         // by next.js will be dropped.
    //         ...config.resolve.fallback,

    //         fs: false, // the solution
    //     }

    //     return config
    // },
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
