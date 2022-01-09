// Example config for adding a loader that depends on babel-loader
// This source was taken from the @next/mdx plugin source:
// https://github.com/vercel/next.js/tree/canary/packages/next-mdx
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.csv/,
      use: [
        {
          loader: "csv-loader",
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true,
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.svg/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ['openmoji.org'],
  },
};
