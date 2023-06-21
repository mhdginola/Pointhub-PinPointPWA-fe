<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h2>Alert</h2>
      <component
        :is="Breadcrumb"
        :breadcrumbs="[{ name: 'template' }, { name: 'element' }, { name: 'accordion' }]"
      />
    </div>
    <div class="card p-4 space-y-5">
      <div class="flex justify-between">
        <h3>Alert</h3>
        <component :is="BaseSwitch" v-model="checked" label="code" />
      </div>
      <p>...</p>
      <div
        class="card transform-gpu bg-slate-800 px-2 text-white transition-all dark:bg-slate-700"
        :class="{
          'max-h-[1000px] overflow-auto py-2': checked,
          'max-h-0 overflow-hidden': !checked
        }"
      >
        <div class="p-1 text-sm">html</div>
        <highlightjs autodetect :code="''" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import BaseSwitch from '@/components/base-switch.vue'

const checked = ref(false)
</script>
