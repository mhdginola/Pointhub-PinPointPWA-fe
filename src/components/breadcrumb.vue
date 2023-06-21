<script lang="ts">
interface Breadcrumb {
  name: string
  path?: string
}
</script>

<script setup lang="ts">
const props = defineProps<{
  breadcrumbs: Breadcrumb[]
}>()
</script>

<template>
  <ul class="breadcrumb-list">
    <li v-for="(breadcrumb, index) in props.breadcrumbs" :key="index" class="breadcrumb-item">
      <router-link
        v-if="breadcrumb.path"
        :class="{ 'breadcrumb-active-text': breadcrumb.path }"
        :to="breadcrumb.path"
      >
        {{ breadcrumb.name }}
      </router-link>
      <span v-else>{{ breadcrumb.name }}</span>
      <i
        v-if="index + 1 < props.breadcrumbs.length"
        class="block i-fas-angle-right breadcrumb-separator"
      ></i>
    </li>
  </ul>
</template>
