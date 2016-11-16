import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/index.js',
    dest: 'dist/index.js',
    plugins: [
        babel({
            babelrc: false,
            presets: [['es2015', {modules: false}], 'stage-0'],
            plugins: ['transform-flow-strip-types'],
        }),
    ],
    format: 'cjs',
};
