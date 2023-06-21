<script setup>
import Course from "@/components/cards/Course.vue";
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
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Course />
      </ul>
      {{ courses }}
    </div>
  </main>
</template>
