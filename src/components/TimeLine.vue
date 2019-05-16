<template>
  <div class="timeline">
  </div>
</template>

<script>
export default {
  name: 'timeline',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
div.timeline {
    background: #eeeeee;
    width: 100%;
    height: 250px;
}
</style>
