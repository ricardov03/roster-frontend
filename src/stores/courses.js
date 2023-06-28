import { defineStore } from "pinia";
import axios from "axios";
import {useLoading} from "vue-loading-overlay";

const $loading = useLoading();

export const useCourseStore = defineStore('courses', {
    state: () => ({
        courses: {}
    }),
    getters: {},
    actions: {
        async fetchCourses() {
            const loader = $loading.show({
                container: this.fullPage,
                canCancel: true,
                onCancel: this.onCancel,
            });

            const response = await axios.get('http://roster-backend.test/api/v1/courses');
            this.courses = response.data.data;

            loader.hide();
        }
    }
})
