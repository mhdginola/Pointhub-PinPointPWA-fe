<script setup lang="ts">
import BaseBreadcrumb from '@/components/base-breadcrumb.vue'
import BaseDivider from '@/components/base-divider.vue'
import ExampleCreditCard from './example-credit-card.vue'
import ExampleNumeral from './example-numeral.vue'
import ExampleDate from './example-date.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Input Mask</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[
          { name: 'Template', path: '/template' },
          { name: 'Element', path: '/template/element' },
          { name: 'Input Mask' }
        ]"
      />
    </div>
    <div class="main-content-body">
      <component :is="ExampleCreditCard" />
      <component :is="ExampleNumeral" />
      <component :is="ExampleDate" />
    </div>
  </div>
</template>
