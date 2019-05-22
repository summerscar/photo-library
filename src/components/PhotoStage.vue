<template>
  <div class="photoStage" ref="photoStage">
    <div class="photo_title" ref="photoTitle" :style="fontColor">
      <div class="time">
        <span class="date" v-if="photoArray">{{ dayjs(photoArray[photoIndex].timestamp).format('YYYY/MM/DD') }}</span>
        <span class="day" v-if="photoArray">{{ '周' + dayArr[dayjs(photoArray[photoIndex].timestamp).day()] }}</span>
        <span class="time" v-if="photoArray">{{ dayjs(photoArray[photoIndex].timestamp).format('hh : mm') }}</span>
      </div>
      <div class="control">
        <span>
          <i class="fa fa-download" aria-hidden="true"></i>
        </span>
        <span>
          <i class="fa fa-repeat" aria-hidden="true"></i>
        </span>
        <span>
          {{ (photoIndex + 1) + '/' + photoArray.length }}
        </span>
      </div>
    </div>
    <Carousel :photos="photoArray" :height="photoHeight" :width="photoHeight * 3 / 2" @change="imgChang" @colorChange="colorChange" @fontColorChange="fontColorChange" />
  </div>
</template>

<script>
import Carousel from './Carousel'
import photosData from './../../public/photos.json'
import dayjs from 'dayjs'

export default {
  name: 'photoStage',
  props: {
    msg: String
  },
  data() {
    return {
      photosData: photosData,
      photoHeight: 0,
      photoIndex: 0,
      dayjs: dayjs,
      dayArr: ['一', '二', '三', '四', '五', '六', '日'],
      fontColor: {},
      dominantColor: ''
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
    fontColorChange(value) {
      this.fontColor = value
      this.$emit('fontColorChange', value)
    },
    colorChange(color) {
      document.getElementById('app').style.backgroundColor = color
      this.dominantColor = color
    },
    imgChang(index) {
      this.photoIndex = index
      console.log('当前图片', index) // eslint-disable-line
    },
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
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      background: rgba(0, 0, 0, 0.15);
      div.time {
        span.day {
          padding-left: 10px;
          font-size: 24px;
        }
        span.date {
          font-size: 26px;
        }
        span.time {
          padding-left: 15px;
          font-size: 17px;
        }
      }
      div.control {
        span {
          padding: 0 8px;
          font-size: 17px;
          line-height: 2;
          cursor: pointer;
        }
      }
    }
  }
</style>
