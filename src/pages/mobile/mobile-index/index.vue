<template>
  <div class="mobile-index">
    <router-link :to="{name:'mobileSlip'}" tag="a">移动端滑动</router-link>
    <router-link :to="{name:'mobilePPT'}" tag="a">幻灯片</router-link>
    <router-link :to="{name:'mobileMusic'}" tag="a">音悦台页面</router-link>
    <router-link :to="{name:'transform3D'}" tag="a">3D</router-link>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less">
.mobile-index{
  position: relative;
  left:0;
  bottom:0;
  a{
    display: block;
  }
}
</style>
