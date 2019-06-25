<template>
  <div class="photoStage" ref="photoStage">
    <div class="photo_title" ref="photoTitle" :style="fontColor">
      <div class="time">
        <span class="date" v-if="photoArray">{{ dayjs(photoArray[stageIndex].timestamp).format('YYYY/MM/DD') }}</span>
        <span class="day" v-if="photoArray">{{ '周' + dayArr[dayjs(photoArray[stageIndex].timestamp).day()] }}</span>
        <span class="time" v-if="photoArray">{{ photoTime }}</span>
      </div>
      <div class="control">
        <span>
          <i class="fa fa-info-circle" aria-hidden="true" @click="toggleshowmore" v-if="!isMobile"></i>
        </span>
        <span>
          <i class="fa fa-repeat" aria-hidden="true" @click="rotateImg"></i>
        </span>
        <span>
          <i class="fa fa-download" aria-hidden="true" @click="download"></i>
        </span>
        <span>
          {{ (stageIndex + 1) + '/' + photoArray.length }}
        </span>
      </div>
    </div>
    <div class="carousel">
      <Carousel
      ref="carousel"
      :photos="photoArray"
      :height="photoHeight"
      :width="photoHeight * 3 / 2"/>
    </div>
  </div>
</template>

<script>
import Carousel from './Carousel'
import dayjs from 'dayjs'
import { mapGetters, mapMutations } from "vuex";

export default {
  name: 'photoStage',
  props: {
    photosData: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      photoHeight: 0,
      dayjs: dayjs,
      dayArr: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  mounted() {
    this.photoHeight = this.getPhotoHeight()
  },
  computed: {
    ...mapGetters(['fontColor', 'dominantColor', 'stageIndex', 'showmore', 'isMobile']),
    photoArray() {
      let arr = []
      for (let year in this.photosData) {
        for (let month in this.photosData[year]) {
          for (let date in this.photosData[year][month]) {
            arr = arr.concat(...this.photosData[year][month][date])
          }
        }
      }
      arr.forEach(item => {
        item.data = require('./../../public/photos/' + item.File)
      })
      return arr
    },
    photoTime() {
      let time = new Date(this.photoArray[this.stageIndex].timestamp)
      return time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0')
    }
  },
  methods: {
    ...mapMutations(['setShowmore']),
    toggleshowmore () {
      this.setShowmore(!this.showmore)
    },
    download() {
      let img = this.photoArray[this.stageIndex]
      console.log(this.photoArray[this.stageIndex])
      const saveLink = document.createElement('a')
      document.body.appendChild(saveLink)

      saveLink.href = img.data
      saveLink.download = img.File
      saveLink.click()
      document.body.removeChild(saveLink)
    },
    getPhotoHeight() {
      if (!this.isMobile) {
        return this.$refs.photoStage.clientHeight - this.$refs.photoTitle.clientHeight
      } else {
        return this.$refs.photoStage.clientWidth * 2 / 3
      }
    },
    rotateImg() {
      this.$refs.carousel.rotateImg()
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
    margin-bottom: 6px;

    div.photo_title{
      user-select: none;
      display: flex;
      justify-content: space-between;
      padding: 13px 1.25rem 7px;
      background: rgba(0, 0, 0, 0.15);
      border-radius: 0 0 10px 10px;
      position: relative;
      top: -3px;
      div.time {
        text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);
        padding-top: 2px;
        span.day {
          padding-left: 0.625rem;
          font-size: 1.5rem;
        }
        span.date {
          font-size: 1.5rem;
        }
        span.time {
          padding-left: 1rem;
          font-size: 1rem;
        }
      }
      div.control {
        text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);
        span {
          font-size: 17px;
          line-height: 2;
          cursor: pointer;
          i {
            padding: 0 8px;
          }
        }
      }
    }
    div.carousel {
      height: calc(100% - 54px);
      display: flex;
      align-items: center;
    }
  }
</style>
