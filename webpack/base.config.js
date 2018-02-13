const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

const configureIcon = (size, ios = false) => {
    return {
        src: path.resolve(__dirname, `../src/assets/images/icons/timer-${ size }x${ size }.png`),
        destination: 'assets',
        sizes: `${ size }x${ size }`,
        type: 'image/png',
        ios
    };
};

module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['babel-preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.(mp3|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/'
                    }
                }
            }
        ]
    },
    resolve: {
        alias: { 'vue$': 'vue/dist/vue.esm.js' },
        extensions: ['.js', '.vue', '.scss', '.mp3']
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new WebpackPwaManifest({
            name: 'Pomodoro Timer',
            short_name: 'Pomodoro',
            description: 'Pomodoro Timer',
            start_url: '.',
            filename: 'manifest.json',
            fingerprints: false,
            display: 'fullscreen',
            orientation: 'any',
            background_color: '#222222',
            theme_color: '#222222',
            ios: {
                'apple-mobile-web-app-status-bar-style': 'black'
            },
            icons: [
                configureIcon(48),
                configureIcon(64),
                configureIcon(128, true),
                configureIcon(256, true),
                configureIcon(512, 'startup')
            ]
        }),
        new WorkboxPlugin({
            globDirectory: path.resolve(__dirname, '../dist'),
            globPatterns: ['**/*.{html,js,css,json,woff2,png,mp3}'],
            swDest: path.resolve(__dirname, '../dist/sw.js'),
            clientsClaim: true,
            skipWaiting: true
        })
    ]
};
