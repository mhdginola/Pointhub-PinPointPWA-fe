<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import BaseModal from './base-modal.vue'
import BaseInput from './base-input.vue'
import BaseButton from '@/components/base-button.vue'
import { useGetLocationStore } from '@/stores/get-location'
import { openModalNotification } from '@/plugins/modal-notification'
import { useBaseNotification, TypesEnum } from '@/composable/notification'

const locationStore = useGetLocationStore()
const { notification } = useBaseNotification()
interface notifInterface {
  type: TypesEnum
  title: string
  text: string
}
const openNotif = (model: notifInterface) => {
  notification(model.title, model.text, { type: model.type })
}

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
const filteredTag = computed(() => {
  return tagModel.searchModel
    ? locationStore.tagLocations.filter((x) =>
        x.name.toLowerCase().includes(tagModel.searchModel.toLowerCase())
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
const newTagLocation = async () => {
  if (!tagModel.createModel) {
    openNotif({
      title: 'Error',
      text: 'Tag Location Empty',
      type: TypesEnum.Danger
    })
  }
  await locationStore.createTagLocation({
    name: tagModel.createModel,
    latitude: locationStore.latitude,
    longitude: locationStore.longitude
  })
  tagModel.createModel = ''
  tagModel.showCreate = false
  openModalNotification({
    show: true,
    title: 'Success',
    content: `Create tag location Success`,
    size: 'md',
    className: 'modal-create-tag-location-success'
  })
}

const deleteTagLocation = async (id: string) => {
  await locationStore.deleteTagLocation(id)
}

onMounted(async () => {
  await locationStore.fetchTagLocations()
})
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
            class="block p2 border-1 border-slate hover:brightness-90 bg-white dark:bg-slate-9 cursor-pointer flex justify-between items-center"
            @click="selectTagLocation(tag.name)"
          >
            {{ tag.name }}
            <i
              @click="deleteTagLocation(tag._id?.toString() as string)"
              class="i-fas-xmark block text-danger hover:dark-bg-white hover:bg-slate-6 rounded-10"
            ></i>
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
          <BaseButton
            class="bg-blue w-full"
            type="button"
            @click.prevent="newTagLocation"
            :disabled="!tagModel.createModel"
          >
            Save
          </BaseButton>
        </form>
      </div>
    </template>
  </component>
</template>
