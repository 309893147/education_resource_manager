module.exports = {
    publicPath: './',
    assetsDir: 'static',

    productionSourceMap: false,
    devServer: {
        disableHostCheck:true,
        port: 8002,
        open:true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
          },
        proxy: {
            '/manage/*':{
                // target:'http://192.168.10.164:8011/',
                target:'http://localhost:8088/',
                secure: false,
                changeOrigin:true
            }
        }
    }
}