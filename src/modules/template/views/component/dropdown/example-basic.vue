<script setup lang="ts">
import { ref } from 'vue'
import BaseSwitch from '@/components/base-switch.vue'
import BaseDropdown from '@/components/base-dropdown.vue'
import { codeExample } from './example-basic'

const options = [
  { label: 'Add', path: '#' },
  { label: 'Edit', path: '#' }
]

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Basic</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div class="flex gap-4">
      <component :is="BaseDropdown">
        <div class="p-1">
          <div class="p-2 flex items-center gap-2">
            <i class="i-far-pen-to-square block"></i>
            <span>Edit</span>
          </div>
          <div class="p-2 flex items-center gap-2">
            <i class="i-far-copy block"></i>
            <span>Duplicate</span>
          </div>
        </div>
        <div class="p-1">
          <div class="p-2 flex items-center gap-2">
            <i class="i-far-box-archive block"></i>
            <span>Archive</span>
          </div>
          <div class="p-2 flex items-center gap-2">
            <i class="i-far-arrow-up-right-from-square block"></i>
            <span>Move</span>
          </div>
        </div>
        <div class="p-1">
          <div class="p-2 flex items-center gap-2">
            <i class="i-far-trash block"></i>
            <span>Delete</span>
          </div>
        </div>
      </component>
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
