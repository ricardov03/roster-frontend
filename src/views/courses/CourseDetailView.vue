<script>
// Vue 2 - Option API Sample.
import GridCard from "@/components/cards/GridCard.vue";
import SectionTitle from "@/components/headers/SectionTitle.vue";
import { ChevronLeftIcon, InformationCircleIcon } from '@heroicons/vue/20/solid'
import { useCourseStore } from "@/stores/courses";
import {mapActions, mapState} from "pinia";

export default{
  components: {
    ChevronLeftIcon,
    GridCard,
    SectionTitle,
    InformationCircleIcon
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(useCourseStore, ['fetchCourses'])
  },
  computed: {
    ...mapState(useCourseStore, ['courses']),
    course() { return this.courses[this.$route.params.id - 1] }
  }
}
</script>

<template>
  <main>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-end items-center">
        <RouterLink :to="`/courses`" class="text-blue-500 text-sm uppercase"><ChevronLeftIcon class="w-4 h-4 mb-0.5 inline tracking-tighter" /> Return All Courses</RouterLink>
      </div>
      <div class="flex flex-1 justify-between">
        <SectionTitle :title="course.name" :subtitle="course.code" />
      </div>
      <div class="px-4 sm:px-0">
        <p class="mb-10 text-base leading-6 text-gray-900">{{ course.description }}</p>
      </div>
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight mb-5">Sections</h2>
      <ul v-if="course.sections.length" role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <li v-for="section in course.sections" :key="section.id" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <GridCard :title="section.name" buttonText="Review Section" :url="`/courses/${course.id}/sections/${section.id}`" />
        </li>
      </ul>
      <div v-else class="rounded-md bg-blue-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <InformationCircleIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div class="ml-3 flex-1 md:flex md:justify-between">
            <p class="text-sm text-blue-700">There are no Sessions available for this course.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
