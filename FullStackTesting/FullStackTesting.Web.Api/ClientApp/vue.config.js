/* eslint-disable no-param-reassign,import/no-extraneous-dependencies  */

module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      return {};
    }

    return {
      devtool: false,
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
      },
      plugins: [],
    };
  },
};