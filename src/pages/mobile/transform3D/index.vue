<template>
  <div class="transform-3d">
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
  export default {};
</script>

<style lang="less">
  #box {
    width: 100px;
    height: 100px;
    padding: 100px;
    border: 5px solid #000;
    perspective: 200px;
    perspective-origin: center center;
    margin: 100px auto;
  }
  #div {
    position:  relative;
    width: 100px;
    height: 100px;
    transform-style: preserve-3d;
    transform-origin: center center -50px;
    transition: 5s;
  }
  #box:hover #div {
    transform: rotateY(-360deg);
  }
  #div span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100px;
    font: 50px/100px "宋体";
    color: #fff;
    text-align: center;
    transform-origin: center center -50px;
    opacity: .5;
    backface-visibility: hidden;
  }
  #div span:nth-of-type(1) {
    background: #000;
    transform:  rotateY(0deg);
  }
  #div span:nth-of-type(2) {
    background: #6f0;
    transform:  rotateY(90deg);
  }
  #div span:nth-of-type(3) {
    background: #0f6;
    transform:  rotateY(180deg);
  }
  #div span:nth-of-type(4) {
    background: #f06;
    transform:  rotateY(270deg);
  }
</style>
