<template>
  <div class="mobile-relative">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less">
  .mobile-relative{
    height:100%;
  }
/*.mobile-relative{
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
      border-bottom:1px solid #ccc;
      padding:10px 0;
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
}*/
</style>
