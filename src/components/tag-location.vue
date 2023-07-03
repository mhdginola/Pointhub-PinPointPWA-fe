<script lang="ts">
export const tagLocations = reactive<string[]>(['Rumah', 'Kantor', 'Kantor 2'])
</script>
<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import type { SizeType } from './base-modal.vue'
import BaseModal from './base-modal.vue'
import BaseInput from './base-input.vue'

const tagModel = reactive({
  show: false,
  inputModel: ''
})

interface modalInterface {
  show: boolean
  title: string
  content: string
  size: SizeType
  className?: string
}
const modalRef = reactive<modalInterface>({
  show: false,
  title: '',
  content: '',
  size: 'md',
  className: ''
})
const openModal = (model: modalInterface) => {
  modalRef.show = true
  modalRef.title = model.title
  modalRef.content = model.content
  modalRef.size = model.size
  modalRef.className = model.className
}

const newTagLocation = () => {
  tagLocations.push(tagModel.inputModel)
  tagModel.inputModel = ''
  tagModel.show = false
  openModal({
    show: true,
    title: 'Success',
    content: `Create tag location Success`,
    size: 'md',
    className: 'modal-create-tag-location-success'
  })
}

const props = withDefaults(
  defineProps<{
    modelValue: string
  }>(),
  {
    modelValue: tagLocations[0]
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const value = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  }
})
onMounted(() => {
  value.value = tagLocations[0]
})
</script>

<template>
  <div class="flex flex-col">
    <span class="font-bold lg:text-4xl text-2xl mb-3">Tag Location</span>
    <div class="p-2 rounded-5 border-secondary border-1 flex flex-col">
      <label class="text-blue" v-for="tag in tagLocations">
        <input type="radio" class="border-blue mt-1" v-model="value" :value="tag" name="tag" />
        {{ tag }}
      </label>

      <button
        class="bg-blue text-center p-2 text-white capitalize rounded-5 capitalize mt-3 add-tagLocation"
        @click.prevent="tagModel.show = true"
      >
        new tag
      </button>
    </div>
  </div>

  <Teleport to="body">
    <component :is="BaseModal" :is-open="tagModel.show" @on-close="tagModel.show = false" size="md">
      <template #content>
        <div class="max-h-90vh overflow-auto p-4 modal-add-tagLocation">
          <h2 class="py-4 text-2xl font-bold">New Tag</h2>
          <form class="space-y-8 action-form-tagLocation" @submit.prevent="newTagLocation">
            <BaseInput
              mode="bordered"
              type="text"
              placeholder="Tag"
              class="my-2 rounded"
              v-model="tagModel.inputModel"
              required
            />
            <button class="btn btn-primary btn-block mt-3" type="submit">Save</button>
          </form>
        </div>
      </template>
    </component>
  </Teleport>
</template>
