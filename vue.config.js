const webpack = require('webpack')
module.exports = {
    configureWebpack: {
        plugins: [

            new webpack.ProvidePlugin({
                $: "jquery",

                jQuery: "jquery",
                jquery:"jquery",
                "windows.jQuery": "jquery"

            })

        ],
       /* rules:[
            // OrbitControls.js库使用
            {
                test: require.resolve("three/examples/js/controls/OrbitControls"),
                use: "imports-loader?THREE=three"
            },
            {
                test: require.resolve("three/examples/js/controls/OrbitControls"),
                use: "exports-loader?THREE.OrbitControls"
            },
            // CSS2DRenderer.js库使用
            {
                test: require.resolve("three/examples/js/renderers/CSS2DRenderer.js"),
                use: "imports-loader?THREE=three"
            },
            {
                test: require.resolve("three/examples/js/renderers/CSS2DRenderer.js"),
                use: "exports-loader?THREE.CSS2DRenderer"
            },
            // OBJLoader.js库使用
            {
                test: require.resolve("three/examples/js/loaders/OBJLoader.js"),
                use: "imports-loader?THREE=three"
            },
            {
                test: require.resolve("three/examples/js/loaders/OBJLoader.js"),
                use: "exports-loader?THREE.OBJLoader"
            },
        ]*/

    }
}
