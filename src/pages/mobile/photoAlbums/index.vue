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
        maxScroll: 0,
        wrap: {},
        child: {},
        pics: {},
        li: {},
        footer: {},
        scroll: {},
        isLoad: false
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
      Utils.cssTransform(this.footer, 'scale', 0);
      // 要获取图片是否进入了wrap，看图片的top是否在wrap范围之内
      // minTop 是wrap距离屏幕顶部的距离
      // maxTop 就是整个屏幕的高度
      this.minTop = this.wrap.getBoundingClientRect().top;
      this.maxTop = this.minTop + this.wrap.getBoundingClientRect().height;
      this.create();
      const self = this;
      // 此处要加setTimeout 页面内容未渲染 不然获取不到元素高度！！！！
      setTimeout(() => {
        // 每次滑动最大距离
        this.maxScroll = this.wrap.clientHeight - this.child.offsetHeight;
        this.scroll = new Utils(self.wrap, {
          start () {
            let scrollTop = Utils.cssTransform(self.child, 'translateY');
            // 此处需要重新计算maxScroll
            self.maxScroll = self.wrap.clientHeight - self.child.offsetHeight;
            if (scrollTop <= self.maxScroll) {
              self.isLoad = true;
            }
          },
          in () {
            self.createImg();
            let scrollTop = Utils.cssTransform(self.child, 'translateY');
            if (self.isLoad) {
              // 当滑动超出时，显示footer  使用scale方式显示
              let overHieght = self.maxScroll - scrollTop;
              let footScale = overHieght / self.footer.offsetHeight;
              footScale = footScale > 1 ? 1 : footScale;
              footScale = footScale < 0 ? 0 : footScale;
              console.info(footScale);
              Utils.cssTransform(self.footer, 'scale', footScale);
            }
          },
          end () {
            let scrollTop = Utils.cssTransform(self.child, 'translateY');
            if (self.isLoad && self.maxScroll - scrollTop >= self.footer.offsetHeight) {
              clearInterval(self.child.scroll);
              self.start += self.length;
              self.create();
            }
            self.isLoad = false;
          }
        });
        this.scroll.mscroll();
      }, 10);
    },
    methods: {
      // 创建li
      create () {
        let end = this.start + this.length;
        for (let i = this.start; i < end; i++) {
          let li = document.createElement('li');
          li.src = this.dataUrl[i];
          li.isImg = false;
          this.pics.appendChild(li);
        }
        this.createImg();
      },
      // 在创建的li里面添加img，但是要判断当前li是否在可视区 以及是否已添加过图片
      createImg () {
        for (var i = 0; i < this.li.length; i++) {
          let top = this.li[i].getBoundingClientRect().top; // 获取到元素在屏幕中的绝对坐标( getBoundingClientRect() 获取元素相对于屏幕左上角的绝对位置)
          // top值需要在这两个高度之间，说明图片进入了wrap里面
          if (!this.li[i].isImg && top >= this.minTop && top < this.maxTop) {
            this.li[i].isImg = true;
            this.showImg(this.li[i]);
          }
        }
      },
      showImg (li) {
        var img = new Image();
        img.src = li.src;
        // 在canvas中添加图片，那这张图必须已经加载完毕
        img.onload = () => {
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          li.appendChild(canvas);
          // transition 在使用的时候，元素没有渲染完的时候，transition是没有效果;
          setTimeout(() => {
            canvas.style.opacity = 1;
          }, 100);
        };
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
.photo-albums{
  height:100%;
  header {
    height: 2rem;
    background: #000;
    font: .8rem/2rem "宋体";
    color: #fff;
    text-align: center;
  }
  #wrap {
    position: absolute;
    top:2rem;
    left:0;
    bottom:0;
    width: 100%;
    overflow: hidden;
    #scroll {
      position: relative;
      .pics {
        overflow: hidden;
        margin: 0;
        padding: 0;
        list-style: none;
        li{
          float: left;
          width: 7rem;
          margin: .5rem;
          min-height: 7rem;
          border-radius: 5px;
          background: url('./img/loadingImg.gif') no-repeat #ccc center center;
          canvas {
            display: block;
            width: 7rem;
            border-radius: 5px;
            opacity: 0;
            transition: 1s opacity;
          }
        }
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
    }
  }
}

</style>
