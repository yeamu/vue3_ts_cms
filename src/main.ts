import store from '@/stores'
import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'
import router from '@/router/index'
import App from './App.vue'
import Icons from './global/register-icons'

const app = createApp(App)

app.use(Icons)
app.use(store)
app.use(router).mount('#app')
