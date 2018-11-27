<template>
  <div id="app">
    <SliderGIF ref="slider-gif" :vue-slider-config="{height:10}" :href="'https://image.9game.cn/s/uae/g/3b/aligames/act/movie.webm'" :maker-type="'drop'" />
    <div class="slider-button" @click="autoGif">自动生成gif</div>
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
        this.$refs.gif.appendChild(e.gif)
      })
    }
  }
}
</script>

<style>
  body{
    margin: 0;
  }
  #app{
    height: 400px;
    width: 500px;
    padding: 20px;
  }
  .gif{
    height: 100%;
    width: 100%;
  }
  .gif img{
    width: 100%;
  }
  .slider-button{
    background: cornflowerblue;
    line-height: 40px;
    color: aliceblue;
    border-radius: 20px;
    text-align: center;
    margin: 20px auto 50px;
    height: 40px;
    width: 200px;
  }
</style>
