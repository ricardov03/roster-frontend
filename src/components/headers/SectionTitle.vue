<template>
  <div class="mb-8 w-full">
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div v-if="props.title" class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{{ props.title }}</h2>
        <h3 v-if="props.subtitle" class="text-xl text-gray-700 font-bold leading-7 sm:truncate sm:text-2xl sm:tracking-tight">{{ props.subtitle }}</h3>
      </div>
      <div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
        <RouterLink v-if="buttonText && buttonAction" :to="buttonAction" type="button" class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <PlusSmallIcon class="-ml-1.5 h-5 w-5" aria-hidden="true" />
          {{ buttonText }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusSmallIcon } from '@heroicons/vue/20/solid'

const props = defineProps(['title', 'subtitle', 'buttonText', 'buttonAction']);
</script>
