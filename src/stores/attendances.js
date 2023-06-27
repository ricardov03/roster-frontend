import { defineStore } from "pinia";
import axios from "axios";

export const useAttendanceStore = defineStore('attendances', {
    state: () => ({
        attendance: {}
    }),
    getters: {},
    actions: {
        async fetchAttendanceData(sectionId) {
            this.attendance = {};
            const response = await axios.get(`http://roster-backend.test/api/v1/sections/${sectionId}/attendances`);
            this.attendance = response.data.data
        }
    }
})
