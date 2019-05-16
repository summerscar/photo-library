<template>
  <div class="photoStage">
    <div class="photo_title">
      <div class="time">
        <span class="date">2019年5月6日</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'photoStage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  div.photoStage {
    width: 100%;
    height: calc(100vh - 250px);

    div.photo_title{
      text-align: left;
      padding: 10px 20px;
      background: rgba(0, 0, 0, 0.1);
      div.time {
        span.date {
          font-size: 26px;
        }
      }
    }
  }
</style>
