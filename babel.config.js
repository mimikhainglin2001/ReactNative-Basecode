module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['babel-plugin-transform-typescript-metadata', { "spec": "decorators" }],
      ['@babel/plugin-proposal-decorators', { "version": "legacy" }],
    ],
    overrides: [
      {
        include: [/node_modules[\\/]react-native[\\/]/],
        plugins: [
          ['@babel/plugin-transform-private-methods', { "loose": true }],
          ['@babel/plugin-transform-private-property-in-object', { "loose": true }],
        ],
      },
    ],
  };
};