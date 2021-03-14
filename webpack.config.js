const LiveReloadPlugin = require('webpack-livereload-plugin');
const Path = require('path');

const DEV = (process.env.npm_lifecycle_event === 'watch');

module.exports = () => ({
    mode: DEV ? 'production' : 'development',
    devtool: DEV && 'source-map',
    entry: {
        app: './src/visuals/index.js',
    },
    module: {
        rules: [
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader',
                    'glslify-loader',
                ],
            },
        ],
    },
    output: {
        filename: '[name].js',
        path: Path.resolve(__dirname, 'public/build') + '/',
    },
    performance: {
        hints: false,
    },
    optimization: {
        minimize: !DEV,
    },
    plugins: [
        new LiveReloadPlugin(),
    ],
});