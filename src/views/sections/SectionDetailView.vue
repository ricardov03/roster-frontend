<script>
// Vue 2 - Option API Sample.
import AttendancesFeed from "@/components/feeds/AttendancesFeed.vue";
import ButtonMedium from "@/components/forms/ButtonMedium.vue";
import OverlaySlideover from "@/components/slideover/OverlaySlideover.vue";
import SectionTitle from "@/components/headers/SectionTitle.vue";
import {mapActions, mapState} from "pinia";
import {useSectionStore} from "@/stores/sections";
import {EnvelopeIcon, PhoneIcon, ChevronLeftIcon} from '@heroicons/vue/20/solid'
import {useAppStore} from "@/stores/app";
import {useAttendanceStore} from "@/stores/attendances";

export default{
  components: {
    AttendancesFeed,
    ButtonMedium,
    ChevronLeftIcon,
    EnvelopeIcon,
    OverlaySlideover,
    PhoneIcon,
    SectionTitle
  },
  data() {
    return {
      loader: {},
    }
  },
  methods: {
    ...mapActions(useAppStore, ['toggleAttendanceSlideover']),
    ...mapActions(useSectionStore, ['fetchSectionData']),
    ...mapActions(useAttendanceStore, ['fetchAttendanceData']),
    getAttendances(section) {
      this.toggleAttendanceSlideover();
      this.fetchAttendanceData(section);
    }
  },
  created() {
    this.fetchSectionData(this.$route.params.sectionId);
  },
  computed: {
    ...mapState(useAppStore, ['attendanceSlideover']),
    ...mapState(useSectionStore, ['section']),
    ...mapState(useAttendanceStore, ['attendances'])
  }
}
</script>

<template>
  <main v-if="section?.id">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-end items-center">
        <RouterLink v-if="section.course" :to="`/courses/${this.$route.params.courseId}`" class="text-blue-500 text-sm uppercase"><ChevronLeftIcon class="w-4 h-4 mb-0.5 inline tracking-tighter" /> Return to course details</RouterLink>
      </div>
      <div class="flex flex-1 justify-between">
        <SectionTitle :title="section.course" :subtitle="section.name" :button-action="`/courses/${this.$route.params.courseId}/sections/${this.$route.params.sectionId}/new-attendance`" button-text="New Attendance" />
      </div>
      <div class="grid grid-cols-2 gap-10 content-start">
        <div>
          <ul v-if="section.instructor" role="list" class="w-4/5 mb-5">
            <li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
              <div class="flex w-full items-center justify-between space-x-6 p-6">
                <div class="flex-1 truncate">
                  <div class="flex items-center space-x-3">
                    <h3 class="truncate text-sm font-medium text-gray-900">{{ section.instructor }}</h3>
                  </div>
                  <p class="mt-1 truncate text-sm text-gray-500">Instructor</p>
                </div>
                <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
              </div>
              <div>
                <div class="-mt-px flex divide-x divide-gray-200">
                  <div class="flex w-0 flex-1">
                    <a :href="`mailto:#`" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                      <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                      Email
                    </a>
                  </div>
                  <div class="-ml-px flex w-0 flex-1">
                    <a :href="`tel:#`" class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                      <PhoneIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2 content-stretch">
            <div v-if="section.roster_size" class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt class="truncate text-sm font-medium text-gray-500">Students in Section</dt>
              <dd class="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
                {{ section.roster_size }} <span class="text-sm">Student<span v-if="section.roster_size > 1">s</span></span>
              </dd>
            </div>
            <div v-if="section.attendance_lists" class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt class="truncate text-sm font-medium text-gray-500">Recorded Attendances</dt>
              <dd class="mt-3 text-3xl font-semibold tracking-tight text-gray-900 flex justify-between">
                {{ section.attendance_lists }}
                <ButtonMedium text="Check Attendances" @click="getAttendances($route.params.sectionId)" />
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div v-if="section.roster">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight mt-5">Student Roster</h2>
        <div class="mt-5 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Student Id</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="student in section.roster" :key="student.student_id">
                    <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                      <div class="flex items-center gap-x-4">
                        <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-8 w-8 rounded-full bg-gray-800" />
                        <div class="truncate text-sm font-medium leading-6">{{ student.name }} {{ student.last_name }}</div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.student_id }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.email }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OverlaySlideover title="Recorded Attendances" :open="attendanceSlideover" @closeSlideover="toggleAttendanceSlideover">
      <AttendancesFeed :feedData="attendances" />
    </OverlaySlideover>
  </main>
</template>
