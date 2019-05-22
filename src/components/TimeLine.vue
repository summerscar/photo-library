<template>
  <div class="timeline">
    <div class="bars" :style="fontColor">
      <div class="timebar">5/20</div>
      <div class="bar bar1"></div>
      <div class="bar bar2"></div>
      <div class="bar bar3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeline',
  props: {
    msg: String,
    fontColor: {
      default: () => {},
      type: Object
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
div.timeline {
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 250px;
    border-radius: 20px 20px 0 0;
    box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.5);
    padding: 0px 5px 10px;
    div.bars {
      width: 100%;
      height: 100%;
      overflow-x: auto;
      align-content:space-around;
      div.timebar {
        text-align: left;
        font-size: 12px;
        color: antiquewhite;
        margin-bottom: 7px;
        padding: 0 5px;
      }
      div.bar {
        border-radius: 5px;
        width: 120%;
        height: 25%;
        background: rgba(0, 0, 0, 0.2);
        &.bar2 {
          margin: 15px 0;
        }
      }
    }
}
</style>
