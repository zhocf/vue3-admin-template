import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import bootstrap from "@/bootstrap";
import {initPreferences} from "@zbm/preferences"

initPreferences({theme: {themeColor: 'black'}})


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(bootstrap)

app.mount('#app')
