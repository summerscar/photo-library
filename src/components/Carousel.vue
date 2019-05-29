<template>
    <div class="Carousel" :style="{height: height + 'px'}">
        <div class="Carousel-background"></div>
        <div class="detail">
            <div class="detail-left"></div>
        </div>
        <div class="photo_wrapper" ref="photoWrapper" :style="{width: width + 'px'}">
            <div class="photoCover" :style="dominantColor"></div>
            <div class="phohoList" ref="phohoList" :style="{width: width * photos.length + 'px', left: '-' + nowIndex * width + 'px'}">
                <div class="photo" v-for="(photo, index) in photos" :key="index" :style="{width: width + 'px'}">
                    <img :ref="'img' + [index]" :src="photo.data" @load="imgloaded($event, index)">
                </div>
            </div>
        </div>
        <div class="detail">
            <div class="detail-wrapper detail-right">
                <ul :style="fontColor">
                    <li><span>照片</span>{{photos[nowIndex].File}}</li>
                    <li><span>产商</span>{{photos[nowIndex].Make}}</li>
                    <li><span>型号</span>{{photos[nowIndex].Model}}</li>
                    <li><span>ISO</span>{{photos[nowIndex].ISO}}</li>
                    <li><span>光圈</span>{{photos[nowIndex].FNumber}}</li>
                    <li><span>快门</span>{{photos[nowIndex].ExposureTime}}</li>
                    <li><span>焦距</span>{{photos[nowIndex].FocalLength}}</li>
                </ul>
            </div>
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
import { mapMutations, mapGetters } from "vuex";

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
            colorArr: [0,0,0]
        }
    },
    mounted() {
        this.$el.addEventListener('mousewheel', (e) => {
            if (e.deltaY > 0) {
                this.next()
            } else {
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
            this.colorArr = colorThief.getColor(this.$refs['img0'][0])
            let fontColor = {color: 'rgb(' + colorThief.getPalette(this.$refs['img0'][0])[0].join(',') + ')'}

            this.setDominantColor('rgb(' + this.colorArr.join(',') + ')')
            this.setFontColor(fontColor)
        },
        nowIndex: function (index) {
            this.colorArr = colorThief.getColor(this.$refs['img' + index][0])
            let fontColor = {color: 'rgb(' + colorThief.getPalette(this.$refs['img' + index][0])[0].join(',') + ')'}

            this.setDominantColor('rgb(' + this.colorArr.join(',') + ')')
            this.setFontColor(fontColor)
        }
    },
    computed: {
        ...mapGetters(['fontColor', 'dominantColor', 'stageIndex', 'timeLineIndex']),
        dominantColor() {
            return {boxShadow: 'inset 0px 0px 14px 4px rgb(' + this.colorArr.join(',') + ')'}
        },
        carouselColor() {
            return 'rgb(' + this.colorArr.join(',') + ')'
        }
    },
    methods: {
        ...mapMutations([
            'setStageIndex',
            'setTimeLineIndex',
            'setFontColor',
            'setDominantColor'
        ]),
        imgloaded(e, index) {
            if (index === 0 ) {
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
        previous: throttle(300, function() {
            console.log('previous')
            if (this.nowIndex === 0) {
                // this.nowIndex = this.photos.length - 1
                return
            } else {
                this.nowIndex -= 1
            }
            this.setStageIndex(this.nowIndex)
        }),
        next: throttle(300, function () {
            console.log('next')
            if (this.nowIndex === this.photos.length - 1) {
                return
                // this.nowIndex = 0
            } else {
                this.nowIndex += 1
            }
            this.setStageIndex(this.nowIndex)
        })
    }
}
</script>
<style lang="scss" scoped>
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
            opacity: 0.8;

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
                    line-height: 1.6;
                    text-align: left;
                    opacity: 0.5;
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
            img {
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

