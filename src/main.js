import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {useCourseStore} from "@/stores/courses";

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(LoadingPlugin);
app.use(router)
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')

// First App load.
const store = useCourseStore();
store.fetchCourses();
