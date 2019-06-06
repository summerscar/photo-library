<template>
    <div class="fullscreen" ref="fullscreen" @click="close">
        <div class="wrapper" v-if="photo">
            <img :src="photo.data">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            photo: null
        }
    },
    methods: {
        show(photo) {
            console.log(photo)
            this.photo = photo
            document.body.appendChild(this.$el)
            setTimeout(() => {
                this.$refs.fullscreen.style.opacity = 1
            }, 50);
        },
        close() {
            this.$refs.fullscreen.style.opacity = 0
            setTimeout(() => {
                document.body.removeChild(this.$el)
            }, 400);
        }
    }
}
</script>
<style lang="scss" scoped>
div.fullscreen {
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    opacity: 0;
    transition: opacity .4s ease-out;
    background-color: rgba(0, 0, 0, 0.7);
    div.wrapper {
        width: 90%;
        height: 90%;
        margin: 50px auto 0;
        text-align: center;
        img {
            border-radius: 20px;
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
        }
    }
}
</style>


