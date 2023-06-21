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
          <SectionTitle title="Dashboard" />
          <h3 class="text-xl">To Do</h3>
          <ul>
            <li><input type="checkbox" name="" id=""> Lasted Courses</li>
            <li><input type="checkbox" name="" id=""> Lasted Section</li>
            <li><input type="checkbox" name="" id=""> Login Screen and Authentication</li>
            <li><input type="checkbox" name="" id=""> Graphics and Statistics for students? Yes.</li>
            <li class="ml-5">
              <ul>
                <li><input type="checkbox" name="" id=""> Most absented Courses / Sections</li>
                <li><input type="checkbox" name="" id=""> Most absented Courses / Sections</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </main>

    <aside class="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 mt-16 px-4 py-6 sm:px-6 lg:px-8 xl:block">
      <h3 class="text-2xl mb-8">Lasted Activities</h3>
      <Feed />
    </aside>
  </div>
</template>
