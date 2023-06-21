<script setup>
import GridCard from "@/components/cards/GridCard.vue";
import SectionTitle from "@/components/headers/SectionTitle.vue";
</script>

<script>
import { useCourseStore } from "@/stores/courses";
import {mapActions, mapState} from "pinia";

export default{
  data() {
    return {}
  },
  methods: {
    ...mapActions(useCourseStore, ['fetchCourses'])
  },
  computed: {
    ...mapState(useCourseStore, ['courses'])
  }
}
</script>

<template>
  <main>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle title="Courses" button-text="New Course" />
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <li v-for="course in courses" :key="course.id" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <GridCard :title="course.name" :tag="course.code" button-text="Review Sections" :url="`/courses/${course.id}`">
            <p class="truncate text-sm text-gray-500"><strong>Sections:</strong> {{ course.sections.length }}</p>
          </GridCard>
        </li>
      </ul>
    </div>
  </main>
</template>
