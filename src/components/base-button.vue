<template>
  <button
    class="hover:brightness-90 active:brightness-80 text-center py-2 px-7 capitalize rounded my-2 font-bold text-white"
    :class="`${className}`"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    className?: string
  }>(),
  {}
)
</script>
