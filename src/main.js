import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {useCourseStore} from "@/stores/courses";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// First App load.
const store = useCourseStore();
store.fetchCourses();
