<script setup lang="ts">
import { ref } from 'vue'
import BaseSwitch from '@/components/base-switch.vue'
import { codeExample } from './example-basic'

const checked = ref(false)
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
      <component :is="BaseSwitch" v-model="checked" label="Small" size="sm" />
      <component :is="BaseSwitch" v-model="checked" label="Base" size="base" />
      <component :is="BaseSwitch" v-model="checked" label="Large" size="lg" />
      <component :is="BaseSwitch" v-model="checked" label="Extra Large" size="xl" />
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
