<template>
  <div class="home">
    <PhotoStage @fontColorChange="fontColorChange"/>
    <TimeLine class="timeline" :fontColor="fontColor"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PhotoStage from '@/components/PhotoStage.vue'
import TimeLine from '@/components/TimeLine.vue'

export default {
  name: 'home',
  data() {
    return {
        fontColor: {}
    }
  },
  components: {
    PhotoStage,
    TimeLine
  },
  methods: {
    fontColorChange(fontColor) {
      this.fontColor = fontColor
    }
  }
}
</script>
<style lang="scss" scoped>
.timeline {
    top: 6px;
    position: relative;
}
</style>
