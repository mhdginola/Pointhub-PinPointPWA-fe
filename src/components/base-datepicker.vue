<script lang="ts">
interface Props {
  modelValue: string
  id?: string
  label?: string
  description?: string
  placeholder?: string
  type?: 'text' | 'tel' | 'email' | 'password' | 'date' | 'number'
  mode?: 'simple' | 'bordered'
  layout?: 'vertical' | 'horizontal'
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  helper?: string
  error?: string
  name?: string
}
</script>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, watch, computed } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  mode: 'simple',
  layout: 'vertical',
  type: 'text',
  required: false,
  readonly: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  set: (text: string) => {
    emit('update:modelValue', text)
  },
  get: () => props.modelValue
})

/**
 * HTMLInputElement.showPicker()
 *
 * This is the same picker that would normally be displayed when the element
 * is selected, but can be triggered from a button press or other user interaction.
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker
 */
const dateRef = ref()
const onClickDateRef = () => {
  dateRef.value.showPicker()
}
const nativeDate = ref()

watch(nativeDate, (newValue) => {
  value.value = dayjs(new Date(newValue)).format('DD-MM-YYYY')
})
</script>

<template>
  <div
    :class="{
      'flex items-start gap-5': props.layout === 'horizontal'
    }"
  >
    <label
      :for="id"
      v-if="label"
      class="font-bold"
      :class="{
        'flex flex-col w-30% lg:w-20%': props.layout === 'horizontal',
        'text-sm': props.layout === 'vertical'
      }"
    >
      {{ label }}
      <span v-if="props.required" class="text-xs text-slate-400">(required)</span>
      <span v-if="props.description" class="text-xs font-light text-slate-500">{{
        props.description
      }}</span>
    </label>

    <div class="flex flex-1 flex-col">
      <div class="relative">
        <input
          ref="dateRef"
          v-model="nativeDate"
          type="date"
          class="form-input absolute -z-50 invisible"
        />
        <button
          class="absolute right-0 top-1 px-4 py-2"
          @click.prevent="onClickDateRef()"
          type="button"
        >
          <i class="block i-far-calendar"></i>
        </button>
        <input
          v-model.lazy="value"
          v-cleave="{ date: true, delimiter: '-', datePattern: ['d', 'm', 'Y'] }"
          type="text"
          class="form-input"
          placeholder="DD-MM-YYYY"
          :class="{
            'border-b border-x-none border-t-none px-1': mode === 'simple',
            border: mode === 'bordered'
          }"
          :required="props.required"
          :readonly="props.readonly"
          :disabled="props.disabled"
          :name="props.name"
        />
      </div>
      <slot name="helper" v-if="helper">
        <span class="text-sm text-slate-500">{{ helper }}</span>
      </slot>
      <slot name="error" v-if="error">
        <span class="text-sm text-danger">{{ error }}</span>
      </slot>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
