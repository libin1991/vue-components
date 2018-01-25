<template>
  <div class="">
  </div>
</template>

<script>
  export default {
    data () {
      return {};
    },
    created () {
      this.promise();
    },
    methods: {
      promise () {
        this.doSomething().then(() => {
          return this.doSomethingElse();
        }).then(this.finalHandler);
      },
      doSomething () {
        return new Promise((resolve, reject) => {
          resolve('first');
        });
      },
      doSomethingElse () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.info('ssss');
            resolve('tt');
          }, 1500);
        });
      },
      finalHandler (ss) {
        console.info(ss);
        setTimeout(() => {
          console.info('aaaa');
        }, 1000);
      }
    }
  };
</script>

<style lang="less">

</style>
