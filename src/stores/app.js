import {ref, reactive} from "vue";
import { defineStore } from "pinia";
import {FolderIcon, HomeIcon, RectangleStackIcon} from "@heroicons/vue/24/outline";

export const useAppStore = defineStore('app', () => {
    const mainNavigation = reactive([
        {
            name: 'Home',
            href: '/',
            icon: HomeIcon
        },
        {
            name: 'Courses',
            href: '/courses',
            icon: RectangleStackIcon,
            subnav: [
                {
                    name: 'Sections',
                    href: '/courses/sections'
                },
                {
                    name: 'Attendance',
                    href: '/courses/sections/attendance'
                }
            ]
        },
        {
            name: 'Users',
            href: '/users',
            icon: FolderIcon
        },
    ]);
    const attendanceSlideover = ref(false);
    const currentNavOption = ref({});

    function updateCurrentMenu(currentOption) {
        currentNavOption.value = currentOption;
    }

    function toggleAttendanceSlideover() {
        attendanceSlideover.value = !attendanceSlideover.value;
    }

    return {
        attendanceSlideover,
        currentNavOption,
        mainNavigation,
        toggleAttendanceSlideover,
        updateCurrentMenu
    }
})
