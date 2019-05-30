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
import { mapGetters, mapMutations } from "vuex";

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
    this.$route.query.id && this.setStageIndex(Number(this.$route.query.id))
  },
  methods: {
    ...mapMutations(['setStageIndex'])
  }
}
</script>
<style lang="scss" scoped>
</style>
