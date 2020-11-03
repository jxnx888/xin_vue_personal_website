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

        ]

    }
}