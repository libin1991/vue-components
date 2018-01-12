<template>
  <div class="tab-change">
    <div class="tab-title-wrap" >
      <span v-for="(item,index) in tabTitle"
        :class="{active : index===nextShowTab}"
        @click="tabSwitch(index)"
      >{{item}}</span>
    </div>
    <div class="tab_item_wrap" ref="tabChange">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  // import Event from '../../util';
  export default {
    data () {
      return {
        tabTitle: [],
        tabLength: 0,
        preShowTab: 0, // 当前index
        nextShowTab: 0, // 下一个index
        soltEel: []
      };
    },
    mounted () {
      const solt = this.$slots.default.filter(item => {
        return item.tag;
      });
      this.tabLength = solt.length;
      solt.forEach((item, index) => {
        if (item.tag) {
          // item.elm.style.width = 1 / this.tabLength * 100 + '%';
          this.tabTitle.push(item.data.attrs.name);
          this.soltEel.push(item.elm);
        }
      });
      this.tabSwitch(0, 'first');
      // this.touchSlideaChange();
    },
    methods: {
      tabSwitch (index, type) {
        this.preShowTab = this.nextShowTab;
        this.nextShowTab = index;
        const pages = this.soltEel;
        // 初始化，展示第一个tab
        if (type) {
          pages[0].classList.add('leftShow');
          return;
        }
        let preIndex = this.preShowTab;
        let nextIndex = this.nextShowTab;
        if (preIndex === nextIndex) { return; }
        // 计算前后tab的高度，取高的赋值给父节点的高度( 或者方案二：取最高子节点的高度？ 以后可根据需求来改)
        let preHeigth = this.childrenHeight(pages[preIndex]);
        let nextHeight = this.childrenHeight(pages[nextIndex]);
        this.$refs.tabChange.style.height = (preHeigth > nextHeight ? preHeigth : nextHeight) + 'px';
        if (pages[0].classList.contains('leftShow')) {
          pages[0].classList.remove('leftShow');
        }
        // 清除动画类
        pages.forEach((item, index) => {
          let className = item.className.split(' ');
          className.forEach(names => {
            if (names.indexOf('tab-change-') !== -1) {
              console.info(names);
              item.classList.remove(names);
            }
          });
        });
        if (preIndex > nextIndex) {
          // 后面跳前面 页面往右隐藏
          pages[preIndex].className = 'tab-change-rightHide';
          pages[nextIndex].className = 'tab-change-leftShow';
        } else {
          // 前面跳后面 页面往左隐藏
          console.info(pages[preIndex]);
          console.info(pages[nextIndex]);
          pages[preIndex].className = 'tab-change-leftHide';
          pages[nextIndex].className = 'tab-change-rightShow';
        }
      },
      touchSlideaChange () {
        const wrap = this.$refs.tabChange;
        let startTouch = 0;
        let endTouch = 0;
        let dis = 0;
        let nestIndexPage = 0;
        // const wrapWidth = wrap.offsetWidth;
        wrap.addEventListener('touchstart', e => {
          startTouch = e.changedTouches[0].pageX;
        });
        wrap.addEventListener('touchmove', e => {
          endTouch = e.changedTouches[0].pageX;
          dis = endTouch - startTouch;
          // dis 大于0，则是往后滑动，内容往前显示
          nestIndexPage = dis > 0 ? this.preShowTab - 1 : this.preShowTab + 1;
          if (nestIndexPage < 0) { return; }
          const pages = this.soltEel;
          console.info(nestIndexPage);
          pages[nestIndexPage].style.transform = `translateX(${dis}px)`;
          pages[this.preShowTab].style.transform = `translateX(${dis}px)`;
          pages[nestIndexPage].style.transform = `translateX(${dis}px)`;
        });
      },
      childrenHeight (ele) {
        let children = ele.children;
        let height = 0;
        for (let i = 0, len = children.length; i < len; i++) {
          if (children[i].nodeType === 1) {
            height += children[i].offsetHeight;
          }
        }
        return height;
      }
    }
  };
</script>

<style lang="less">
@import "./style.less";
</style>
