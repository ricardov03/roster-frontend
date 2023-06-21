<script setup>
// import Course from "@/components/cards/Course.vue";
import Feed from "@/components/feeds/Feed.vue";
import SectionTitle from "@/components/headers/SectionTitle.vue";
</script>

<template>
  <div>

    <main>
      <div>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Courses" />
<!--          <Course />-->
        </div>
      </div>
    </main>

    <aside class="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 mt-16 px-4 py-6 sm:px-6 lg:px-8 xl:block">
      <h3 class="text-2xl mb-8">Lasted Activities</h3>
      <Feed />
    </aside>
  </div>
</template>
