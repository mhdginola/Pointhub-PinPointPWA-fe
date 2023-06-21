<script setup lang="ts">
import { ref } from 'vue'
import BaseSwitch from '@/components/base-switch.vue'
import { codeExample } from './example-profile'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Basic</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>
        The accordion component allows the user to show and hide sections of related content on a
        page.
      </p>
    </div>
    <div class="flex gap-4">
      <!-- basic -->
      <div class="max-w-[900px]">
        <div class="flex">
          <p
            class="max-w-[100px] min-w-[58px] py-2.5 text-base font-semibold text-[#3b3f5c] dark:text-white"
          >
            10:00
          </p>
          <div
            class="relative after:absolute before:absolute after:left-1/2 after:top-[25px] before:left-1/2 before:top-[15px] after:h-auto after:w-0 before:h-2.5 before:w-2.5 before:border-2 after:border-l-2 after:border-primary before:border-primary after:rounded-full before:rounded-full after:content-empty before:content-empty after:-bottom-[15px] after:-translate-x-1/2 before:-translate-x-1/2"
          ></div>
          <div class="self-center p-2.5 ltr:ml-2.5 rtl:ml-2.5 rtl:ltr:mr-2.5">
            <p class="text-[13px] font-semibold text-[#3b3f5c] dark:text-white">
              Updated Server Logs
            </p>
            <p class="max-w-[100px] min-w-[100px] self-center text-xs font-bold text-white">
              25 mins ago
            </p>
          </div>
        </div>
        <div class="flex">
          <p
            class="max-w-[100px] min-w-[58px] py-2.5 text-base font-semibold text-[#3b3f5c] dark:text-white"
          >
            16:00
          </p>
          <div
            class="relative before:absolute before:left-1/2 before:top-[15px] before:h-2.5 before:w-2.5 before:border-2 before:border-info before:rounded-full before:content-empty before:-translate-x-1/2"
          ></div>
          <div class="self-center p-2.5 ltr:ml-2.5 rtl:ml-2.5 rtl:ltr:mr-2.5">
            <p class="text-[13px] font-semibold text-[#3b3f5c] dark:text-white">
              Server rebooted successfully
            </p>
            <p class="max-w-[100px] min-w-[100px] self-center text-xs font-bold text-white">
              8 hrs ago
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="card-code"
      :class="{
        'card-code-active': codeToggle,
        'card-code-inactive': !codeToggle
      }"
    >
      <div class="card-code-label">vue</div>
      <highlightjs autodetect :code="codeExample" />
    </div>
  </div>
</template>
