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
    <div class="flex gap-4">
      <label
        class="btn bg-slate-150 font-medium text-slate-800 active:bg-slate-200/80 dark:bg-slate-500 focus:bg-slate-200 hover:bg-slate-200 dark:text-slate-50 dark:active:bg-slate-400/90 dark:focus:bg-slate-400 dark:hover:bg-slate-400"
      >
        <input
          tabindex="-1"
          type="file"
          class="pointer-events-none absolute inset-0 h-full w-full opacity-0"
        />
        <div class="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span>Choose File</span>
        </div>
      </label>
      <label
        class="btn dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 relative bg-primary font-medium text-white active:bg-primary-focus/90 focus:bg-primary-focus hover:bg-primary-focus"
      >
        <input
          tabindex="-1"
          type="file"
          class="pointer-events-none absolute inset-0 h-full w-full opacity-0"
        />
        <div class="flex items-center space-x-2">
          <i class="fa-solid fa-cloud-arrow-up text-base"></i>
          <span>Choose File</span>
        </div>
      </label>
      <label
        class="btn hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 border border-slate-300 font-medium text-slate-600 dark:border-slate-400 dark:text-slate-100 dark:active:bg-slate-500/90 dark:focus:bg-slate-500 dark:hover:bg-slate-500"
      >
        <input
          tabindex="-1"
          type="file"
          class="pointer-events-none absolute inset-0 h-full w-full opacity-0"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </label>
      <label
        class="btn h-9 w-9 rounded-full bg-info p-0 font-medium text-white active:bg-info-focus/90 focus:bg-info-focus hover:bg-info-focus hover:shadow-info/50 hover:shadow-lg"
      >
        <input
          tabindex="-1"
          type="file"
          class="pointer-events-none absolute inset-0 h-full w-full opacity-0"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      </label>
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
