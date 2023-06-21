<script setup lang="ts">
import { computed, ref } from 'vue'
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    options: any[]
    required?: boolean
    label?: string
    theme?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
  }>(),
  {
    theme: 'primary',
    options: []
  }
)
const selected = ref(props.options[0])

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
  <RadioGroup v-model="value">
    <div class="space-y-2">
      <RadioGroupOption
        as="div"
        v-for="option in options"
        :key="option.name"
        :value="option"
        v-slot="{ active, checked }"
      >
        <slot :active="active" :checked="checked" :option="option">
          <div class="w-full cursor-pointer">
            <div
              :class="[checked ? 'bg-blue-900 text-white ' : 'bg-white text-slate-900']"
              class="border rounded p-4"
            >
              <div class="w-full flex space-x-4 items-center justify-between">
                <div class="flex items-center">
                  <div class="text-sm">{{ option }}</div>
                </div>
                <div v-show="checked" class="shrink-0 text-white">
                  <i class="block i-fas-circle-check"></i>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
