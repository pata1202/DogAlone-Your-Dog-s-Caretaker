module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',  // Expo를 위한 Babel preset
    ],
    plugins: [
      'react-native-reanimated/plugin',  // Reanimated 플러그인
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: 'protectinfo.env', // 환경 변수 파일
        },
      ],
    ],
  };
};
