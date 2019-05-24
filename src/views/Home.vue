<template>
  <div class="home">
    <PhotoStage @fontColorChange="fontColorChange" :photosData="photosData" :photoIndex="timeLineIndex" @imgChange="stageChange"/>
    <TimeLine class="timeline" :fontColor="fontColor" :photosData="photosData" :stageIndex="stageIndex" @change="timeLineChange"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PhotoStage from '@/components/PhotoStage.vue'
import TimeLine from '@/components/TimeLine.vue'
import photosData from './../../public/photos.json'

export default {
  name: 'home',
  data() {
    return {
      photosData: photosData,
      fontColor: {},
      timeLineIndex: 0,
      stageIndex: 0
    }
  },
  components: {
    PhotoStage,
    TimeLine
  },
  methods: {
    fontColorChange(fontColor) {
      this.fontColor = fontColor
    },
    timeLineChange(index) {
      this.timeLineIndex = index
    },
    stageChange(index) {
      this.stageIndex = index
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
