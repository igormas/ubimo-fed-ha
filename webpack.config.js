const path = require('path');

module.exports = {
    mode: "development",
    entry:'./src/ad-emitter.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: ['./dist']
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'ad-emitter.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
    ]
};