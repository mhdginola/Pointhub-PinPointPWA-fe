<script setup lang="ts">
import { type attendanceState } from '@/stores/attendance'
import moment from 'moment'
import type { Ref } from 'vue'

const props = defineProps<{
  attendances: attendanceState[]
}>()
</script>

<template>
  <span class="font-bold lg:text-4xl text-2xl mb-3" v-if="props.attendances.length > 0"
    >List Attendances</span
  >
  <div
    class="bg-slate-300/20 rounded-5 h-lg flex justify-center items-center"
    id="activity"
    v-if="props.attendances.length < 1"
  >
    <h1 class="text-3xl bold">No Activity</h1>
  </div>
  <!-- data -->
  <div
    class="flex flex-col mb-5 dark:bg-slate-300/20 bg-slate-200 rounded-5 p-5"
    id="activity"
    v-else
    v-for="item in props.attendances"
  >
    <div class="flex flex-col w-full gap-5">
      <div class="flex flex-row items-center gap-2">
        <span class="font-bold lg:text-3xl text-2xl">{{ item.name }}</span>
        <span> &#x2022; </span>
        <div class="flex flex-row gap-2">
          <small class="lg:text-lg text-md" v-text="moment(item.timestamp).format('DD-MMM-YYYY')" />
          <small class="lg:text-lg text-md" v-text="moment(item.timestamp).format('HH:mm:ss')" />
          <small class="lg:text-lg text-md" v-text="`(${moment(item.timestamp).fromNow()})`" />
        </div>
      </div>
      <div class="flex flex-col w-full gap-5">
        <!-- photo -->
        <div class="h-90 flex justify-center items-center">
          <img :src="item.photo" class="rounded-5 h-90%" />
        </div>

        <!-- location -->
        <div class="flex flex-col">
          <span class="font-bold lg:text-3xl text-2xl">Location</span>
          <span class="lg:text-lg text-sm" v-text="item.location"></span>
        </div>
        <!-- tag & time -->
        <div class="flex flex-col">
          <span class="font-bold lg:text-3xl text-2xl">Tag Location</span>
          <span class="lg:text-lg text-sm" v-text="item.tagLocation"></span>
        </div>
      </div>
    </div>
  </div>
</template>
