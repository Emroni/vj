module.exports = {
    purge: [
        './public/*.html',
        './src/*',
    ],
    darkMode: false,
    theme: {
        extend: {
            flex: {
              2: '2 2 0%',
              3: '3 3 0%',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
