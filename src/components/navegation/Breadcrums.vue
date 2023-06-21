<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center space-x-4">
      <li>
        <div>
          <RouterLink to="/" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </RouterLink>
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          <a :href="store.currentNavOption.href" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" :aria-current="store.currentNavOption.name ? 'page' : undefined">{{ store.currentNavOption.name }}</a>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/20/solid'
import {useAppStore} from "@/stores/app";

const store = useAppStore();

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
]
</script>
