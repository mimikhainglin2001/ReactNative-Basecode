const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'mjs'],
  unstable_enableTranspileModules: ['react-native'],
};

config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
  enableBabelRCLookup: true,
};

module.exports = config;