module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192, 
                name: 'images/[name].[ext]',
              },
            }
          ] 
        } 
      ] 
    }, 
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      static: './dist',
      allowedHosts: ['https://elastic-gate-production.up.railway.app/', 'http://localhost:3000/']
    }
  };
  