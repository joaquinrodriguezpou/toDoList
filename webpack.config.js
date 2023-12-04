const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: path.join(__dirname, 'dist'), 
        compress: true,
        port: 8080,
        open: true,
      },
    module: {
    rules: [
        {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            use: [
                {
                loader: 'file-loader',
                options: {
                    outputPath: 'images', 
                },
                },
            ],
            },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            },
    ],
    },
}
