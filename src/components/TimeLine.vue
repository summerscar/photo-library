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
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 250px;
    border-radius: 20px 20px 0 0;
    box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.5);
}
</style>
