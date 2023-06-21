<template>
  <div class="mb-10">
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div v-if="props.title" class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{{ props.title }}</h2>
      </div>
      <div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
        <button v-if="buttonText" type="button" class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <PlusSmallIcon class="-ml-1.5 h-5 w-5" aria-hidden="true" />
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusSmallIcon } from '@heroicons/vue/20/solid'
import Breadcrums from "@/components/navegation/Breadcrums.vue";

const props = defineProps(['title', 'buttonText']);
</script>
