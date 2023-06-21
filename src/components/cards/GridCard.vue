<template>
  <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex justify-end items-center space-x-3">
        <span class="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ tag }}</span>
      </div>
      <div class="flex w-full items-center justify-between space-x-6">
        <div class="w-2/3">
          <h3 v-if="title" class="text-xl font-medium text-gray-900 mb-1">{{ title }}</h3>
          <p class="mt-2 text-sm text-gray-500 text-justify"><slot /></p>
        </div>
        <button v-if="buttonText"
                @click="goTo(url)"
                type="button"
                class="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm w-48 hover:bg-indigo-100">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

defineProps({
  title: String,
  tag: String,
  description: String,
  buttonText: String,
  url: String
});

const router = useRouter();

const goTo = (newRoute) => {
  router.push(newRoute)
}
</script>
