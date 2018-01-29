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
  import Event from '../../util';

  export default {
    data () {
      return {
        tabTitle: [],
        tabLength: 0,
        preShowTab: 0, // 当前index
        nextShowTab: 0, // 下一个index
        soltEel: [],
        itemWidth: 0
      };
    },
    mounted () {
      const solt = this.$slots.default.filter(item => {
        return item.tag;
      });
      this.tabLength = solt.length;
      this.$refs.tabChange.style.width = this.tabLength * 100 + '%';
      this.itemWidth = 1 / this.tabLength * 100;
      solt.forEach((item, index) => {
        if (item.tag) {
          item.elm.style.width = this.itemWidth + '%';
          this.tabTitle.push(item.data.attrs.name);
          this.soltEel.push(item.elm);
        }
      });
      Event.cssTransform(this.$refs.tabChange, 'translateX', 0.01);
      // this.tabSwitch(0, 'first');
      // this.touchSlideaChange();
    },
    methods: {
      tabSwitch (index) {
        this.preShowTab = this.nextShowTab;
        this.nextShowTab = index;
        let preIndex = this.preShowTab;
        let nextIndex = this.nextShowTab;
        if (preIndex === nextIndex) { return; }
        let itemTransformX = -this.itemWidth * index;
        itemTransformX = itemTransformX === 0 ? 0.01 : -this.itemWidth * index;
        console.info(itemTransformX);
        Event.cssTransform(this.$refs.tabChange, 'translateX', itemTransformX, 'percent');
      },
      touchSlideaChange () {
        const wrap = this.$refs.tabChange;
        let startTouch = 0;
        let endTouch = 0;
        let dis = 0;
        let nextIndexPage = 0;
        const pages = this.soltEel;
        const wrapWidth = wrap.offsetWidth / 3;
        let flag = true;
        wrap.addEventListener('touchstart', e => {
          startTouch = e.changedTouches[0].pageX;
          flag = true;
        });
        wrap.addEventListener('touchmove', e => {
          endTouch = e.changedTouches[0].pageX;
          dis = endTouch - startTouch;
          // dis 大于0，手指往左滑动
          nextIndexPage = dis > 0 ? this.preShowTab - 1 : this.preShowTab + 1;
          if (nextIndexPage < 0 || nextIndexPage > pages.length) { return; }
          this.removeAnimClass(pages);
          // 设置父节点高度
          this.wrapHeight(pages, this.preShowTab, nextIndexPage);
          if (flag) {
            if (dis < 0) {
              Event.cssTransform(pages[nextIndexPage], 'translateX', wrapWidth);
            }
          }
          let translatePercent = wrapWidth + dis;
          Event.cssTransform(pages[this.preShowTab], 'translateX', dis);
          Event.cssTransform(pages[nextIndexPage], 'translateX', translatePercent);
          flag = false;
        });
        wrap.addEventListener('touchend', e => {
          if (nextIndexPage < 0 || nextIndexPage > pages.length) { return; }
          let isMoveHalf = Math.abs(dis / wrapWidth) > 0.5 ? 1 : 0;
          pages[this.preShowTab].style.transition = '0.5s';
          pages[nextIndexPage].style.transition = '0.5s';
          console.info(pages[nextIndexPage]);
          if (isMoveHalf) {
            // 如果滑动超过一半 则翻页
            Event.cssTransform(pages[nextIndexPage], 'translateX', 1);
            Event.cssTransform(pages[this.preShowTab], 'translateX', -wrapWidth);
            this.preShowTab = nextIndexPage;
          } else {
            // 如果滑动未超过一半 返回原状
            Event.cssTransform(pages[nextIndexPage], 'translateX', wrapWidth);
            Event.cssTransform(pages[this.preShowTab], 'translateX', 1);
          }
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
      },
      wrapHeight (pages, preIndex, nextIndex) {
        // 计算前后tab的高度，取高的赋值给父节点的高度( 或者方案二：取最高子节点的高度？ 以后可根据需求来改)
        let preHeigth = this.childrenHeight(pages[preIndex]);
        let nextHeight = this.childrenHeight(pages[nextIndex]);
        this.$refs.tabChange.style.height = (preHeigth > nextHeight ? preHeigth : nextHeight) + 'px';
      },
      removeAnimClass (pages) {
        pages.forEach((item, index) => {
          let className = item.className.split(' ');
          className.forEach(names => {
            if (names.indexOf('tab-change-') !== -1) {
              item.classList.remove(names);
            }
          });
        });
      }
    }
  };
</script>

<style lang="less">
@import "./style.less";
</style>
