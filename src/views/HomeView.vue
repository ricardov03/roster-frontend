<script setup>
import GridList from "@/components/gridlists/GridList.vue";
import Feed from "@/components/feeds/Feed.vue";
</script>

<template>
  <main>

    <main>
      <div>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 class="text-3xl mb-8">Courses</h3>
          <GridList />
        </div>
      </div>
    </main>

    <aside class="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 pt-24 px-4 py-6 sm:px-6 lg:px-8 xl:block">
      <h3 class="text-2xl mb-8">Lasted Activities</h3>
      <Feed />
    </aside>
  </main>
</template>
