<script setup lang="ts">
import BaseBreadcrumb from '@/components/base-breadcrumb.vue'
import BaseDivider from '@/components/base-divider.vue'
import ExampleBasic from './example-basic.vue'
import ExampleLabel from './example-label.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Checkbox</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Element', path: '/template/element' },
          { name: 'Checkbox' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <component :is="ExampleBasic" />
      <component :is="ExampleLabel" />
    </div>
  </div>
</template>
