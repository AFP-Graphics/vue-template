const path = require('path')
const config = require('./config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = env => {
  return {
    target: 'web',
    context: path.resolve(__dirname),
    entry: {
      polyfills: './src/polyfills.js',
      main: './src/main.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist', config.publicDir),
      filename: 'static/js/[name].[hash:7].bundle.js'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        {
          test: /\.txt$/,
          exclude: /node_modules/,
          loader: '@newsdev/archieml-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: path.join('static/img', '[name].[hash:7].[ext]')
              }
            }
            // WEBPACK 4 - img-loader has issues. Please check http://infodyn-gitlab.afp.com/news-interactive-templates/vue-template/issues/2
            // In the meantime don't forget to optimize images by yourself.
            // When img-loader has fixed its issues, add it to package.json before uncommenting
            //
            // {
            //   loader: 'img-loader',
            //   options: {
            //     enabled: env.NODE_ENV === 'production',
            //     gifsicle: {
            //       optimizationLevel: 2,
            //       interlaced: true
            //     },
            //     mozjpeg: {
            //       quality: 60,
            //       progressive: true,
            //       arithmetic: false
            //     },
            //     optipng: false, // disabled
            //     pngquant: {
            //       floyd: 0.5,
            //       speed: 2,
            //       quality: 60
            //     },
            //     svgo: {
            //       plugins: [
            //         { removeTitle: true },
            //         { convertPathData: true },
            //         { cleanupAttrs: true },
            //         { removeDoctype: true },
            //         { removeXMLProcInst: true },
            //         { removeComments: true },
            //         { removeMetadata: true },
            //         { removeDesc: true },
            //         { removeUselessDefs: true },
            //         { removeEditorsNSData: true },
            //         { removeEmptyAttrs: true },
            //         { minifyStyles: true },
            //         { convertTransform: true },
            //         { removeUselessStrokeAndFill: true },
            //         { removeUnusedNS: true }
            //       ]
            //     }
            //   }
            // }
          ]
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.join('static/media', '[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.join('static/fonts', '[name].[hash:7].[ext]')
          }
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        vue: 'vue/dist/vue.js'
      }
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'AFP Interactive - ' + process.env.npm_package_name,
        filename: './index.html',
        inject: 'body',
        favicon: './favicon.ico'
      }),
      new VueLoaderPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env.NODE_ENV)
        }
      }),
      new FriendlyErrorsWebpackPlugin()
    ],
    devServer: {
      compress: true,
      hot: true,
      port: 8081,
      quiet: true,
      clientLogLevel: 'warning',
      overlay: {
        warnings: true,
        errors: true
      }
    },
    node: {
      // prevent webpack from injecting useless setImmediate polyfill because Vue
      // source contains it (although only uses it if it's native).
      setImmediate: false,
      // prevent webpack from injecting mocks to Node native modules
      // that does not make sense for the client
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  }
}
