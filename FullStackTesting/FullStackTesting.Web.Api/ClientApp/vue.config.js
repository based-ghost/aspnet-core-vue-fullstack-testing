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

  // Load sass global variables/mixins - can then be referenced in style sheets / in-line style .vue style tags
  // NO LONGER VALID CONFIGURATION AFTER RECENT UPDATE TO SASS-LOADER PACKAGE
  // IMPORT VARIABLES AND MIXINS TOWARDS BEGINNING OF SASS IMPORTS FOR NOW

  /*
    css: {
      loaderOptions: {
        sass: {
          data: `@import "~@/assets/style/base/variables.scss";`
        }
      }
    },
  */
};