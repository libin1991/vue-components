<template>
  <div class="mobile-slip" ref="wrap">
    <div id="scroll" ref="scroll"></div>
    <div id="scrollBar" ref="scrollBar"></div>
  </div>
</template>

<script>
  import Utils from '../../../util';
  export default {
    data () {
      return {};
    },
    mounted () {
      document.addEventListener(
        'touchstart', (e) => {
          e.preventDefault();
        }, { passive: false });
      const wrap = this.$refs.wrap;
      const scroll = this.$refs.scroll;
      const scrollBar = this.$refs.scrollBar;
      this.setInner(scroll);
      setTimeout(() => {
        // console.info(wrap.clientHeight, scroll.offsetHeight);
        const scale = wrap.clientHeight / scroll.offsetHeight;
        scrollBar.style.height = wrap.clientHeight * scale + 'px';
        const scrollEve = new Utils(wrap, {
          start () {
            scrollBar.style.opacity = 1;
          },
          in () {
            let top = -Utils.cssTransform(scroll, 'translateY') * scale;
            Utils.cssTransform(scrollBar, 'translateY', top);
          },
          over () {
            scrollBar.style.opacity = 0;
          }
        });
        scrollEve.mscroll();
      }, 10);
    },
    methods: {
      setInner (scroll) {
        let inner = '';
        for (let i = 0; i < 300; i++) {
          inner += '移动端滑屏' + i + '<br/>';
        }
        scroll.innerHTML = inner;
      },
      slip () {
        /* 1 手指按下去的时候，记录下手指坐标
        2.移动的时候，记录手指坐标
        3.用移动后的坐标 - 移动前的坐标 = 手指 移动的距离
        4.手指按下去的时候，记录下元素的位置
        5.移动之后，用手指移动的距离 + 元素的初始位置 =  元素现在所要在的位置 */
        const wrap = document.querySelector('#wrap');
        const scroll = document.querySelector('#scroll');
        let startPoint = 0;
        let startElem = 0;
        let maxTop = wrap.clientHeight - scroll.offsetHeight;
        wrap.addEventListener('touchstart', e => {
          let touch = e.changedTouches[0];
          startPoint = touch.pageY;
          startElem = scroll.offsetTop;
        });
        wrap.addEventListener('touchmove', e => {
          let touch = e.changedTouches[0];
          let dis = touch.pageY - startPoint;
          let top = startElem + dis;
          if (top > 0) {
            top = 0;
          }
          if (top < maxTop) {
            top = maxTop;
          }
          scroll.style.top = top + 'px';
        });
      }
    }
  };
</script>

<style lang="less">
  body {
    margin: 0;
  }
  body,
  html {
    height: 100%;
    overflow: hidden;
  }
  .mobile-slip{
    width:100%;
    overflow: hidden;
    height:100%;
    position: relative;
    overflow: hidden;
    #scrollBar{
      position: absolute;
      right: 0;
      top:0;
      width:4px;
      height:100%;
      background: rgba(0,0,0,.5);
      opacity:0;
      transition:opacity .5s  linear;
    }
    /*height:100%;
    position: relative;
    overflow: hidden;*/
  }
</style>
