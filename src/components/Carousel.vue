<template>
    <div class="Carousel" :style="{height: height + 'px'}">
        <div class="Carousel-background"></div>
        <div class="detail">
            <transition name="slide-fade">
                <div class="detail-wrapper detail-left" ref="detailLeft" v-if="showmore">
                    <div class="chartWrapper">
                        <v-chart :options="options"/>
                    </div>
                </div>
            </transition>
        </div>
        <div class="photo_wrapper" ref="photoWrapper" :style="{width: width + 'px'}">
            <div class="photoCover" :style="dominantColor"></div>
            <div class="phohoList" ref="phohoList" :style="{width: width * photos.length + 'px', left: '-' + nowIndex * width + 'px'}">
                <div class="photo" v-for="(photo, index) in photos" :key="index" :style="{width: width + 'px'}">
                    <img :ref="'img' + [index]" :src="photo.data" @load="imgloaded($event, index)" @click="imgClick">
                </div>
            </div>
        </div>
        <div class="detail">
            <transition name="slide-fade">
                <div class="detail-wrapper detail-right" v-if="showmore">
                    <ul :style="fontColor">
                        <li><span>照片</span>{{photos[nowIndex].File}}</li>
                        <li><span>产商</span>{{photos[nowIndex].Make}}</li>
                        <li><span>型号</span>{{photos[nowIndex].Model}}</li>
                        <li><span>ISO</span>{{photos[nowIndex].ISO}}</li>
                        <li><span>光圈</span>{{photos[nowIndex].FNumber}}</li>
                        <li><span>快门</span>{{photos[nowIndex].ExposureTime}}</li>
                    </ul>
                </div>
            </transition>
        </div>
        <div class="control-arrow left" @click="previous">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
        </div>
        <div class="control-arrow right" @click="next">
            <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
    </div>
</template>
<script>
const ColorThief = require('color-thief')
const colorThief = new ColorThief()
import { throttle } from 'throttle-debounce'
import { mapMutations, mapGetters } from 'vuex'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'

