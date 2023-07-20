import { defineStore } from "pinia";
import axios from "axios";
import {simpleNotification, toastNotification} from "@/composables/notifications";

export const useAttendanceStore = defineStore('attendances', {
    state: () => ({
        attendances: {}
    }),
    getters: {
        attendanceDates(state) {
            if(state.attendances.length) {
                return state.attendances.map(item => {
                    const date = new Date(item.date);
                    return date.setDate(date.getDate() + 1);
                })
            }
        }
    },
    actions: {
        async fetchAttendanceData(sectionId) {
            this.attendances = {};
            const response = await axios.get(`http://roster-backend.test/api/v1/sections/${sectionId}/attendances`);
            this.attendances = response.data.data;
        },
        async recordAttendance(sectionId, attendanceDate, absentedStudents, returnPath){
            simpleNotification.fire({
                timer: false,
                icon: 'info',
                showCancelButton: true,
                title: 'New Attendance Report',
                text: `We going to proceed to complete this Attendance. Be aware Attendances can't be modified. Do you want to proceed?`
            }).then(async (confirm) => {
                if (confirm.isConfirmed) {
                    let response = await axios.post(`http://roster-backend.test/api/v1/sections/${sectionId}/attendances`, {
                        date: attendanceDate
                    });

                    const attendanceId = response.data.attendance.last_id;

                    if (Object.keys(absentedStudents).length) {
                        response = await axios.post(`http://roster-backend.test/api/v1/attendances/${attendanceId}/absences`, {
                            absences: absentedStudents
                        });

                        if (response.status !== 200) {
                            toastNotification.fire({
                                icon: 'error',
                                title: 'There was an error',
                                text: `There was an error reporting the absent students.`
                            })
                        }
                    }

                    toastNotification.fire({
                        icon: 'success',
                        title: attendanceDate.toLocaleDateString("en-US") + ` Attendance Recorded`,
                        text: `${Object.keys(absentedStudents).length} Students reported as absent.`
                    })

                    this.$router.push(returnPath)
                } else {
                    toastNotification.fire({
                        icon: 'success',
                        title: `Understood!`,
                        text: `You can proceed with the required modifications.`
                    })
                }
            })
        }
    }
})
