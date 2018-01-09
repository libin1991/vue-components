<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.resetRem();
      window.addEventListener('orientationchange', this.resetRem);
      window.addEventListener('resize', this.resetRem);
    },
    methods: {
      resetRem () {
        const htmlElm = document.querySelector('html');
        const htmlwidth = htmlElm.getBoundingClientRect().width;
        /* window.screen.width,会有500ms的延迟，横竖屏切换的时候可能有问题 */
        htmlElm.style.fontSize = htmlwidth / 16 + 'px';
      }
    }
};
</script>

<style lang="less">
  @import "./less/reset.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  #mobile-notes{
    a{
      display: block;
    }
  }
}
</style>
