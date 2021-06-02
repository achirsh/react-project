# react-project

# 一、安装基础依赖

```
yarn add

@types/html-webpack-plugin
@types/mini-css-extract-plugin
@types/webpack-dev-server
@types/webpack-merge
@types/react-dom 
@types/react
@types/webpack-bundle-analyzer
antd
css-loader
error-overlay-webpack-plugin
mini-css-extract-plugin         样式文件最终要拆成单独的css文件
html-webpack-plugin             添加生成html的插件
less@2.7.3 
less-loader
webpack
webpack-cli
react
react-dom
typescript
sass-loader
node-sass
ts-loader
ts-import-plugin
tslint
ts-node
webpack-dev-server               热更新
webpack-merge
webpack-bundle-analyzer
--dev

```

线上环境最终需要的是html+js+css三种文件以及一个http服务


# 二、新建tsconfig.json文件

npx typescript --init

init typescript新建一个tsconfig.json文件，这个是ts主要依赖的东西

"jsx": "react"
"sourceMap": true

# 三、新建test命令(此处只是为了验证ts安装成功)

package.json 中scripts新建test
"test":"tsc"，
tsc是将ts生成js文件

新建test.js文件

// test内容
const arr = [1,2,3]
const arr2 = [...arr]

运行yarn test，发现生成了test.js文件，证明ts安装成功


# 四、配置webpack

新建webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  }
};

新建src/app.js：console.log('hello word')

package添加srcipt 

"webpack":"webpack"
运行yarn webpack
生成 dist/app.js
运行 node ./dist/app.js，显示hello word


# 五、修改webpack.config.js

const path = require('path');

module.exports = {
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
        }]
    }
};

npm run webpack
node ./dist/app.js

# 六、添加一个模板template.html

<html>
  <head>
    <meta charset="utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
      <div id='root'/>
  </body>
</html>

# 七、webpack.config添加插件plugin

const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader",

            exclude: /node_modules/,
        }]
    },
    plugins: [
        // 这里面的template是模板的位置，title是模板渲染的变量 htmlWebpackPlugin.options.title 
        new HtmlWebpackPlugin({
            title: "test",
            template: path.resolve(__dirname, "template.html"),
        })
    ]
};



# 八、webpack.config添加css配置

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module: {
    rules: [...
        {
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                },
                {
                    loader: "css-loader",
                },

            ],
            exclude: /node_modules/,
        },
    ]
},
plugins: [
    ...
    new MiniCssExtractPlugin({
        filename: "app.css",
    }),
]

# 九、webpack.config添加less配置

module: {
    rules: [
        ...
        {
            test: /\.less$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
            },
            {
                loader: "css-loader",
            },
            {
                loader: "less-loader",

            },
            ],
        },
    ]
}


# 十、webpack.config添加scss配置

module: {
    rules: [
        ...
        {
            test: /\.scss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader',
            }, {
                loader: 'sass-loader'
            }],
            exclude: /node_modules/
        },
    ]
}

# 十一、webpack.config添加ts-import-plugin配置

const tsImportPluginFactory = require("ts-import-plugin");

mode: 'development',

options: {
    transpileOnly: true,
    getCustomTransformers: () => ({
        before: [tsImportPluginFactory({
            libraryName: "antd",
            libraryDirectory: "lib",
            style: true,
        })],
    }),
    compilerOptions: {
        module: "es2015",
    },
},

# 十二、webpack.config添加热更新配置

package.json修改  "start":"webpack-dev-server"

devServer: {
    contentBase: "./dist",
    // host填写为0000是因为可能有remote开发的情况，0000不能访问就改成localhost
    host: "0.0.0.0",
}

# 三十三、添加插件的types、添加ts运行时、新建webpack.config.ts

package.json修改
"start":"webpack-dev-server --config webpack.config.ts"

# 十四、webpack.config添加map配置

...
    mode: 'development',
    devtool: "inline-source-map",
...


# 十五、webpack.config添加error-overlay-webpack-plugin配置

...
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
...
 plugins: [
       new HtmlWebpackPlugin({
            title: "test",
            template: path.resolve(__dirname, "template.html"),
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: "app.css",
            // chunkFilename: "[id].[hash].css",
            // ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new ErrorOverlayPlugin()
    ],
...

