# react-upload
文件上传以及断点续传

#一、选用node做前端服务器，前端http库选用koa

yarn add koa koa-router koa-send

package.json 中有 dependencies devDependencies
线上环境最终需要的是html+js+css三种文件以及一个http服务
那么 koa系和最终打包生成的 就是生产依赖

# 二、webpack

yarn add webpack webpack-cli --dev

我们生产环境需要webpack吗？必然是不需要的，所以是开发依赖

# 三、react

yarn add react react-dom --dev

我们生产环境需要react吗？生产环境只认js，不管是jquery ，react，vue还是其他的，统统不认，只认js，所以是开发依赖

# 四、typescript

yarn add  typescript  tslint  --dev

需要ts支持，依赖同上

# 五、init

npx typescript --init

init typescript新建一个tsconfig.json文件，这个是ts主要依赖的东西

# 六、新建test命令

package.json 中scripts新建test， "test":"tsc"，
tsc是将ts生成js文件


# 七、新建test.js文件

// test内容
const arr = [1,2,3]
const arr2 = [...arr]

运行yarn test，发现生成了test.js文件，证明ts安装成功

# 八、配置webpack, 删除上一张的test相关文件

新建webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  }
};

# 九、新建src/app.js

console.log('hello word')

# 十、package添加srcipt 

"webpack":"webpack"
运行yarn webpack
生成 dist/app.js
运行 node ./dist/app.js，显示hello word

# 十一、添加ts支持

yarn add ts-loader --dev 

# 十二、修改webpack.config.js

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

# 十三、添加生成html的插件

yarn add html-webpack-plugin --dev

# 十四、添加一个模板template.html

<html>
  <head>
    <meta charset="utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
      <div id='root'/>
  </body>
</html>

# 十五、webpack添加插件plugin

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

# 十六、打包

npm run webpack

# 十七、添加types

yarn add @types/react-dom @types/react --dev

# 十八、将src/app.ts改为app.tsx

import React from "react";
import ReactDOM from "react-dom";
class App extends React.Component {
    public render() {
        return (
            <div>
             hello react
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));

并将webpack.config.js中的app.ts修改为app.tsx

# 十九、修改tsconfig.json，  

"jsx": "react"
yarn webpack

# 二十、安装对应的loader，样式文件最终要拆成单独的css文件

yarn add mini-css-extract-plugin css-loader --dev

# 二十一、添加css支持 webpack.config.js

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

# 二十二、src下的app.tsx文件修改为

import React from "react";
import ReactDOM from "react-dom";
import './app.css'
class App extends React.Component {
    public render() {
        return (
            <div>
             <div className='red'>hello red</div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

# 二十三、在src下新加css文件app.css

.red{
    color:red
}

# 二十四、添加less支持

yarn add less@2.7.3 less-loader --dev

# 二十五、添加webpack的loader

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

# 二十六、新建src/app.less

.green{
    color: green;
}

# 二十七、index/app.tsx修改

import React from "react";
import ReactDOM from "react-dom";
import './app.css'
import './app.less'
class App extends React.Component {
    public render() {
        return (
            <div>
                <div className='red'>hello red</div>
                <div className='green'>hello green</div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

yarn webpack

# 二十八、添加sass支持

yarn add sass-loader node-sass --dev

# 二十九、修改webpack.config.js

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

# 三十、修改app.tsx

import React from "react";
import ReactDOM from "react-dom";
import './app.css'
import './app.less'
import './app.scss'
class App extends React.Component {
    public render() {
        return (
            <div>
                <div className='red'>hello red</div>
                <div className='green'>hello green</div>
                <div className='blue'>hello blue</div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

添加src/app.scss

.blue {
    color: blue
}

yarn webpack

# 三十一、添加antd

yarn add antd --dev

# 三十二、修改src/app.tsx

import {Button} from "antd";
import React from "react";
import ReactDOM from "react-dom";
class App extends React.Component {
    public render() {
        return (
            <div>
                <Button >hello antd</Button>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

yarn webpack

# 三十三、发现样式丢了,选取ts-import-plugin方案

yarn add ts-import-plugin --dev

# 三十四、webpack.config.js修改

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

# 三十五、加入热更新

yarn add  webpack-dev-server --dev

package.json修改  "start":"webpack-dev-server"

wepack.config.js修改

devServer: {
    contentBase: "./dist",
    // host填写为0000是因为可能有remote开发的情况，0000不能访问就改成localhost
    host: "0.0.0.0",
}

# 三十六、添加插件的types、添加ts运行时、新建webpack.config.ts

yarn add @types/html-webpack-plugin @types/mini-css-extract-plugin @types/webpack-dev-server --dev
yarn add ts-node --dev

package.json修改
"start":"webpack-dev-server --config webpack.config.ts"

# 三十七、修改webpack.config.ts

...
    mode: 'development',
    devtool: "inline-source-map",
...

修改tsconfig.json

...
 // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
...

# 三十八、安装插件

yarn add error-overlay-webpack-plugin --dev

# 三十九、webpack.config.ts修改

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

<!-- 分出开发和生产（开发篇） -->

# 一、先安装工具

yarn add webpack-merge @types/webpack-merge --dev

打包生成后的文件分析工具
webpack-bundle-analyzer

yarn add webpack-bundle-analyzer @types/webpack-bundle-analyzer --dev

在webpack文件夹下新建webpack.prod.ts

<!-- 前后端分离部分 -->

# 一、新建server.js文件

const path = require('path');
const Koa = require('koa');
const send = require('koa-send');
const Router = require('koa-router');

const app = new Koa();

const router = new Router();
router.get(['/', '/**'], async (ctx) => {
  const url = ctx.path;
  await send(ctx, './index.html', {
      root: path.join(__dirname, 'dist'),
      maxAge: 1
    });
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000);


