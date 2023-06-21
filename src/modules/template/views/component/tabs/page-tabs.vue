<script setup lang="ts">
import BaseBreadcrumb from '@/components/base-breadcrumb.vue'
import BaseDivider from '@/components/base-divider.vue'
import ExampleBasic from './example-basic.vue'
import ExampleVertical from './example-vertical.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Tabs</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Component', path: '/template/component' },
          { name: 'Tabs' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <component :is="ExampleBasic" />
      <component :is="ExampleVertical" />
    </div>
  </div>
</template>
