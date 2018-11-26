<template>
  <div class="vue-slider-gif-maker">
    <div v-show="duration>0" class="vue-slider-gif-maker-video-container">
      <video v-if="href!==null&&timmer" name="media" ref="video-masker" class="gif-maker-video-masker" >
        <source :src="href"/>
      </video>
      <video v-if="href!==null&&timmer" name="media" class="gif-maker-rel-video" ref="video" crossorigin="anonymous">
        <source :src="href" />
      </video>
    </div>
    <vueSlider v-bind="vueSliderConfig" v-if="makerType === 'click'&&duration>0" @callback="dropEnd" :tooltip-dir="'bottom'" ref="clickSlider" v-model="clickValue" :max="duration" />
    <vueSlider v-bind="vueSliderConfig" v-if="makerType === 'drop'&&duration>0" @callback="dropEnd" :tooltip-dir="'bottom'"  ref="dropSlider" v-model="dropValue" :max="duration" />

    <div class="gif-maker-gif-preview">
      <div ref="pic-view" class="pic-view"></div>
      <div ref="gif-view" class="gif-view"></div>
    </div>
  </div>
</template>

<script>
require('./components/image-util.js');
const vueSlider = require('vue-slider-component');

export default {
  name: 'vue-slider-gif-maker',
  components: {
    vueSlider
  },
  props:['maker-type','href','vueSliderConfig'],
  data(){
    return {
      ImageUtils:window.ImageUtils,
      test:false,
      duration:0,
      currentTime:0,
      tempTimeArray:[0, 0],
      clickTimer: 0,
      dropTimer:[0,0],
      timmer:1,
    }
  },
  computed:{
    clickValue: {
      get() {
        return this.clickTimer;
      },
      set(param) {
        this.clickTimer = param;
      }
    },
    dropValue: {
      get() {
        return this.dropTimer;
      },
      set(param) {
        this.dropTimer = param;
      }
    }
  },
  watch:{
    href(){
      this.timmer = 0;
      window.setTimeout(() => {
          this.timmer = 1;
      },10);
      window.setTimeout(() => {
        this.duration = this.$refs.video ? this.$refs.video.duration || 0 : 0;
      },2000);
    }
  },
  methods:{
    dropEnd(e){
      if (typeof e === 'number') {
        this.currentTime = e;
        return this.setVideoCurrentTime();
      }else{
        for(const i in e){
            if(this.tempTimeArray.indexOf(e[i])<0) {
              this.currentTime = e[i];
              this.tempTimeArray = e;
              break;
            }
        }
      }
      return this.setVideoCurrentTime();
    },
    setVideoCurrentTime(){
      this.$refs['video-masker'].currentTime = this.currentTime;
      this.$refs.video.currentTime = this.currentTime;
    },
    screenShot(){
      const video = this.$refs.video;
      const blob = this.ImageUtils.screenshot(video);
      const img = this.ImageUtils.createImage(blob);
      return {img,blob};
    },
    mergeGif(config){
      const self = this;
      const images = this.ImageUtils.getImages();
      return new Promise(resolve => {
        this.ImageUtils.createGif(images, config, function(blob) {
          const gif = self.ImageUtils.createImage(blob);
          self.ImageUtils.removeImages();
          resolve({gif,blob});
        });
      });
    },
    autoMergeGif(config) {
      const self = this;
      const confFrame = config.frame || 10;
      const frame =(this.tempTimeArray[1] - this.tempTimeArray[0]) > confFrame ? confFrame : (this.tempTimeArray[1] - this.tempTimeArray[0]);
      const start = this.tempTimeArray[0];
      let i = 0;
      const imgMap = [];
      const video = this.$refs.video;
      const maskVideo = this.$refs['video-masker'];
      const loop = (this.tempTimeArray[1] - this.tempTimeArray[0]) > frame ? Number.parseInt((this.tempTimeArray[1] - this.tempTimeArray[0])/frame) : 1;
      return new Promise(resolve => {
        doAutoMerge();
        function doAutoMerge(){
          i++;
          if(i > frame){
            self.mergeGif(config).then((e)=>{
                resolve({blog:e.blob,gif:e.gif,imgMap});
            });
            return;
          }
          maskVideo.currentTime = i*loop+start;
          video.currentTime = i*loop+start;
          new Promise(res=>{
            window.setTimeout(()=>{
              const blob = self.ImageUtils.screenshot(video);
              const img = self.ImageUtils.createImage(blob);
              imgMap.push(img)
              res();
            },1500);
          }).then(()=>{
            doAutoMerge();
          });
        }
      });
    }
  },
  mounted(){
    window.setTimeout(() => {
      this.duration = this.$refs.video ? this.$refs.video.duration || 0 : 0;
    },1000);
  }
}
</script>

<style>
    .vue-slider-gif-maker .gif-maker-video-masker{
      height: 100%;
      width: 100%;
      opacity: 1;
    }
    .vue-slider-gif-maker .gif-maker-rel-video{
      z-index: -1;
      left: 0;
      position: absolute;
      opacity: 0;
    }
    .vue-slider-gif-maker .gif-maker-pic-view img{
        height: 100%;
        width: 100%;
    }
</style>