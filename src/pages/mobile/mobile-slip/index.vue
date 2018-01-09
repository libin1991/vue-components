<template>
  <div class="mobile-slip">
    <div id="wrap">
      <div id="scroll">
        start<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        移动端滑屏<br/>
        end<br/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {};
    },
    mounted () {
      this.slip();
    },
    methods: {
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
  html {
    height: 100%;
  }
  body {
    margin: 0;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  #wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  #scroll {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #ccc;
  }
</style>
