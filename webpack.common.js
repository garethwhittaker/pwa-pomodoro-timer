const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
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
            favicon: './src/assets/images/favicon.ico',
            template: './src/index.html'
        }),
        new WebpackPwaManifest({
            name: 'Pomodoro Timer',
            short_name: 'Pomodoro',
            description: 'Pomodoro Timer',
            start_url: '.',
            fingerprints: false,
            display: 'fullscreen',
            orientation: 'any',
            background_color: '#222222',
            theme_color: '#222222',
            ios: {
                'apple-mobile-web-app-status-bar-style': 'black'
            },
            icons: [
                {
                    src: './src/assets/images/icons/timer-48x48.png',
                    destination: 'assets',
                    sizes: '48x48',
                    type: 'image/png'
                },
                {
                    src: './src/assets/images/icons/timer-64x64.png',
                    destination: 'assets',
                    sizes: '64x64',
                    type: 'image/png'
                },
                {
                    src: './src/assets/images/icons/timer-128x128.png',
                    destination: 'assets',
                    sizes: '128x128',
                    type: 'image/png',
                    ios: true
                },
                {
                    src: './src/assets/images/icons/timer-256x256.png',
                    destination: 'assets',
                    sizes: '256x256',
                    type: 'image/png',
                    ios: true
                },
                {
                    src: './src/assets/images/icons/timer-512x512.png',
                    destination: 'assets',
                    sizes: '512x512',
                    type: 'image/png',
                    ios: 'startup'
                }
            ]
        }),
        new WorkboxPlugin({
            globDirectory: 'dist',
            globPatterns: ['**/*.{html,js,css,json,woff2,png,mp3}'],
            swDest: path.join('dist', 'service-worker.js'),
            clientsClaim: true,
            skipWaiting: true
        })
    ]
};
