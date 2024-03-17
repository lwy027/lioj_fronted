import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/css/index.css'
import 'normalize.css'
import WYrequest from './service/requests'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const res = await WYrequest.get({
  url: '/aa'
})
console.log(res)
