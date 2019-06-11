import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stageIndex: 0,
    timeLineIndex: 0,
    fontColor: {color: '#000000'},
    dominantColor: '#ffffff',
    showmore: true,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)
  },
  getters: {
    dominantColor(state) {
      return state.dominantColor
    },
    fontColor(state) {
      return state.fontColor
    },
    timeLineIndex(state) {
      return state.timeLineIndex
    },
    stageIndex(state) {
      return state.stageIndex
    },
    showmore(state) {
      return state.showmore
    },
    isMobile(state) {
      return state.isMobile
    }
  },
  mutations: {
    setStageIndex(state, index){
      router.push({name: 'home', query: {id: index}})
      state.stageIndex = index
    },
    setTimeLineIndex(state, index) {
      state.timeLineIndex = index
    },
    setFontColor(state, color) {
      state.fontColor = color
    },
    setDominantColor(state, color) {
      state.dominantColor = color
    },
    setShowmore(state, showmore) {
      state.showmore = showmore
    }
  },
  actions: {

  }
})
