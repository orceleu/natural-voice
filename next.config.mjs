/** @type {import('next').NextConfig} */
const nextConfig = {
  /* webpack: (config, { isServer }) => {
    // Ajoutez la configuration pour file-loader
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/app",
          name: "app/sound/[name].[hash].[ext]",
        },
      },
    });
    return config;
  },*/
};
export default nextConfig;
