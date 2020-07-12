import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let time = '' // 判断setTimeOut是否存在

export default new Vuex.Store({
  state: {
    msg: '', // 互动内容
    fade: 0, // 消息框style的opacity值
    sum: [], // live2d的全部模型路径
    path: 'live2d/live2d-widget-model-plt/assets/plt.model.json', // live2d路径 如果没有缓存则优先此路径
    width: 300, // live2d的宽(canvas)
    height: 600, // live2d的高(canvas)
    showBorder: false, // 显示边框
    isShowLive2dList: false, // 显示live2d列表
    isShowSettings: false, // 显示settings列表
    autoStart: false // 设置开机自启
  },
  mutations: {
    // 设置互动内容
    setMsg(state, payload) {
      state.msg = payload
    },
    // 设置消息框opacity
    setFade(state, payload) {
      state.fade = payload
    },
    // 切换live2d
    setPath(state, payload) {
      state.path = payload
    },
    // 设置边框显示
    setShowBorder(state, payload) {
      state.showBorder = payload
    },
    // 设置开机自启
    setAutoStart(state, payload) {
      state.autoStart = payload
    },
    // 设置live2d列表显示或隐藏
    setLive2dList(state, payload) {
      state.isShowLive2dList = payload
    },
    // 设置设置界面显示或隐藏
    setSettings(state, payload) {
      state.isShowSettings = payload
    },
    setSum(state, payload) {
      state.sum = payload
    },
    addSum(state, payload) {
      state.sum.push(payload)
    }
  },
  actions: {
    // 获得互动内容并显示消息框
    getMsg({ commit, dispatch }) {
      // v1.hitokoto.cn这网址会随机返回一条互动 不知道是谁的反正用就vans了
      Vue.axios.get('https://v1.hitokoto.cn/').then(res => {
        commit('setMsg', res.data.hitokoto)
        commit('setFade', 1) // 消息框opacity=1
        dispatch('removeMsg')
      })
    },
    // 移除消息框
    removeMsg({ state, commit }) {
      // 防止重复触发setTimeOut
      clearTimeout(time)
      time = setTimeout(() => {
        commit('setFade', 0)
      }, 5000);
    }
  }
})
