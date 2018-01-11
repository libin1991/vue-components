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
        preShowTab: 0,
        nextShowTab: 0,
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
    },
    methods: {
      tabSwitch (index, type) {
        this.preShowTab = this.nextShowTab;
        this.nextShowTab = index;
        const pages = this.soltEel;
        if (type) {
          pages[0].className = 'leftShow';
          return;
        }
        let preIndex = this.preShowTab;
        let nextIndex = this.nextShowTab;
        pages.forEach((item, index) => {
          item.className = '';
          if (nextIndex !== index) {
            item.style.height === 0;
          } else {
            item.style.height === 'auto';
          }
        });
        if (preIndex === nextIndex) { return; }
        if (preIndex > nextIndex) {
          // 后面跳前面 页面往右隐藏
          pages[preIndex].className = 'rightHide';
          pages[nextIndex].className = 'leftShow';
        } else {
          // 前面跳后面 页面往左隐藏
          console.info(pages[preIndex]);
          console.info(pages[nextIndex]);
          pages[preIndex].className = 'leftHide';
          pages[nextIndex].className = 'rightShow';
        }
      }
    }
  };
</script>

<style lang="less">
@import "./style.less";
</style>
