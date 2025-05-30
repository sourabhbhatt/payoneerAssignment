/*
Because it :
  - Enables support for modern JavaScript/TypeScript in React Native
  - Allows custom path aliases for cleaner and scalable imports
  - Ensures compatibility with mobile platforms (iOS & Android)
  - Provides flexibility to add useful plugins like Reanimated
*/

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api': './src/api',
          '@app': './src/app',
          '@assets': './src/assets',
          '@components': './src/components',
          '@features': './src/features',
          '@hooks': './src/hooks',
          '@navigator': './src/navigator',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@storage': './src/storage',
          '@types': './src/types',
          '@utils': './src/utils',
          linking: './src/linking.ts',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