export default {
    props: {
        photos: {
            type: Array,
            default: () => []
        },
        index: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 300
        },
        width: {
            type: Number,
            default: 400
        }
    },
    data() {
        return {
            nowIndex: this.index,
            firstLoaded: false,
            colorArr: [0,0,0],
            blackWhiteArray: []
        }
    },
    components: {
        'v-chart': ECharts
    },
    mounted() {
        this.$el.addEventListener('mousewheel', (e) => {
            if (e.deltaY > 50 || e.deltaX > 50) {
                this.next()
            } else if (e.deltaY < -50 || e.deltaX < -50) {
                this.previous()
            }
        })
    },
    watch: {
        stageIndex: function() {
            this.nowIndex = this.stageIndex
        },
        firstLoaded: function () {
            this.$refs.phohoList.style.transition = '0.5s all'
            let img = this.$refs['img' + this.stageIndex][0]
            this.colorArr = colorThief.getColor(img)
            let fontColor = {color: 'rgb(' + colorThief.getPalette(img)[0].join(',') + ')'}

            this.setDominantColor('rgb(' + this.colorArr.join(',') + ')')
            this.setFontColor(fontColor)
            this.drawImageData(img)
        },
        nowIndex: function (index) {
            let img = this.$refs['img' + index][0]
            if (img.getAttribute('data-loaded') === 'true') {
                this.colorArr = colorThief.getColor(img)
                let fontColor = {color: 'rgb(' + colorThief.getPalette(img)[0].join(',') + ')'}

                this.setDominantColor('rgb(' + this.colorArr.join(',') + ')')
                this.setFontColor(fontColor)
                this.drawImageData(img)
            } else {
                img.onload = () => {
                    this.colorArr = colorThief.getColor(img)
                    let fontColor = {color: 'rgb(' + colorThief.getPalette(img)[0].join(',') + ')'}

                    this.setDominantColor('rgb(' + this.colorArr.join(',') + ')')
                    this.setFontColor(fontColor)
                    this.drawImageData(img)
                }
            }

        }
    },
    computed: {
        ...mapGetters(['fontColor', 'dominantColor', 'stageIndex', 'timeLineIndex', 'showmore']),
        dominantColor() {
            return {boxShadow: 'inset 0px 0px 14px 4px rgb(' + this.colorArr.join(',') + ')'}
        },
        carouselColor() {
            return 'rgb(' + this.colorArr.join(',') + ')'
        },
        options() {
            return {
                title: {
                    text: '直方图',
                    left: 'center',
                    top: 'top'
                },
                tooltip: {
                    show: false
                },
                legend: {
                    show: false
                },
                xAxis: {
                    show: false,
                    data: this.blackWhiteArray.map(() => ''),
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    show: false,
                    max: function(value) {
                        return value.max;
                    }
                },
                series: [{
                    name: '',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    itemStyle: {
                        color: this.fontColor.color,
                        shadowColor: 'rgba(255,255,255,0.5)',
                        shadowOffsetX: 1,
                        shadowOffsetY: 2
                    },
                    areaStyle: {
                        color: this.fontColor.color,
                        shadowColor: 'rgba(255,255,255,0.5)',
                        shadowOffsetX: 1,
                        shadowOffsetY: 2
                    },
                    data: this.blackWhiteArray
                }]
            }
        }
    },
    methods: {
        ...mapMutations([
            'setStageIndex',
            'setTimeLineIndex',
            'setFontColor',
            'setDominantColor'
        ]),
        imgClick() {
            this.$FullscreenBox.show(this.photos[this.stageIndex])
        },
        drawImageData (image) {
            let tempCanvas = document.createElement('canvas')
            tempCanvas.width = image.width
            tempCanvas.height = image.height
            let tempCtx = tempCanvas.getContext('2d')

            tempCtx.drawImage(image, 0, 0, image.width, image.height)

            let imagedata = tempCtx.getImageData(0, 0, image.width, image.height)

            let data = imagedata.data;
            let i, len, red, green, blue, average
            let blackWhiteArray = []
            for(let i = 0; i < 256; i++) {
                blackWhiteArray[i] = 0
            }

            for (i = 0 , len = data.length; i < len; i+=4) {
                red = data[i];
                green = data[i + 1]
                blue = data[i + 2]
                // alpha = data[i + 3]

                average = Math.floor((red + green + blue) / 3);  // 每个像素点亮度
                blackWhiteArray[average]++

                data[i] = average
                data[i+1] = average
                data[i+2] = average
            }

            // let canvas = document.createElement('canvas')
            // canvas.width = image.width
            // canvas.height = image.height
            // let ctx = canvas.getContext('2d')
            // ctx.putImageData(imagedata, 0, 0)
            // document.body.appendChild(canvas)
            this.blackWhiteArray = blackWhiteArray
        },
        imgloaded(e, index) {
            e.target.setAttribute('data-loaded', 'true')
            if (index === this.stageIndex ) {
                this.firstLoaded = true
            }
            let {width, height} = e.target
            if (e.target.width / e.target.height < this.$refs.photoWrapper.clientWidth / this.$refs.photoWrapper.clientHeight) {
                e.target.style.height = this.height + 'px'
                e.target.style.width = this.height * width / height + 'px'
            } else {
                e.target.style.width = this.width + 'px'
                e.target.style.height = this.width * height / width + 'px'
            }
        },
        previous: throttle(300, true,function() {
            console.log('previous')
            if (this.nowIndex === 0) {
                // this.nowIndex = this.photos.length - 1
                return
            } else {
                this.nowIndex -= 1
            }
            this.setStageIndex(this.nowIndex)
        }),
        next: throttle(300, true,function () {
            console.log('next')
            if (this.nowIndex === this.photos.length - 1) {
                return
                // this.nowIndex = 0
            } else {
                this.nowIndex += 1
            }
            this.setStageIndex(this.nowIndex)
        }),
        rotateImg() {
            let nowImg = this.$refs['img' + this.stageIndex][0].parentElement
            let rotateTimes = nowImg.getAttribute('data-rotate') || 0
            rotateTimes = Number(rotateTimes) + 1
            nowImg.setAttribute('data-rotate', rotateTimes)
            nowImg.style.transform = `rotate(${rotateTimes * 90}deg) scale(${rotateTimes % 2 === 0 ? 1 : (this.height / this.width)})`
        }
    }
}
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
    transform: translateY(0px);
    opacity: 0.8;
    transition-property: transform,opacity;
    transition-duration: .5s;
}
.slide-fade-leave-active {
    transform: translateY(0px);
    opacity: 0.8;
    transition-property: transform,opacity;
    transition-duration: .5s;
}
.slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

div.Carousel {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    div.detail {
        height: 100%;
        flex: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        div.detail-wrapper {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            &.detail-left {
                .chartWrapper {
                    width: 250px;
                    height: 250px;
                    margin: auto;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }
                .echarts {
                    transform: translateX(-15px);
                    width: 100%;
                    height: 100%;
                }
            }
            &.detail-right {
                ul {
                    position: absolute;
                    top: 50%;
                    left: 20%;
                    transform: translateY(-50%);
                    li {
                        span {
                            display: inline-block;
                            width: 40px;
                        }
                        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
                        line-height: 1.6;
                        text-align: left;
                        opacity: 0.5;
                    }
                }
            }
        }
    }
    div.Carousel-background {
        background-color: white;
        transition: .5s background-color;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
    div.photo_wrapper {
        height: 100%;
        overflow: hidden;
        position: relative;
        div.photoCover {
            position: absolute;
            z-index: 999;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            pointer-events: none;
            transition: .5s box-shadow;
        }
        div.phohoList {
            height: 100%;
            display: flex;
            position: relative;
        }
        div.photo {
            height: 100%;
            position: relative;
            transition: .4s transform;
            img {
                cursor: pointer;
                border-radius: 8px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
    div.control-arrow {
        font-size: 50px;
        padding: 5px 15px;
        cursor: pointer;
        opacity: 0.25;
        transition: .5s opacity;
        background-color: #00000029;
        border-radius: 10px;
        transform: translateY(-50%);
        &:hover {
            opacity: 0.5;
        }
    }
    div.left {
        top: 50%;
        position: absolute;
        left: 0;
    }
    div.right {
        top: 50%;
        position: absolute;
        right: 0;
    }
}
</style>

