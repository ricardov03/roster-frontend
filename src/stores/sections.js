import { defineStore } from "pinia";
import axios from "axios";

export const useSectionStore = defineStore('sections', {
    state: () => ({
        section: {}
    }),
    getters: {},
    actions: {
        async fetchSectionData(sectionId) {
            this.section = {};
            const response = await axios.get(`http://roster-backend.test/api/v1/sections/${sectionId}`);
            this.section = response.data.data
        }
    }
})
