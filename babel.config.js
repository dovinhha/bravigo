const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

plugins.push([
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.js', '.json', '.ts'],
    alias: {
      '@screens': './src/screens',
      '@interfaces': './src/interfaces',
      '@contexts': './src/contexts',
    },
  },
]);

module.exports = {
  presets,
  plugins,
};
