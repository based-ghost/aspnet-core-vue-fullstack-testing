/* eslint-disable no-param-reassign,import/no-extraneous-dependencies  */
const path = require('path');

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

  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/style/base/variables.scss";`
      }
    }
  },
};