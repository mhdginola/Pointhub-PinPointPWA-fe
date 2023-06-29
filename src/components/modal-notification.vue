<script setup lang="ts">
import { computed } from 'vue'
import type { SizeType } from './base-modal.vue'
import BaseModal from './base-modal.vue'

export interface Props {
  show: boolean
  title: string
  content: string
  size: SizeType
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  title: '',
  content: '',
  size: 'md',
  className: ''
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()
const value = computed({
  set: (text: boolean) => {
    emit('update:show', text)
  },
  get: () => props.show
})
</script>

<template>
  <Teleport to="body">
    <component
      :is="BaseModal"
      :is-open="value"
      @on-close="value = false"
      :size="props.size"
      :class="props.className"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4">
          <h2 class="py-4 text-2xl font-bold" v-html="props.title"></h2>
          <div class="space-y-8">
            {{ props.content }}
            <button class="btn btn-primary btn-block mt-3" @click="value = false">Close</button>
          </div>
        </div>
      </template>
    </component>
  </Teleport>
</template>
