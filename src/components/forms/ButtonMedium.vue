<template>
  <button type="button" class="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
    <QueueListIcon class="h-4 w-4 inline" />
    {{ text }}
  </button>
</template>

<script setup>
import {QueueListIcon} from "@heroicons/vue/24/outline";

defineProps(['text'])
</script>
