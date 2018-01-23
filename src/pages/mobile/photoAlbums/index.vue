<template>
  <div class="photo-albums">
    <header>相册</header>
    <section id="wrap" ref="wrap">
      <div id="scroll" ref="scroll">
        <ul class="pics">
          <!--<li></li>
          <li></li>-->
        </ul>
        <footer>上滑加载更多内容</footer>
      </div>
    </section>
  </div>
</template>

<script>
  import Utils from '../../../util';
  export default {
    data () {
      return {
        dataUrl: [],
        length: 12,
        start: 0,
        minTop: 0,
        maxTop: 0,
        wrap: {},
        child: {},
        pics: {},
        li: {},
        footer: {}
      };
    },
    created () {
      for (var i = 0; i < 100; i++) {
        this.dataUrl.push(require(`./img/${i % 16 + 1}.jpg`));
      }
    },
    mounted () {
      this.wrap = this.$refs.wrap;
      this.child = this.$refs.scroll;
      this.pics = document.querySelector('.pics');
      this.li = this.pics.getElementsByTagName('li');
      this.footer = document.querySelector('footer');
      // 要获取图片是否进入了wrap，看图片的top是否在wrap范围之内
      // minTop 是wrap距离屏幕顶部的距离
      // maxTop 就是整个屏幕的高度
      this.minTop = this.wrap.getBoundingClientRect().top;
      this.maxTop = this.minTop + this.wrap.getBoundingClientRect().height;
      Utils.cssTransform(this.footer, 'scale', 0);
      this.create();
    },
    methods: {
      create () {
        let end = this.start + this.length;
        for (let i = this.start; i < end; i++) {
          let li = document.createElement('li');
          li.src = this.dataUrl[i];
          this.pics.appendChild(li);
        }
        this.createImg();
      },
      createImg () {
        for (var i = 0; i < this.li.length; i++) {
          let top = this.li[i].getBoundingClientRect().top; // 获取到元素在屏幕中的绝对坐标( getBoundingClientRect() 获取元素相对于屏幕左上角的绝对位置)
          // top值需要在这两个高度之间，说明图片进入了wrap里面
          if (top >= this.minTop && top < this.maxTop) {
            this.showImg(this.li[i]);
          }
        }
      },
      showImg (li) {
        var img = new Image();
        img.src = li.src;
        li.appendChild(img);
      }
    }
  };
</script>

<style lang="less">
@import "../../../less/reset.css";
body {
  margin: 0;
}
html,
body {
  height: 100%;
  overflow: hidden;
}
header {
  height: 2rem;
  background: #000;
  font: .8rem/2rem "宋体";
  color: #fff;
  text-align: center;
}
#wrap {
  position: absolute;
  top: 2rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
}
#scroll {
  position: relative;
}
.pics {
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style: none;
}
.pics li{
  float: left;
  width: 7rem;
  margin: .5rem;
  min-height: 7rem;
  border-radius: 5px;
  background: url('./img/loadingImg.gif') no-repeat #ccc center center;
}
.pics img {
  display: block;
  width: 7rem;
  border-radius: 5px;
}
footer {
  position: absolute;
  bottom: -80px;
  left: 0;
  width: 100%;
  height: 80px;
  font: .7rem/80px "宋体";
  text-align:  center;
}
</style>
