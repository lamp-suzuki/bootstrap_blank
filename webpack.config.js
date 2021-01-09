//path モジュールの読み込み
const path = require("path");
//MiniCssExtractPlugin の読み込み
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./assets/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        // 対象となるファイルの拡張子(scss)
        test: /\.scss$/,
        // Sassファイルの読み込みとコンパイル
        use: [
          // CSSファイルを抽出するように MiniCssExtractPlugin のローダーを指定
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSをバンドルするためのローダー
          {
            loader: "css-loader",
            options: {
              // ソースマップを有効に
              sourceMap: true,
              // css-loader の前に適用されるローダーの数を指定
              importLoaders: 2,
            },
          },
          // PostCSS
          {
            loader: "postcss-loader",
            options: {
              // PostCSS でもソースマップを有効に
              sourceMap: true,
              postcssOptions: {
                // ベンダープレフィックスを自動付与
                plugins: ["autoprefixer"],
              },
            },
          },
          // Sass をコンパイルするローダー
          {
            loader: "sass-loader",
            options: {
              // dart-sass を優先
              implementation: require("sass"),
              sassOptions: {
                // fibers を使わない場合は以下で false を指定
                fiber: require("fibers"),
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        //file-loader の対象となるファイルの拡張子
        test: /\.(gif|png|jpe?g|svg|eot|wof|woff|ttf)$/i,
        use: [
          {
            //画像を出力フォルダーにコピーするローダー
            loader: "file-loader",
            options: {
              // 画像ファイルの名前とパスの設定
              name: "../images/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  //プラグインの設定
  plugins: [
    //MiniCssExtractPlugin プラグインのインスタンスを生成
    new MiniCssExtractPlugin({
      //出力される CSS のファイル名を指定
      filename: "../css/style.css",
    }),
  ],
  //source-map タイプのソースマップを出力
  devtool: "source-map",
};
