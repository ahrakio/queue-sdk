const path = require('path');


// Clean configurations
const clean_paths = [
    'dist'
];

const clean_options = {
    watch: true
};

const config = {
    entry: './src/taskImpl.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
	output: {
        library: 'bundle',
        filename: 'dist/bundle.js',
        libraryTarget: 'umd',
        path: path.resolve(__dirname)
    },
    target: 'node',
    mode: 'none',
};

module.exports = config;
