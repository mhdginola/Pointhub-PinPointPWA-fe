<script setup lang="ts">
import { type attendanceState } from '@/stores/attendance'
import { useGetLocationStore } from '@/stores/get-location'
import { watch } from 'vue'

const location = useGetLocationStore()

interface optional {
  locationName?: string
}
type propsType = attendanceState & optional
const props = defineProps<{
  attendances: propsType[]
}>()

watch(
  () => props.attendances,
  (val) => {
    val.map(async (att) => {
      att.locationName = await location.getLocationName(att.location[0], att.location[1])
    })
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<template>
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
      <div class="flex flex-col justify-start items-start gap-2">
        <span class="font-bold lg:text-3xl text-2xl">{{ item.email }}</span>
        <!-- <div class="flex flex-row gap-2">
          <small class="lg:text-lg text-md" v-text="moment(item.timestamp).format('DD-MMM-YYYY')" />
          <small class="lg:text-lg text-md" v-text="moment(item.timestamp).format('HH:mm:ss')" />
          <small class="lg:text-lg text-md" v-text="`(${moment(item.timestamp).fromNow()})`" />
        </div> -->
      </div>
      <div class="flex flex-col w-full gap-5">
        <!-- photo -->
        <div class="h-90 flex justify-center items-center">
          <img :src="item.photo" class="rounded-5 h-90%" />
        </div>

        <!-- location -->
        <div class="flex flex-col">
          <span class="font-bold lg:text-3xl text-2xl">Location</span>
          <span class="lg:text-lg text-sm" v-text="item.locationName"></span>
        </div>
        <!-- tag & time -->
        <!-- <div class="flex flex-col">
          <span class="font-bold lg:text-3xl text-2xl">Tag Location</span>
          <span class="lg:text-lg text-sm" v-text="item.tagLocation"></span>
        </div> -->
      </div>
    </div>
  </div>
</template>
