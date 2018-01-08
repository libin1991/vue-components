<template>
  <div class="mobile-ppt">
    <PPT :imgsInfo="imgsInfo"> </PPT>
  </div>
</template>

<script>
  import PPT from '../../../components/ppt';
  export default {
    data () {
      return {
        imgsInfo: [
          {
            src: require('./img/1.jpg'),
            href: 'www.baidu.com'
          },
          {
            src: require('./img/2.jpg'),
            href: 'www.baidu.com'
          },
          {
            src: require('./img/3.jpg'),
            href: 'www.baidu.com'
          },
          {
            src: require('./img/4.jpg'),
            href: 'www.baidu.com'
          },
          {
            src: require('./img/5.jpg'),
            href: 'www.baidu.com'
          }
        ]
      };
    },
    components: {
      PPT
    }
  };
</script>

<style lang="less">
.mobile-ppt{
  width:100%;
  height:100px;
}
</style>
