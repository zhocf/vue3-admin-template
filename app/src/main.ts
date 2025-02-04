import {createApp} from 'vue'

import App from './App.vue'
import router from './router'

import bootstrap from "@/bootstrap";
import {initPreferences} from "@zbm/preferences"

initPreferences({theme: {themeColor: 'black'}})


const app = createApp(App)

app.use(router)
app.use(bootstrap)

