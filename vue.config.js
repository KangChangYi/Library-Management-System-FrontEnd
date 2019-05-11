/* eslint-disable no-param-reassign */
const path = require('path');
const cpus = require('os').cpus().length;

module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production'
        ? '/' // your_production_url
        : '/',

    // 输出文件目录
    outputDir: 'dist',
    assetsDir: 'static', // 静态资源目录

    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,

    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: (config) => {
        config.module
            .rule('svg')
            .exclude.add(path.resolve(__dirname, './src/icons'))
            .end();

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            });
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production';
        } else {
            // 为开发环境修改配置...
            config.mode = 'development';
        }
        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/components'),
                },
            },
        });
    },

    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件

    // css相关配置
    css: {
    // 是否使用css分离插件 ExtractTextPlugin
        extract: false, // false 为开启css热更新 true为关闭 打包时置为true即可
        sourceMap: false, // 开启 CSS source maps?
        // css预设器配置项
        loaderOptions: {
            //  全局css样式，具体用法参考App.vue
            sass: {
                data: `
          @import "@/styles/index.scss";
        `,
            },
        },
        modules: false, // 启用 CSS modules for all css / pre-processor files.
    },

    parallel: cpus > 1, // 构建时开启多进程处理 babel 编译

    runtimeCompiler: true,
    // webpack-dev-server 相关配置
    devServer: {
        open: true, // 配置自动启动浏览器
        port: 8080,
        https: false,
        hotOnly: false,
        // proxy: {
        //  // 设置代理
        //  // proxy all requests starting with /api to jsonplaceholder
        //  'http://localhost:8080/': {
        //      target: 'http://baidu.com:8080', //真实请求的目标地址
        //      changeOrigin: true,
        //      pathRewrite: {
        //          '^http://localhost:8080/': ''
        //      }
        //  }
        // },
        before: (app) => {},
    },
    // 第三方插件配置
    pluginOptions: {
    // ...
    },
};
