<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    required?: boolean
    label?: string
    theme?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
  }>(),
  {
    theme: 'primary'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const value = computed({
  set: (text: boolean) => {
    emit('update:modelValue', text)
  },
  get: () => props.modelValue
})
</script>

<template>
  <label class="inline-flex cursor-pointer items-center space-x-2">
    <input
      v-model="value"
      :required="required"
      class="form-checkbox h-5 w-5 rounded"
      :class="{
        'checked:border-primary checked:bg-primary border-primary': props.theme === 'primary',
        'checked:border-secondary checked:bg-secondary border-secondary':
          props.theme === 'secondary',
        'checked:border-info checked:bg-info border-info': props.theme === 'info',
        'checked:border-success checked:bg-success border-success': props.theme === 'success',
        'checked:border-warning checked:bg-warning border-warning': props.theme === 'warning',
        'checked:border-danger checked:bg-danger border-danger': props.theme === 'danger'
      }"
      type="checkbox"
    />
    <p v-if="label">{{ label }}</p>
  </label>
</template>

<style lang="postcss" scoped>
.form-checkbox {
  @apply before:ease-in-out appearance-none;
  @apply inline-block ease-out before:absolute before:inset-0 before:h-full;
  @apply inline-block border ease-out before:absolute before:inset-0 before:h-full;
  @apply bg-origin-border before:bg-center before:bg-no-repeat before:[background-size:100%_100%];
}

.form-checkbox:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}
</style>
