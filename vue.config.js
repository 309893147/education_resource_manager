module.exports = {
    publicPath: './',
    assetsDir: 'static',

    productionSourceMap: false,
    devServer: {
        disableHostCheck:true,
        port: 8001,
        open:true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
          },
        proxy: {
            '/manage/*':{
                // target:'http://192.168.10.164:8011/',
                // target:'http://192.168.10.111:8126/',
                target:'http://192.168.1.5:8088/',
                // 192.168.10.111:8126
                // 192.168.10.171:8011
                secure: false,
                changeOrigin:true
            },
            '/common/*':{
                target:'http://192.168.10.171:8011/',
                // target:'http://192.168.10.164:8011/',
                secure: false,
                changeOrigin:true
            },
            '/api/*':{
                // target:'http://192.168.10.164:8011/',
                target:'http://192.168.10.171:8011/',
                secure: false,
                changeOrigin:true
            }
        }
    }
}