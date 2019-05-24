<template>
  <div class="timeline">
    <div class="bars" :style="fontColor">
      <div class="timebar">
        <span class="timestamp interval-1" v-for="(item, index) in photoArray" :key="index">{{ time2Date(item[0].timestamp) }}</span>
      </div>
      <div class="bar bar1">
        <div class="wrapper interval-1" :class="{active: dayindex === dayIndex}" v-for="(dayPhotos, dayIndex) in photoArray" :key="dayIndex" @click="timelineClick(dayIndex)">
          <img v-for="(photo, index) in dayPhotos" :key="index" :src="photo.data">
        </div>
      </div>
      <div class="bar bar2"></div>
      <div class="bar bar3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeline',
  props: {
    msg: String,
    fontColor: {
      default: () => {},
      type: Object
    },
    photosData: {
      type: Object,
      default: () => null
    },
    stageIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dayindex: 0
    }
  },
  watch: {
    stageIndex: function(value) {
      let arr = this.photoArray.map(item => item.length)
      let index = 0
      let dayIndex = 0
      for (let i = 0; i < arr.length; i++) {
        if (value > index) {
          index += arr[i]
        } else {
          dayIndex = i
          break
        }
      }
      this.dayindex = dayIndex
    }
  },
  computed: {
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
    timelineClick(dayIndex) {
      this.dayindex = dayIndex
      let flattenArr = this.photoArray.slice(0, dayIndex)
      let index = flattenArr.reduce((a, b) => a.concat(...b), []).length
      this.$emit('change', index)
    },
    time2Date(timeStamp) {
      let time = new Date(timeStamp)
      return `${time.getMonth() + 1}/${time.getDate()}`
    },
    filterPhotoArr(type) {
      // 区分出 上午 / 下午 / 晚上
      let cloneArr = [...this.photoArray]
      this.cloneArr.forEach(item => {
        item.filter(item => {
          let hour = new Date(item.timestamp).getHours()
          console.log(hour)
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 250px;
    border-radius: 20px 20px 0 0;
    box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.5);
    padding: 0px 5px 10px;
    div.bars {
      width: 100%;
      height: 100%;
      overflow-x: auto;
      align-content:space-around;
      div.timebar {
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
        border-radius: 5px;
        width: 120%;
        height: 55px;
        background: rgba(0, 0, 0, 0.2);
        text-align: left;
        padding: 0 5px;
        div.wrapper {
          height: 100%;
          display: inline-block;
          border: 2px solid transparent;
          border-radius: 3px;
          opacity: 0.5;
          cursor: pointer;
          &.active {
            opacity: 0.8;
            border: 2px solid;
          }
          img {
            height: 100%;
            width: 70px;
          }
        }
        &.bar2 {
          margin: 15px 0;
        }
      }
    }
}
</style>
