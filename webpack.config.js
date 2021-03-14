const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const DEV = (process.env.npm_lifecycle_event === 'watch');

module.exports = () => ({
    mode: DEV ? 'development' : 'production',
    devtool: DEV && 'source-map',
    entry: {
        controls: './src/controls/index.js',
        styles: './src/styles.scss',
        visuals: './src/visuals/index.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                include: path.resolve(__dirname, 'src'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'raw-loader',
                    'glslify-loader',
                ],
            },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/build') + '/',
    },
    performance: {
        hints: false,
    },
    optimization: {
        minimize: !DEV,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name].css`,
        }),
        new LiveReloadPlugin(),
    ],
});