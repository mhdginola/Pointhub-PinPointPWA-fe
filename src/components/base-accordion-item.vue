<script setup lang="ts">
import { ref, inject, type Ref, watch } from 'vue'

const alwaysOpen = inject('alwaysOpen') as Ref
const activeItemId = inject('activeItemId') as Ref

const PADDING_HEIGHT = 32

const content = ref()
const height = ref(0)
const activeState = ref(false)

watch(activeItemId, () => {
  updateHeight()
  if (height.value === 0) {
    activeState.value = false
  }
})

const updateHeight = () => {
  if (activeState.value && height.value === 0) {
    height.value = content.value.scrollHeight + PADDING_HEIGHT
  } else {
    height.value = 0
  }
}

const toggleCollapse = () => {
  activeState.value = !activeState.value
  if (alwaysOpen.value) {
    updateHeight()
    return
  }

  if (activeItemId.value !== props.itemId) {
    activeItemId.value = props.itemId
  } else {
    activeItemId.value = 0
  }
}

const props = withDefaults(
  defineProps<{
    itemId?: number
    title?: string
    content?: string
  }>(),
  { itemId: 0, title: '', content: '' }
)
</script>

<template>
  <div class="border border-slate-300 dark:border-slate-700 rounded-lg">
    <button @click="toggleCollapse()" class="btn btn-block justify-between">
      <p>{{ props.title }}</p>
      <i
        class="i-fas-angle-down transform-gpu transition-all duration-200"
        :class="{
          'rotate-180': activeState
        }"
      ></i>
    </button>
    <div
      ref="content"
      class="transform-gpu transition-all border-slate-300 dark:border-slate-700 duration-200 overflow-hidden px-4"
      :class="{
        'rounded-lg border-t py-4': activeState
      }"
      :style="{
        height: height + 'px'
      }"
    >
      <slot>
        {{ props.content }}
      </slot>
    </div>
  </div>
</template>
