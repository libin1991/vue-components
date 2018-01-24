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
          this.doSomethingElse();
        }).then(this.finalHandler);
      },
      doSomething () {
        return new Promise((resolve, reject) => {
          resolve();
        });
      },
      doSomethingElse () {
        for (let i = 0; i < 20; i++) {
          console.info(i);
        }
      },
      finalHandler () {
        for (let i = 10; i < 20; i++) {
          console.info('ss');
        }
      }
    }
  };
</script>

<style lang="less">

</style>
