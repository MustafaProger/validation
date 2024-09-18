'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\\.m?js$/,  // 4.1. Проверяет файлы с расширением .js или .mjs.
        exclude: /(node_modules|bower_components)/,  // 4.2. Исключает папки node_modules и bower_components из обработки.
        use: {
          loader: 'babel-loader',  // 4.3. Указывает, что для файлов будет использоваться babel-loader.
          options: {
            presets: [['@babel/preset-env', {  // 4.4. Используется preset-env для трансляции в нужный JavaScript.
              debug: true,  // 4.5. Включает режим отладки для вывода подробной информации.
              corejs: 3,  // 4.6. Указывает версию core-js для полифилов.
              useBuiltIns: "usage"  // 4.7. Включает полифилы только для тех функций, которые реально используются в коде.
            }]]
          }
        }
      }
    ]
  }
};