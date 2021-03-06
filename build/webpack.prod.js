const path = require('path')
const rootDir = path.resolve(__dirname, '../')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    art: path.join(rootDir, 'src/components/index.ts'),
    'art.mini': path.join(rootDir, 'src/components/index.ts'),
  },
  output: {
    path: path.join(rootDir, 'dist'),
    filename: '[name].js',
    // output.library 和 output.libraryTarget 一起使用 对外暴露 library 及定义输出组件库格式
    library: ['art', '[name]'],
    libraryTarget: 'umd',
    // cdn域名
    publicPath: './',
    libraryExport: 'default',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: { '@util': path.resolve(__dirname, '../src/components/_util') },
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.ts|\.tsx/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.ts|\.tsx|\.js|\.json/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          cache: true,
        },
      },
    ],
  },
  devtool: 'cheap-source-map',
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        include: /\.mini\.js/,
        sourceMap: true,
        extractComments: false,
      }),
    ],
    noEmitOnErrors: true,
  },
}
