const path = require('path');
const rules = [
    {
        test: /\.tsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    },
    {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        loader: [
            'file-loader'
        ]
    }
]

module.exports = {
    target: 'web',
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: { rules },
    resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
    devServer: {
        contentBase: './',
        port: 3000,
        historyApiFallback: true
    }
}