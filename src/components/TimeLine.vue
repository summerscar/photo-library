<template>
  <div class="timeline">
    <div class="bars" ref="bars" :style="fontColor">
      <div class="timebar">
        <span :class="['timestamp', formatInterval(index, index + 1)]" v-for="(item, index) in photoArray" :key="index">{{ time2Date(item[0].timestamp) }}</span>
      </div>
      <div class="bar bar1">
        <div
          :class="['wrapper', formatInterval(dayIndex, dayIndex + 1), {active: dayindex === dayIndex}, {hidden: filterImage(dayPhotos, 1).length === 0}]"
          v-for="(dayPhotos, dayIndex) in photoArray"
          :key="dayIndex"
          @click="timelineClick(dayIndex)">
          <img v-for="(photo, index) in filterImage(dayPhotos, 1)" :key="index" :src="photo.data" :style="{left: (index * 10 + 'px'), zIndex: index}">
        </div>
      </div>
      <div class="bar bar2">
        <div
          :class="['wrapper', formatInterval(dayIndex, dayIndex + 1), {active: dayindex === dayIndex}, {hidden: filterImage(dayPhotos, 2).length === 0}]"
          v-for="(dayPhotos, dayIndex) in photoArray"
          :key="dayIndex"
          @click="timelineClick(dayIndex)">
          <img v-for="(photo, index) in filterImage(dayPhotos, 2)" :key="index" :src="photo.data" :style="{left: (index * 10 + 'px'), zIndex: index}">
        </div>
      </div>
      <div class="bar bar3">
        <div
          :class="['wrapper', formatInterval(dayIndex, dayIndex + 1), {active: dayindex === dayIndex}, {hidden: filterImage(dayPhotos, 3).length === 0}]"
          v-for="(dayPhotos, dayIndex) in photoArray"
          :key="dayIndex"
          @click="timelineClick(dayIndex)">
          <img v-for="(photo, index) in filterImage(dayPhotos, 3)" :key="index" :src="photo.data" :style="{left: (index * 10 + 'px'), zIndex: index}">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
const oneDayms = 60 * 60 *24 * 1000

export default {
  name: 'timeline',
  props: {
    msg: String,
    photosData: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      dayindex: 0 // dayindex 时间轴中的照片组index
    }
  },
  mounted() {
    this.$el.addEventListener('mousewheel', (e) => {
        if (e.deltaY > 0 || e.deltaX > 0) {
          this.$refs.bars.scrollLeft += 100
        } else {
          this.$refs.bars.scrollLeft -= 100
        }
    })
  },
  watch: {
    stageIndex: function(value) {
      value = value + 1
      let arr = this.photoArray.map(item => item.length)
      let index = arr[0] || 0
      let dayIndex = 0
      for (let i = 1; i <= arr.length; i++) {
        if (value > index) {
          index += arr[i]
        } else {
          dayIndex = i - 1
          break
        }
      }
      this.dayindex = dayIndex
    }
  },
  computed: {
    ...mapGetters(['fontColor', 'dominantColor', 'stageIndex', 'timeLineIndex']),
    photoArray() {
      let arr = []
      for (let year in this.photosData) {
        for (let month in this.photosData[year]) {
          for (let date in this.photosData[year][month]) {
            this.photosData[year][month][date].forEach(item => {
              item.data = require('./../../public/photos/' + item.File)
            })
            arr.push(this.photosData[year][month][date])
          }
        }
      }
      return arr
    }
  },
  methods: {
    ...mapMutations([
      'setStageIndex',
      'setTimeLineIndex',
      'setFontColor',
      'setDominantColor'
    ]),
    timelineClick(dayIndex) {
      this.dayindex = dayIndex
      let flattenArr = this.photoArray.slice(0, dayIndex)
      let index = flattenArr.reduce((a, b) => a.concat(...b), []).length
      this.setStageIndex(index)
    },
    time2Date(timeStamp) {
      let time = new Date(timeStamp)
      return `${time.getMonth() + 1}/${time.getDate()}`
    },
    filterImage(photos, imgType) {
      let filteredImg = photos.filter(photo => {
        let hour = new Date(photo.timestamp).getHours()
        let type = 0
        if (hour < 6) {
          type = 3
        } else if (hour < 12) {
          type = 1
        } else if (hour < 19) {
          type = 2
        } else {
          type = 3
        }
        return imgType === type
      })
      return filteredImg
    },
    imgVisibility(photo, imgType) {
      let hour = new Date(photo.timestamp).getHours()
      let type = 0
      if (hour < 6) {
        type = 3
      } else if (hour < 12) {
        type = 1
      } else if (hour < 19) {
        type = 2
      } else {
        type = 3
      }
      return imgType === type
    },
    formatInterval(now, next) {
      let nowTimestamp = this.photoArray[now][0].timestamp
      let nextTimestamp = (this.photoArray[next] && this.photoArray[next][0].timestamp) || ''
      if (!nextTimestamp) {
        return ''
      } else {
        let days = Math.floor((nextTimestamp - nowTimestamp) / oneDayms)
        let interval = Math.ceil(days / 3)
        return 'interval-' + (interval > 4 ? 4 : interval)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hidden {
  visibility: hidden;
}
.interval-1 {
  margin-right: 30px;
}
.interval-2 {
  margin-right: 60px;
}
.interval-3 {
  margin-right: 90px;
}
.interval-4 {
  margin-right: 120px;
}
.interval-5 {
  margin-right: 160px;
}
div.timeline {
    background: rgba(0, 0, 0, 0.15);
    width: 100%;
    height: 250px;
    border-radius: 10px 10px 0 0;
    box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.5);
    padding: 0px 5px 10px;
    div.bars {
      width: 100%;
      height: 100%;
      overflow-x: auto;
      align-content:space-around;
      div.timebar {
        display: inline-flex;
        text-align: left;
        font-size: 12px;
        color: antiquewhite;
        margin-bottom: 7px;
        padding: 0 5px;
        span.timestamp {
          display: inline-block;
          width: 70px;
          text-align: center;
        }
      }
      div.bar {
        display: inline-flex;
        border-radius: 5px;
        min-width: 100%;
        height: 55px;
        background: rgba(255, 255, 255, 0.05);
        text-align: left;
        padding: 0 5px;
        div.wrapper {
          height: 100%;
          display: inline-flex;
          border: 2px solid transparent;
          border-radius: 6px;
          opacity: 0.4;
          cursor: pointer;
          width: 70px;
          vertical-align: top;
          position: relative;
          overflow: hidden;
          &.active {
            box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.4);
            opacity: 0.9;
            border: 2px solid;
          }
          img {
            position: absolute;
            box-shadow: -1px 0px 2px #00000091;
            height: 100%;
            width: 100%;
          }
        }
        &.bar2 {
          margin: 15px 0;
        }
      }
    }
}
</style>
