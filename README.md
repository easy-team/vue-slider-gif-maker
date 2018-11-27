# vue-slider-gif-maker
基于[gif](https://github.com/jnordberg/gif.js)和[vue-slider-component](https://github.com/NightCatSama/vue-slider-component)二次封装的拖拽截图生成gif的vue组件

## Todo
- [x] 拖拽截图
- [x] 生成gif
- [x] 手动拖动选择画面截取
- [x] 选择范围后自动截取
- [x] 继承vue-slider-component入参
- [x] 支持gif帧率入参
## Run example
```bash
npm i

npm run dev
```
## Use it
由于组件需要依赖放置于静态资源目录下的[worker](https://www.w3schools.com/html/html5_webworkers.asp)文件。安装后将会自动收到copy文件到本地静态资源目录的提示。

或者也可手动获取本repositorie中[asset](https://github.com/easy-team/vue-slider-gif-maker/tree/master/asset)目录下的[gif.worker.js](https://github.com/easy-team/vue-slider-gif-maker/blob/master/asset/gif.worker.js)文件，并放置在本地项目的静态资源目录下。
> 为什么需要有一个worker文件，[点击这里了解更多](https://github.com/jnordberg/gif.js#usage)
```bash
npm install vue-slider-gif-maker --save

// 按照提示输入本地应用的静态资源目录，请以提示的路径为为基础。
What`s your static asset dir(Current dir is "/current")? Please base on current dir!:public

"gif.worker.js" had copied to " /current/public"
```





```html
<template>
  <div>
    <vue-slider-gif-maker maker-type="drop" href=""></vue-slider>
  </div>
</template>
<script>
import vueSliderGifMaker from 'vue-slider-gif-maker'

```

### 自动截取生成GIF

![mergeGifVideo](https://raw.githubusercontent.com/easy-team/vue-slider-gif-maker/master/public/20181127115442.gif)


### 最终输出结果

![gifResult](https://raw.githubusercontent.com/easy-team/vue-slider-gif-maker/master/public/20181127115444.gif)


### Props
| Props | 类型 | 默认值 | 描述 | 参数描述 |
|-|-|-|-|-|
| href | String | "" | 视频链接地址 | |
| maker-type | String | drop | 截取方式 | `drop`:拖拽范围后自动截取;`click`:选择画面截取 |
|vue-slider-config|Object|{} | vue-slider组件的参数透传 | [vue-slider组件入参](https://github.com/NightCatSama/vue-slider-component#props) |

### Methods
| Methods | 使用条件 | 入参 | 效果 | 返回 |
|-|-|-|-|-|
| screenShot | maker-type='click' |无 | 截图 | {img:(Img DOM),blob:(图片二进制内容)} |
| mergeGif | maker-type='click' | 同 https://github.com/jnordberg/gif.js | 生成gif | {gif:(Img DOM),blob:(图片二进制内容)} |
| autoMergeGif | maker-type='drop' | {frame:<Number>截取时间段内取几张图片}其他参数同上 | 选定区间后自动截图并生成gif | <Promse> {gif:(Img DOM),blob:(图片二进制内容),imgMap:(ImgDom的Array)} |