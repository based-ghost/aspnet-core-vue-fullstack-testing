/* eslint-disable no-param-reassign,import/no-extraneous-dependencies  */

module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'production') {
      return {};
    }

    return {
      performance: {
        hints: false,
      },
      plugins: [],
    };
  },
};