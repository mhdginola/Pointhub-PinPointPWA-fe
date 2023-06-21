<script setup lang="ts">
import BaseBreadcrumb from '@/components/base-breadcrumb.vue'
import BaseDivider from '@/components/base-divider.vue'
import ExampleDirective from './example-directive.vue'
import ExampleSlot from './example-slot.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Tooltip</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Component', path: '/template/component' },
          { name: 'Tooltip' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <component :is="ExampleDirective" />
      <component :is="ExampleSlot" />
    </div>
  </div>
</template>
