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
    <span class="font-bold lg:text-3xl text-2xl my-3 underline-1 underline">
      {{ item.name }}
    </span>
    <div class="flex flex-col lg:flex-row w-full">
      <div class="lg:w-[70%] w-full">
        <div class="flex flex-col w-full">
          <!-- photo -->
          <div class="h-90 flex justify-center items-center">
            <img :src="item.photo" class="rounded-5 h-90%" />
          </div>
        </div>
      </div>
      <div class="lg:w-[30%] w-full">
        <div class="flex flex-col w-full lg:px-5 lg:mt-0 mt-3 h-full">
          <!-- location -->
          <div class="flex flex-col">
            <span class="font-bold lg:text-3xl text-2xl mb-3">Location</span>
            <span class="lg:text-xl text-lg" v-text="item.location"></span>
          </div>
          <!-- tag & time -->
          <div class="flex lg:flex-col flex-row justify-between lg:my-a mt-5">
            <div class="flex flex-col">
              <span class="font-bold lg:text-3xl text-2xl">Tag Location</span>
              <span class="lg:text-xl text-lg" v-text="item.tagLocation"></span>
            </div>
            <div class="flex flex-col">
              <small
                class="lg:text-lg text-md"
                v-text="moment(item.timestamp).format('DD-MMM-YYYY')"
              ></small>
              <small
                class="lg:text-lg text-md"
                v-text="moment(item.timestamp).format('HH:mm:ss')"
              ></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
