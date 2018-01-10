<template>
  <div class="mobile-music-wrap">
    <header id="header">
      <div class="header-banner">
        <h1 class="logo">
          <img src="./img/logo.png" />
        </h1>
        <a href="javascript:;" id="menuBtn" :class="{menuBtnShow: isMenuBtnShow}"></a>
        <nav id="btns">
          <a href="#" class="searchBtn">搜索</a>
          <a href="#">登陆</a>
        </nav>
      </div>
      <form class="search">
        <input type="search" class="search" placeholder="请输入搜索内容">
        <input type="submit" value="搜索">
      </form>
    </header>
    <div class="content">
      <nav id="navScroll" ref="navScroll">
        <ul id="navs" ref="navUl">
          <li v-for="(item,index) in navs" :class="{active: index===navNow}" @click="navNow=index">
            <a href="javascript:void(0);">{{item}}</a>
          </li>
        </ul>
      </nav>
      <div id="pic-tab">
        <Slide :imgsInfo="imgsInfo"></Slide>
      </div>
    </div>
  </div>
</template>

<script>
  import Slide from '../../../components/ppt';
  import Event from '../../../util';
  export default {
    data () {
      return {
        isMenuBtnShow: false,
        navs: ['首页', 'MV', '悦单', 'V榜', '众筹', '饭团', '节目', '音悦stage', 'APP下载', '资讯', '我的家', '热门应用'],
        imgsInfo: [
          {
            src: require('./img/img1.jpg'),
            href: 'www.baidu.com'
          },
          {
            src: require('./img/img2.jpg'),
            href: 'www.baidu.com'
          },
          {
            src: require('./img/img3.jpg'),
            href: 'www.baidu.com'
          },
          {
            src: require('./img/img4.jpg'),
            href: 'www.baidu.com'
          }
        ],
        navNow: 0
      };
    },
    mounted () {
      return new Promise((resolve, reject) => {
        const navUl = this.$refs.navUl;
        setTimeout(() => {
          const len = navUl.offsetWidth - this.$refs.navScroll.offsetWidth;
          resolve(len);
        }, 30);
      }).then(res => {
        this.navsInit(res);
      });
    },
    methods: {
      navsInit (len) {
        const navUl = this.$refs.navUl;
        let startPoint = 0;
        let startUl = 0;
        Event.cssTransform(navUl, 'translateX', 0);
        navUl.addEventListener('touchstart', e => {
          startPoint = e.changedTouches[0].pageX;
          startUl = Event.cssTransform(navUl, 'translateX');
        });
        navUl.addEventListener('touchmove', e => {
          // 此处要注意，需要减去屏幕宽度
          const maxTranslateX = len + 90;
          let translateX = Event.cssTransform(navUl, 'translateX');
          let nowPoint = e.changedTouches[0].pageX;
          let dis = nowPoint - startPoint;
          translateX = startUl + dis;
          translateX = translateX >= 90 ? 90 : (translateX < -maxTranslateX ? -maxTranslateX : translateX);
          Event.cssTransform(navUl, 'translateX', translateX);
        });
        navUl.addEventListener('touchend', e => {
          let nowTranslateX = Event.cssTransform(navUl, 'translateX');
          if (nowTranslateX > 0) {
            Event.cssTransform(navUl, 'translateX', 1);
          }
          if (nowTranslateX < -len) {
            Event.cssTransform(navUl, 'translateX', -len);
          }
        });
      }
    },
    components: {
      Slide
    }
  };
</script>

<style lang="less">
@import "./style.less";
</style>
