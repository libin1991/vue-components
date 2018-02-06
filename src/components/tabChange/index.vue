<template>
  <div class="tab-change">
    <div class="tab-title-wrap" ref="wrap">
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
        itemWidth: 0,
        maxTranslateX: 0
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
      this.maxTranslateX = this.$refs.wrap.offsetWidth * (this.tabLength - 1);
      Event.cssTransform(this.$refs.tabChange, 'translateX', 0.01);
      // this.tabSwitch(0, 'first');
      this.touchSlideaChange();
    },
    methods: {
      tabSwitch (index) {
        this.$refs.tabChange.style.transition = 'none';
        this.preShowTab = this.nextShowTab;
        this.nextShowTab = index;
        let preIndex = this.preShowTab;
        let nextIndex = this.nextShowTab;
        if (preIndex === nextIndex) { return; }
        let itemTransformX = -this.$refs.wrap.offsetWidth * index;
        itemTransformX = itemTransformX === 0 ? 0.01 : itemTransformX;
        Event.cssTransform(this.$refs.tabChange, 'translateX', itemTransformX);
      },
      touchSlideaChange () {
        const wrap = this.$refs.tabChange;
        let startTouch = 0;
        let endTouch = 0;
        let dis = 0;
        let currentX = 0;
        wrap.addEventListener('touchstart', e => {
          this.$refs.tabChange.style.transition = 'none';
          startTouch = e.changedTouches[0].pageX;
          currentX = Event.cssTransform(this.$refs.tabChange, 'translateX');
          console.info('sss');
        });
        wrap.addEventListener('touchmove', e => {
          endTouch = e.changedTouches[0].pageX;
          dis = endTouch - startTouch;
          console.info(dis);
          // dis 大于0，手指往左滑动
          let translateX = currentX + dis;
          if (translateX >= 0 || translateX < -this.maxTranslateX) {
            return;
          }
          Event.cssTransform(this.$refs.tabChange, 'translateX', translateX);
        });
        wrap.addEventListener('touchend', e => {
          let curtX = -Event.cssTransform(this.$refs.tabChange, 'translateX');
          const wrapWidth = this.$refs.wrap.offsetWidth;
          let index = Math.round(curtX / wrapWidth);
          this.$refs.tabChange.style.transition = '0.3s';
          let tx = -wrapWidth * index === 0 ? 0.01 : -wrapWidth * index;
          Event.cssTransform(this.$refs.tabChange, 'translateX', tx);
          this.nextShowTab = index;
        });
      }
    }
  };
</script>

<style lang="less">
@import "./style.less";
</style>
