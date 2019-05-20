<template>
  <div class="home">
    <PhotoStage />
    <TimeLine class="timeline"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PhotoStage from '@/components/PhotoStage.vue'
import TimeLine from '@/components/TimeLine.vue'

export default {
  name: 'home',
  components: {
    PhotoStage,
    TimeLine
  }
}
</script>
<style lang="scss" scoped>
.timeline {
    top: 6px;
    position: relative;
}
</style>
