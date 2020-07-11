import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { RadioButton, RadioGroup, Switch, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 饿了🐎组件
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Switch)
Vue.use(Input)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
