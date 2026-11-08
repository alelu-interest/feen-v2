const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// assets/sede/sede.html is a file the app carries and opens, not code
config.resolver.assetExts.push('html');

module.exports = config;
