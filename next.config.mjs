import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */

const nextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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

const withMDX = createMDX({
    // Add markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
