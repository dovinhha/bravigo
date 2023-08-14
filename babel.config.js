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
      '@configs': './src/configs',
      '@apis': './src/apis',
      '@assets': './src/assets',
    },
  },
]);

module.exports = {
  presets,
  plugins,
};
