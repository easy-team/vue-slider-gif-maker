<template>
  <div id="app">
    <SliderGIF ref="slider-gif" :vue-slider-config="{height:20}" :href="'https://image.9game.cn/s/uae/g/3b/aligames/act/movie.webm'" :maker-type="'drop'" />
    <div @click="autoGif">自动生成gif</div>
    <div ref="gif" class="gif"></div>
  </div>
</template>

<script>
import SliderGIF from '../src/index.vue';
export default {
  name: 'app',
  components: {
    SliderGIF
  },
  data(){
    return {
    }
  },
  mounted(){
  },
  methods:{
    autoGif(){
      this.$refs['slider-gif'].autoMergeGif({delay:200,quality:10,frame:10,}).then((e)=>{
        console.log(e);
        this.$refs.gif.appendChild(e.gif)
      })
    }
  }
}
</script>

<style>
  .gif{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .gif img{
    height: 100%;
    width: 100%;
  }
</style>
