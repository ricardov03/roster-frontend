import { defineStore } from "pinia";
import axios from "axios";
import {useLoading} from "vue-loading-overlay";

const $loading = useLoading();

export const useSectionStore = defineStore('sections', {
    state: () => ({
        section: {}
    }),
    getters: {},
    actions: {
        async fetchSectionData(sectionId) {
            const loader = $loading.show({
                container: this.fullPage,
                canCancel: true,
                onCancel: this.onCancel,
            });

            this.section = {};
            const response = await axios.get(`http://roster-backend.test/api/v1/sections/${sectionId}`);
            this.section = response.data.data;

            loader.hide();
        }
    }
})
