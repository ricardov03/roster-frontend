<template>
  <div class="flow-root">
    <ul role="list" class="-mb-8">
      <li v-for="(entry, entryIdx) in feedData" :key="entry.id">
        <div class="relative pb-8">
          <span v-if="entryIdx !== feedData.length - 1" class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
          <div class="relative flex space-x-3">
            <div>
              <span class="bg-blue-400 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
                <CalendarDaysIcon class="h-5 w-5 text-white" aria-hidden="true" />
              </span>
            </div>
            <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
              <div class="whitespace-nowrap text-right text-sm text-gray-500">
                <time :datetime="entry.datetime">{{ entry.date }}</time>
              </div>
              <div>
                <p class="text-sm text-gray-500 flex flex-col items-right">
                  <span><span class="font-bold">Total de Ausencias:</span> {{ entry.absences_total }}</span>
                  <ButtonMedium text="More Details" @click="this.$router.push(`${this.$route.fullPath}/attendances/${entryIdx}`)" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { CalendarDaysIcon } from '@heroicons/vue/20/solid'
import ButtonMedium from "@/components/forms/ButtonMedium.vue";

defineProps(['feedData']);
</script>
