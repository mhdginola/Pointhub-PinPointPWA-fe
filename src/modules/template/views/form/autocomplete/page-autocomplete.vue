<script setup lang="ts">
import BaseBreadcrumb from '@/components/base-breadcrumb.vue'
import BaseDivider from '@/components/base-divider.vue'
import ExampleBordered from './example-bordered.vue'
import ExampleBorderless from './example-borderless.vue'
import ExampleSimple from './example-simple.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Select</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Form', path: '/template/form' },
          { name: 'Select' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <component :is="ExampleSimple" />
      <component :is="ExampleBordered" />
      <component :is="ExampleBorderless" />
    </div>
  </div>
</template>
