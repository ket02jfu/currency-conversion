import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import {
    createPinia
} from 'pinia'
import {
    useCurrencyStore
} from './store'
import './assets/styles/main.scss'

const app = createApp(App)

const pinia = createPinia()
app.use(router)
app.use(pinia)

const store = useCurrencyStore()

store.loadRates()

app.mount('#app')