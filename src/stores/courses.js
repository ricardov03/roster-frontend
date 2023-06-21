import { defineStore } from "pinia";
import axios from "axios";

export const useCourseStore = defineStore('courses', {
    state: () => ({
        courses: {}
    }),
    getters: {},
    actions: {
        async fetchCourses() {
            const response = await axios.get('http://roster-backend.test/api/v1/courses');
            this.courses.value = response.data
        }
    }
})
