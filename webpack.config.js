// Node.js 내장 모듈 'path'
const path = require('path');

// HTML 파일을 생성하고 번들링된 자바스크립트를 주입해주는 플러그인
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 개발 모드 설정 (개발 모드로 설정하면 번들링된 파일이 가독성이 좋게 출력됨)
  mode: 'development',
  // 엔트리 포인트를 설정. 웹팩이 번들을 시작할 시작점
  entry: {
    main: './src/main.tsx',
  },
  // 번들링된 결과물을 반환하는 설정
  output: {
    // 번들링된 파일의 이름
    path: path.resolve(__dirname, 'dist'),
  },

  // 모듈 해석 방법에 관한 설정
  resolve: {
    // 해당 확장자를 갖는 파일들은 웹팩이 번들링 할 때 모듈로 인식함
    extensions: ['.tsx', '.ts', '.jsx', '.js'],

    // 모듈을 로드할 때, 해당 모듈을 찾기 위해 검색할 경로를 설정
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],

    // 경로 별칭 설정. '@/components/MyComponent'와 같이 '@'로 시작하는 경로를 사용할 수 있음
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // 웹팩이 어떻게 다양한 유형의 파일을 처리해야하는지에 관한 규칙
  module: {
    rules: [
      {
        // 해당 파일 확장자에 일치하는 모든 파일을 'file-loader'를 사용하여 처리함
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        // TypeScript와 JavaScript 파일을 babel-loader를 사용하여 처리함
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // 이미지 파일을 'file-loader'를 사용하여 처리함
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // 출력 파일의 이름 설정
              name: '[name].[hash].[ext]',
              // 출력 파일의 경로 설정
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        // SVG 파일 처리. '@svgr/webpack'은 SVG를 리액트 컴포넌트로 변환하고 'file-loader'는 파일로 처리함
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        // CSS 파일을 처리. 'style-loader'는 스타일을 DOM에 삽입하고 'css-loader'는 CSS를 모듈로 해석함
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // 개발 서버 설정
  devServer: {
    // 압축하여 제공
    compress: true,
    // 서버의 포트 번호
    port: 3000,
    // HMR(Hot Module Replacement) 활성화
    hot: true,
    // 단일 페이지 어플리케이션의 라우팅 지원
    historyApiFallback: true,
  },

  // 웹팩 플러그인 설정
  plugins: [
    // HtmlWebpackPlugin를 사용하여 'index.html' 템플릿을 기반으로 최종 HTML 파일을 생성함
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
