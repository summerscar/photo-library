<template>
  <div class="home">
    <PhotoStage :photosData="photosData"/>
    <TimeLine class="timeline" :photosData="photosData"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PhotoStage from '@/components/PhotoStage.vue'
import TimeLine from '@/components/TimeLine.vue'
import photosData from './../../public/photos.json'
import { mapGetters } from "vuex";

export default {
  name: 'home',
  data() {
    return {
      photosData: photosData
    }
  },
  computed: {
    ...mapGetters(['fontColor', 'dominantColor', 'timeLineIndex', 'stageIndex'])
  },
  watch: {
    dominantColor: function (value) {
      document.getElementById('app').style.backgroundColor = value
    }
  },
  components: {
    PhotoStage,
    TimeLine
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
</style>
