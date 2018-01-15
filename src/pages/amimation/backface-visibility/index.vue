<template>
  <div class="backface-visibility">
    <div id="div">
      <div class="rotate-box">
        <span>1</span>
      </div>
      <div class="rotate-box">
        <span>2</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less">
.backface-visibility{
  width: 400px;
  height: 200px;
  padding: 100px;
  border:5px solid #000;
  margin:100px auto;
  perspective: 800px;
  perspective-origin: center center;
  #div{
    position: relative;
    width: 400px;
    height: 200px;
    transform-style: preserve-3d;
    transition: 5s;
    &:hover{
        transform: rotateY(-180deg);
    }
    .rotate-box{
      position: absolute;
      left: 0;
      top:0;
      width:400px;
      height:200px;
      font-size: 50px;
      line-height: 200px;
      text-align: center;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      span{
        display: block;
        transform: translateZ(100px);
      }
      &:nth-of-type(1){
        background-color: #ccc;
      }
      &:nth-of-type(2){
        background-color: #00ff66;
        transform: rotateY(180deg);
        span{
          background: red;
          transform: translateZ(100px);
        }
      }
    }
  }
}
</style>
