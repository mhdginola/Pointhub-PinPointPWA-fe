<script setup lang="ts">
import { useAttendanceStore } from '@/stores/attendance'
import moment from 'moment'
const attendance = useAttendanceStore()
</script>

<template>
  <span class="font-bold lg:text-4xl text-2xl mb-3">Photo</span>
  <div
    class="bg-slate-300/20 rounded-5 h-lg flex justify-center items-center"
    id="activity"
    v-if="attendance.$state.attendances.length < 1"
  >
    <h1 class="text-3xl bold">No Activity</h1>
  </div>
  <!-- data -->
  <div
    class="flex flex-col mb-5"
    id="activity"
    v-else
    v-for="item in attendance.$state.attendances"
  >
    <div class="flex flex-col lg:flex-row w-full">
      <div class="lg:w-[70%] w-full">
        <div class="flex flex-col w-full">
          <!-- photo -->
          <div class="bg-slate-300/20 rounded-5 h-80 flex justify-center items-center">
            <img :src="item.photo" class="rounded-5 w-full h-full" />
          </div>
        </div>
      </div>
      <div class="lg:w-[30%] w-full">
        <div class="flex flex-col w-full lg:px-5 lg:mt-0 mt-3 h-full">
          <!-- location -->
          <div class="flex flex-col">
            <span class="font-bold lg:text-4xl text-2xl mb-3">Location</span>
            <span class="lg:text-xl text-lg" v-text="item.location"></span>
          </div>
          <!-- tag & time -->
          <div class="flex lg:flex-col flex-row justify-between lg:my-a mt-5">
            <div class="flex flex-col">
              <span class="font-bold lg:text-4xl text-2xl">Tag Location</span>
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
    <hr class="border-secondary border-1 w-full mt-5" />
  </div>
</template>
