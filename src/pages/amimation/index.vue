<template>
  <div class="mobile-relative">
    <div class="left">
      <router-link :to="{name:'plusMinusAnim'}" tag="a">正负旋转相消动画</router-link>
      <router-link :to="{name:'cube'}" tag="a">立方体</router-link>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less">
  .mobile-relative{
    .left{
      position: absolute;
      width:20%;
      left: 0;
      top: 0;
      bottom: 0;
      border-right:1px solid #000;
      box-sizing: border-box;
      a{
        display: block;
        width:100%;
        font-size: 16px;
        padding:10px 0;
        border-bottom: 1px solid #ccc;
      }
    }
    .right{
      position: absolute;
      left:20%;
      top:0;
      right: 0;
      bottom:0;
      overflow: hidden;
    }
  }
</style>
