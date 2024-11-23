module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'], // 통합된 presets
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: 'protectinfo.env', // 환경 변수 파일 이름 지정
        },
      ],
    ],
  };
};

