<template>
  <div class="pptComp" ref="pptComp" >
    <ul class="ppt-pages" :style="ulWidth" ref="ulWrap">
      <li v-for="(item,index) in imgsInfo" :style="liWidth" ref="liWrap">
        <img :src="item.src" @click="goto(item.href)"/>
      </li>
    </ul>
  <div class="nav-point">
    <span v-for="(item,index) in imgsInfo" :class="{active: index===pointNow}"></span>
  </div>
  </div>
</template>

<script>
  import Event from '../../util';
  export default {
    props: {
      imgsInfo: {
        type: Array,
        defalut: []
      }
    },
    data () {
      return {
        wrap: {},
        wrapUl: {},
        startPoint: 0,
        nowIndex: 0,
        startX: 0,
        newPoint: 0,
        nowX: 0,
        pointNow: 0,
        timer: 0
      };
    },
    mounted () {
      this.wrap = this.$refs.pptComp;
      this.wrapUl = this.$refs.ulWrap;
      this.wrapUl.innerHTML += this.wrapUl.innerHTML;
      this.wrap.addEventListener('touchstart', e => {
        e.preventDefault();
      });
      // 设置translateZ，一定要赋值，这样才能启动3D加速
      Event.cssTransform(this.wrapUl, 'translateZ', 0.01);
      Event.cssTransform(this.wrapUl, 'translateX', 0);
      this.slideInit();
      this.autoChange();
    },
    computed: {
      wrapClass () {
        return {'height': this.$refs.ulWrap.offsetHeight};
      },
      ulWidth () {
        return {'width': this.imgsInfo.length * 2 * 100 + '%'};
      },
      liWidth () {
        return {'width': 1 / this.imgsInfo.length * 50 + '%'};
      }
    },
    methods: {
      slideInit () {
        /* 使用transform移动ul，transform无法通过style获取，所以需要封装个函数，设置和获取transform的值
        通过复制两份li。来进行滑动
        滑动第一个图片时，瞬间跳到第部分的第一个li
        滑动第二部分最后一个图片时，跳到第一部分最后一个图片
        某一个图片，滑动未超过一半，幻灯片不切换，是根据transformX/图片宽度
        通过四舍五入获取nowIndex的值，再调用cssTransform()方法来计算的 */

        /* 如果在webkit内核下的浏览器 出现transition的闪烁问题：
          解决办法：
            1. 给运动元素 开启3d加速
            2. 给运动元素本身加上 ：
              -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            3.给运动元素的父级加：
              -webkit-transform-style: preserve-3d;
                transform-style: preserve-3d; */
        const wrapEle = this.wrap;
        const wrapUl = this.wrapUl;
        const liWidth = wrapEle.offsetWidth;
        wrapEle.addEventListener('touchstart', e => {
          wrapUl.style.transition = 'none';
          let translateX = Event.cssTransform(wrapUl, 'translateX');
          this.nowIndex = Math.round(-translateX / liWidth);
          if (this.nowIndex === 0) {
            this.nowIndex = this.imgsInfo.length;
          }
          if (this.nowIndex === this.imgsInfo.length * 2 - 1) {
            this.nowIndex = this.imgsInfo.length - 1;
          }
          Event.cssTransform(wrapUl, 'translateX', -this.nowIndex * liWidth);
          this.startPoint = e.changedTouches[0].pageX;
          this.startX = Event.cssTransform(wrapUl, 'translateX');
        });
        wrapEle.addEventListener('touchmove', e => {
          this.newPoint = e.changedTouches[0].pageX;
          let dis = this.newPoint - this.startPoint;
          Event.cssTransform(wrapUl, 'translateX', this.startX + dis);
        });
        wrapEle.addEventListener('touchend', e => {
          let translateX = Event.cssTransform(wrapUl, 'translateX');
          this.nowIndex = Math.round(-translateX / liWidth);
          this.imgChange();
          this.autoChange();
        });
      },
      imgChange () {
        this.wrapUl.style.transition = '0.5s';
        Event.cssTransform(this.wrapUl, 'translateX', -this.nowIndex * this.wrap.offsetWidth);
        this.pointNow = this.nowIndex % this.imgsInfo.length;
      },
      autoChange () {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          if (this.nowIndex === this.imgsInfo.length * 2 - 1) {
            this.nowIndex = this.imgsInfo.length - 1;
          }
          this.wrapUl.style.transition = 'none';
          Event.cssTransform(this.wrapUl, 'translateX', -this.nowIndex * this.wrap.offsetWidth);
          setTimeout(() => {
            this.nowIndex++;
            this.imgChange();
          }, 30);
        }, 2000);
      },
      goto (url) {
        console.info(url);
      }
    }
  };
</script>

<style lang="less" id="css">
  .pptComp{
    position: relative;
    width:100%;
    height:100%;
    overflow:hidden;
    /*防止transition出现闪屏*/
    transform-style: preserve-3d;
    ul{
      position: relative;
      left:0;
      top:0;
      bottom:0;
      margin:0;
      padding:0;
      /*防止transition出现闪屏*/
      backface-visibility: hidden;
      li{
        display: inline-block;
        float: left;
        height:100%;
        img{
          width:100%;
          height:100%;
          display: block;
        }
      }
    }
    .nav-point{
      position: absolute;
      left:0;
      bottom:3px;
      width:100%;
      text-align: center;
      span{
        display: inline-block;
        width:10px;
        height:10px;
        margin-right:5px;
        border-radius: 5px;
        background-color: #ccc;
        &.active{
          background-color: brown;
        }
      }
    }
  }
</style>
