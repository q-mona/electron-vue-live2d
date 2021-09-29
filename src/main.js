import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { Button, UploadDragger, Slider, Switch, Tooltip, Divider } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App)
app.use(Button)
app.use(UploadDragger)
app.use(Slider)
app.use(Switch)
app.use(Tooltip)
app.use(Divider)

app.use(store)
app.mount('#app')
