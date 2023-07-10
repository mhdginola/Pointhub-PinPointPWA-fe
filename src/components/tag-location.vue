<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import type { SizeType } from './base-modal.vue'
import BaseModal from './base-modal.vue'
import BaseInput from './base-input.vue'
import BaseButton from '@/components/base-button.vue'
import { useGetLocationStore } from '@/stores/get-location'

const locationStore = useGetLocationStore()
const props = withDefaults(
  defineProps<{
    modelValue: string
  }>(),
  {
    modelValue: ''
  }
)
const tagModel = reactive({
  showCreate: false,
  showList: false,
  searchModel: '',
  createModel: ''
})
const refCreateModel = ref()
const filteredTag = computed(() => {
  return tagModel.searchModel
    ? locationStore.tagLocations.filter((x) =>
        x.toLowerCase().includes(tagModel.searchModel.toLowerCase())
      )
    : locationStore.tagLocations
})

const selectTagLocation = (tag: string) => {
  value.value = tag
  tagModel.showList = false
}

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
const newTagLocation = () => {
  locationStore.addTagLocation(tagModel.createModel)
  tagModel.createModel = ''
  tagModel.showCreate = false
  openModal({
    show: true,
    title: 'Success',
    content: `Create tag location Success`,
    size: 'md',
    className: 'modal-create-tag-location-success'
  })
}

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
</script>

<template>
  <div class="flex flex-col">
    <div class="mb-3 flex flex-row justify-between">
      <span class="font-bold lg:text-4xl text-2xl">Tag Location</span>
    </div>
    <BaseInput
      mode="bordered"
      type="text"
      placeholder="Tag"
      class="my-2 rounded"
      v-model="value"
      disabled
      @click="tagModel.showList = true"
    />
  </div>

  <!-- list -->
  <component
    :is="BaseModal"
    :is-open="tagModel.showList"
    @on-close="tagModel.showList = false"
    size="lg"
  >
    <template #content>
      <div class="h-75vh p-6 modal-add-tagLocation">
        <div class="mb-3 flex flex-row justify-between">
          <h2 class="py-4 text-2xl font-bold">Location Tag</h2>
          <BaseButton
            class-name="bg-secondary"
            @click.prevent=";[(tagModel.showCreate = true), (tagModel.showList = false)]"
            >New Tag</BaseButton
          >
        </div>
        <BaseInput
          mode="bordered"
          type="text"
          placeholder="Search Tag"
          class="my-2 rounded"
          v-model="tagModel.searchModel"
          required
        />
        <div class="max-h-[75%] overflow-auto">
          <div
            v-for="tag in filteredTag"
            class="block p2 border-1 border-slate hover:brightness-90 bg-white dark:bg-slate-9 cursor-pointer"
            @click="selectTagLocation(tag)"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </template>
  </component>

  <!-- new -->
  <component
    :is="BaseModal"
    :is-open="tagModel.showCreate"
    @on-close=";[(tagModel.showCreate = false), (tagModel.showList = true)]"
    size="md"
  >
    <template #content>
      <div class="max-h-90vh overflow-auto p-4 modal-add-tagLocation">
        <h2 class="py-4 text-2xl font-bold">New Tag</h2>
        <form class="space-y-8 action-form-tagLocation">
          <BaseInput
            mode="bordered"
            type="text"
            placeholder="New Tag"
            class="my-2 rounded"
            v-model="tagModel.createModel"
            required
          />
          <BaseButton class="bg-blue w-full" type="button" @click.prevent="newTagLocation">
            Save
          </BaseButton>
        </form>
      </div>
    </template>
  </component>
</template>
