# vue-slider-gif-maker
基于[gif](https://github.com/jnordberg/gif.js)和[vue-slider-component](https://github.com/NightCatSama/vue-slider-component)二次封装的拖拽截图生成gif的vue组件

## Todo
- [X]拖拽截图
- [X]生成gif
- [x]手动拖动选择画面截取
- [x]选择范围后自动截取
- [X]继承vue-slider-component入参
- [X]支持gif帧率入参
## Run example
```bash
npm i

npm run dev
```
## Use it
```bash
npm install vue-slider-gif-maker --save
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

### Props
| Props | 类型 | 默认值 | 描述 | 参数描述 |
| href | String | '' | 视频链接地址 | |
| maker-type | String | drop | 截取方式 | `drop`:拖拽范围后自动截取;`click`:选择画面截取 |
|vue-slider-config|Object|{} | vue-slider组件的参数透传 | [vue-slider组件入参](https://github.com/NightCatSama/vue-slider-component#props)

### Methods
| Methods | 使用条件 | 入参 | 效果 | 返回 |
| screenShot | maker-type='click' | | 截屏 | {img:<Img DOM>,blob:<Blob>图片二进制内容} |
| mergeGif | maker-type='click' | 同 https://github.com/jnordberg/gif.js | 截屏 | {gif:<Img DOM>,blob:<Blob>图片二进制内容} |
| autoMergeGif | maker-type='drop' | {frame:<Number>截取时间段内取几张图片}其他参数同上 | 选定区间后自动截屏 | <Promse> {gif:<Img DOM>,blob:<Blob>图片二进制内容},imgMap<Array> ImgDom的Array |