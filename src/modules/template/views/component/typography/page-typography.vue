<script setup lang="ts">
import BaseBreadcrumb from '@/components/base-breadcrumb.vue'
import BaseDivider from '@/components/base-divider.vue'
import ExampleBasic from './example-basic.vue'
import ExampleBold from './example-bold.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1 class="heading2">Typography</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Component', path: '/template/component' },
          { name: 'Typography' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <component :is="ExampleBasic" />
      <component :is="ExampleBold" />
    </div>
  </div>
</template>
