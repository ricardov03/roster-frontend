<script>
// Vue 2 - Option API Sample.
import SectionTitle from "@/components/headers/SectionTitle.vue";
import {mapActions, mapState} from "pinia";
import {useSectionStore} from "@/stores/sections";
import {ChevronLeftIcon} from '@heroicons/vue/20/solid'
import {useAppStore} from "@/stores/app";
import {useAttendanceStore} from "@/stores/attendances";
import SimpleToggle from "@/components/forms/SimpleToggle.vue";

export default{
  components: {
    ChevronLeftIcon,
    SectionTitle,
    SimpleToggle
  },
  data() {
    return {
      absences: {}
    }
  },
  methods: {
    ...mapActions(useAppStore, ['toggleAttendanceSlideover']),
    ...mapActions(useSectionStore, ['fetchSectionData']),
    ...mapActions(useAttendanceStore, ['fetchAttendanceData']),
    absent(id) {
      return !!this?.attendance?.absences.find(student => {
        return student.student_id === id
      });
    }
  },
  created() {
    this.fetchSectionData(this.$route.params.sectionId);
    this.fetchAttendanceData(this.$route.params.sectionId);
  },
  computed: {
    ...mapState(useAppStore, ['attendanceSlideover']),
    ...mapState(useSectionStore, ['section']),
    ...mapState(useAttendanceStore, ['attendances']),
    attendance() {
      return this?.attendances[this.$route.params.attendanceId];
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
        <SectionTitle :title="section.course" :subtitle="`${section.name} attendance in ${attendance?.date}`" :button-action="`/courses/${this.$route.params.courseId}/sections/${this.$route.params.sectionId}/new-attendance`" />
      </div>

      <div v-if="section.roster">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight mt-5">Student Roster</h2>
        <div class="mt-5 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block w-1/2 min-w-min py-2 align-middle sm:px-6 lg:px-8">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-center">Assistance</th>
                  </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="student in section.roster" :key="student.student_id">
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
                      <SimpleToggle v-model="absences[student.student_id]" :invert="true" />
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
