<template>
  <div class="mvvm">
    <div id="box">
      <div id="div">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </div>
    </div>
  </div>
</template>

<script>
import { observe } from './js/observe';
export default {
  created () {
    this._observe();
  },
  methods: {
    _observe () {
      const data = { key: 'sss' };
      observe(data);
      data.key = 'ttt';
    }
  }
};
</script>

<style lang="less">
  
</style>
