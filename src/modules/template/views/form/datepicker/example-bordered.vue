<script setup lang="ts">
import { ref } from 'vue'
import BaseSwitch from '@/components/base-switch.vue'
import BaseDatepicker from '@/components/base-datepicker.vue'
import { codeExample } from './example-basic'

const date = ref()
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
      <component :is="BaseDatepicker" v-model="date" label="Date" mode="bordered" />
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
