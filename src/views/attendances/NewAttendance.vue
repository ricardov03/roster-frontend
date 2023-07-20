<script>
// Vue 2 - Option API Sample.
import SectionTitle from "@/components/headers/SectionTitle.vue";
import {mapActions, mapGetters, mapState} from "pinia";
import {useSectionStore} from "@/stores/sections";
import {ChevronLeftIcon, PlusIcon, ExclamationTriangleIcon} from '@heroicons/vue/20/solid'
import {useAppStore} from "@/stores/app";
import {useAttendanceStore} from "@/stores/attendances";
import SimpleToggle from "@/components/forms/SimpleToggle.vue";

export default{
  components: {
    ChevronLeftIcon,
    ExclamationTriangleIcon,
    PlusIcon,
    SectionTitle,
    SimpleToggle
  },
  data() {
    return {
      attendanceDate: undefined,
      students: {}
    }
  },
  methods: {
    ...mapActions(useAppStore, ['toggleAttendanceSlideover']),
    ...mapActions(useSectionStore, ['fetchSectionData']),
    ...mapActions(useAttendanceStore, ['fetchAttendanceData', 'recordAttendance', 'updateAbsentedStudents']),
  },
  created() {
    this.fetchSectionData(this.$route.params.sectionId);
    this.fetchAttendanceData(this.$route.params.sectionId);
  },
  computed: {
    ...mapState(useAppStore, ['attendanceSlideover']),
    ...mapState(useSectionStore, ['section']),
    ...mapState(useAttendanceStore, ['attendances']),
    ...mapGetters(useAttendanceStore, ['attendanceDates']),
    attendance() {
      return this?.attendances[this.$route.params.attendanceId];
    },
    emptyAbsences() {
      return !Object.entries(this.students)?.length > 0;
    }
  }
}
</script>

<template>
  <main>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-end items-center">
        <RouterLink v-if="section.course" :to="`/courses/${this.$route.params.courseId}/sections/${this.$route.params.sectionId}`" class="text-blue-500 text-sm uppercase"><ChevronLeftIcon class="w-4 h-4 inline tracking-tighter" /> Return to Section Details</RouterLink>
      </div>
      <div class="flex flex-1 justify-between">
        <SectionTitle :title="`Attendance for ${section.name}`" :subtitle="'Course: ' + section.course" :button-action="`/courses/${this.$route.params.courseId}/sections/${this.$route.params.sectionId}/new-attendance`" />
      </div>

      <div>
        <dl class="grid grid-cols-1 gap-5 content-stretch">
          <div
              v-if="section.roster_size"
              :class="[!attendanceDate ? 'bg-yellow-100 text-yellow-900': 'bg-green-100 text-green-900', 'overflow-hidden rounded-lg px-4 py-5 shadow sm:p-6']"
          >
            <dd class="text-base tracking-tight">
              <div v-if="!attendanceDate">
                <ExclamationTriangleIcon class="inline text-yellow-600 w-6 h-6" /> Please select an <span class="font-bold">Attandence Date</span> to being able to store the attendance.
              </div>
              <div v-else>
                You are able to store the <span class="font-bold">Attandence</span>.
                <div v-if="emptyAbsences" class="inline"><ExclamationTriangleIcon class="inline text-yellow-600 w-6 h-6" /> Be aware that you don't have any absence in this roster.</div>
              </div>
            </dd>
          </div>
        </dl>
      </div>

      <div v-if="section.roster" class="grid grid-cols-2 gap-6">
        <div>
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight mt-5">Student Roster</h2>
          <div class="mt-5 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block w-full min-w-min py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-center">Assistance</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(student, key) in section.roster" :key="student.student_id">
                      <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                        <div class="flex items-center gap-x-4">
                          <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-8 w-8 rounded-full bg-gray-800" />
                          <div class="truncate text-normal font-medium leading-normal">
                            <div><a :href="`mailto:${student.email}`">{{ student.name }} {{ student.last_name }}</a></div>
                            <div class="text-xs text-gray-400 hover:text-gray-800 cursor-pointer">{{ student.student_id }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex justify-center">
                        <SimpleToggle v-model="students[key]" :invert="true" />
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight mt-5">Attendance Date</h2>
          <div class="mt-5 flow-root">
            <VueDatePicker
                class="custom-picker"
                v-model="attendanceDate"
                :auto-apply="true"
                :month-change-on-scroll="false"
                :enable-time-picker="false"
                :show-now-button="false"
                :max-date="new Date()"
                on-invalid-select=""
                :disabled-dates="attendanceDates"
                inline
            />
            <div class="px-2 py-1 bg-green-100 text-xs rounded mt-4">
              <ExclamationTriangleIcon class="text-yellow-500 h-5 w-5 inline" />
              The disabled dates correspond to the days that have already been registered.
            </div>
            <div class="text-right">
              <button
                  :disabled="!attendanceDate"
                  @click="recordAttendance(section.id, attendanceDate, students, `/courses/${this.$route.params.courseId}/sections/${this.$route.params.sectionId}`)"
                  :class="[!attendanceDate ? 'bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600 cursor-pointer', 'inline-flex items-center mt-4 gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2']"
                  type="button"
              >
                <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Record New Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.custom-picker > .dp__outer_menu_wrap { width: 100%; }
.dp__calendar_item { display: flex !important; justify-content: center !important; }
</style>
