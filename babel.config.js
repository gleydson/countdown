module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console']
    }
  },
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@common': './src/common',
          '@components': './src/components',
          '@screens': './src/screens',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@constants': './src/constants',
          "@services": "./src/services",
          "@routes": "./src/routes",
          "@configs": "./src/configs",
        },
      },
    ],
  ]
};
