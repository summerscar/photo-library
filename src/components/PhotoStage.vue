<template>
  <div class="photoStage" ref="photoStage">
    <div class="photo_title" ref="photoTitle">
      <div class="time">
        <span class="date">2019年5月6日</span>
      </div>
    </div>
    <Carousel :photos="photoArray" :height="photoHeight" :width="photoHeight * 4 / 3"/>
  </div>
</template>

<script>
import Carousel from './Carousel'
import photosData from './../../public/photos.json'

export default {
  name: 'photoStage',
  props: {
    msg: String
  },
  data() {
    return {
      photosData: photosData,
      photoHeight: 0
    }
  },
  mounted() {
    this.photoHeight = this.getPhotoHeight()
  },
  computed: {
    photoArray() {
      let arr = []
      for (let year in this.photosData) {
        for (let month in this.photosData[year]) {
          for (let date in this.photosData[year][month]) {
            arr = arr.concat(...this.photosData[year][month][date])
          }
        }
      }
      arr.map(item => {
        item.data = require('./../../public/photos/' + item.File)
      })
      return arr
    }
  },
  methods: {
    getPhotoHeight() {
      return this.$refs.photoStage.clientHeight - this.$refs.photoTitle.clientHeight
    }
  },
  components: {
    Carousel
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
