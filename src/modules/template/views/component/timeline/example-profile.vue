<script setup lang="ts">
import { ref } from 'vue'
import BaseSwitch from '@/components/base-switch.vue'
import { codeExample } from './example-basic'

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
    <div class="flex flex-col gap-4">
      <!-- basic -->
      <div class="mb-5">
        <p class="mb-5 text-base font-bold text-slate-900">Today</p>
        <div class="sm:flex space-x-4">
          <div
            class="relative z-[2] before:content-empty mx-auto mb-5 before:absolute before:left-1/2 before:top-12 sm:mb-0 before:hidden before:h-auto before:w-0 before:border-l-2 before:border-[#ebedf2] before:-bottom-[15px] before:-z-[1] ltr:sm:mr-8 rtl:sm:ml-8 sm:before:block before:-translate-x-1/2 dark:before:border-[#191e3a]"
          >
            <img
              src="https://via.placeholder.com/150"
              alt=""
              class="mx-auto h-12 w-12 rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]"
            />
          </div>
          <div class="flex-1">
            <h4 class="text-xl font-bold text-primary sm:text-left">Laurie Fox</h4>
            <p class="sm:text-left">5 sec</p>
            <div class="mb-16 mt-4 sm:mt-7">
              <div class="flex items-center gap-2">
                <i class="i-fas-book block"></i>
                <h6 class="inline-block text-lg font-bold">Trending Style</h6>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
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
