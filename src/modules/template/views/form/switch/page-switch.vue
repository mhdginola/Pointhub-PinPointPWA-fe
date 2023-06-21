<script setup lang="ts">
import BaseBreadcrumb from '@/components/base-breadcrumb.vue'
import BaseDivider from '@/components/base-divider.vue'
import ExampleBasic from './example-basic.vue'
import ExampleLabel from './example-label.vue'
import ExampleSize from './example-size.vue'
import ExampleDisabled from './example-disabled.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Switch</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Element', path: '/template/element' },
          { name: 'Switch' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <component :is="ExampleBasic" />
      <component :is="ExampleLabel" />
      <component :is="ExampleSize" />
      <component :is="ExampleDisabled" />
    </div>
  </div>
</template>
