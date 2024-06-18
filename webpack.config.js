const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const shouldAnalyze = env && env.analyze; // Accede all'argomento 'analyze'
  const config = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/' // Assicurati che questo sia impostato su '/'
    },
    resolve: {
      alias: {
        phaser: path.resolve(__dirname, 'node_modules/phaser/dist/phaser' + (isProduction ? '.min.js' : '.js'))
      }
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9001,
      hot: true,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: isProduction ? [
      new webpack.HotModuleReplacementPlugin(), // Plugin per l'hot module replacement
      new WebpackObfuscator({
        // Opzioni di obfuscation qui
      })
    ] : [
    ]
  };
  if (shouldAnalyze) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  if (isProduction) {
    // Aggiungi WebpackObfuscator solo in produzione
    config.plugins.push(
      new WebpackObfuscator({
        rotateStringArray: true,
        stringArray: true,
        seed: 58858, // Per rendere la "randomizzazione" consistente tra le build
        renameGlobals: true, // Attenzione: cambiare questa opzione può rompere il tuo codice se utilizza variabili globali
        unicodeEscapeSequence: false // Trasforma le stringhe in sequenze escape unicode
      })
    );
    // Aggiungi CompressionPlugin solo in produzione
    config.plugins.push(
      new CompressionPlugin({
        // Opzioni di compressione qui
        algorithm: 'gzip',
        test: /\.(js|css)$/,
        // Altre opzioni secondo le necessità
        compressionOptions: { level: 9 },
        // threshold: 10240,
        minRatio: 0.8
      })
    );
    config.plugins.push(
      new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
            level: 11,  
        },
        // threshold: 10240,
        minRatio: 0.8
      })
    );
  }
  return config;
};
