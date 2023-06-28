import { defineStore } from "pinia";
import axios from "axios";

export const useAttendanceStore = defineStore('attendances', {
    state: () => ({
        attendances: {}
    }),
    getters: {},
    actions: {
        async fetchAttendanceData(sectionId) {
            this.attendances = {};
            const response = await axios.get(`http://roster-backend.test/api/v1/sections/${sectionId}/attendances`);
            this.attendances = response.data.data
        }
    }
})
