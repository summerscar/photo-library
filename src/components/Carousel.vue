<template>
    <div class="Carousel" :style="{height: height + 'px'}">
        <div class="photo_wrapper" :style="{width: width + 'px'}">
            <div class="photoCover"></div>
            <div class="phohoList" :style="{width: width * photos.length + 'px', left: '-' + index * width + 'px'}">
                <div class="photo" v-for="(photo, index) in photos" :key="index" :style="{width: width + 'px'}">
                    <img :src="photo.data" @load="imgloaded">
                </div>
            </div>
        </div>
         <div class="left">

        </div>
         <div class="right">

        </div>
    </div>
</template>
<script>
export default {
    props: {
        photos: {
            type: Array,
            default: () => []
        },
        index: {
            type: Number,
            default: 1
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
    methods: {
        imgloaded(e) {
            let {width, height} = e.target
            if (e.target.width / e.target.height < 4 / 3) {
                e.target.style.height = this.height + 'px'
                e.target.style.width = this.height * width / height + 'px'
            } else {
                e.target.style.width = this.width + 'px'
                e.target.style.height = this.width * height / width + 'px'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
div.Carousel {
    width: 100%;
    position: relative;
    text-align: center;
    div.photo_wrapper {
        display: inline-block;
        margin: 0 auto;
        height: 100%;
        overflow: hidden;
        border: 1px solid #66ccff;
        position: relative;
        div.photoCover {
            position: absolute;
            z-index: 999;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            box-shadow: inset 0px 0px 14px 4px #00000052;
            pointer-events: none;
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
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
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

