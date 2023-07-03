<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
import baseInput from '@/components/base-input.vue'
import baseModal, { type SizeType } from '@/components/base-modal.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import index from './index.vue'
import { useRouter } from 'vue-router'

const account = useAccountStore()
const router = useRouter()
const filterGroup = ref('')
const filteredGroup = computed(() => {
  return filterGroup.value
    ? account.groups.filter((x) => x.toLowerCase().includes(filterGroup.value))
    : account.groups
})

const baseModalShow = ref(true)
const groupModel = reactive({
  show: false,
  group: '',
  oldName: ''
})
const deleteModel = reactive({
  show: false,
  group: '',
  password: ''
})
const errorModel = reactive({
  group: '',
  password: ''
})

onMounted(() => {
  account.mockGroup()
})

const createGroup = () => {
  if (!groupModel.group) {
    errorModel.group = 'This field is required'
    return
  } else {
    errorModel.group = ''
  }
  account.createGroup(groupModel.group, groupModel.oldName)
  openModal({
    show: true,
    title: 'Success',
    content: groupModel.oldName == '' ? 'Create Group Success' : 'Edit Group Success',
    size: 'md',
    className: groupModel.oldName == '' ? 'modal-create-group-success' : 'modal-edit-group-success'
  })
  groupModel.show = false
}

const deleteGroup = () => {
  if (!deleteModel.password) {
    errorModel.password = 'This field is required'
    return
  } else {
    errorModel.password = ''
  }
  account.deleteGroup(deleteModel.group)
  openModal({
    show: true,
    title: 'Success',
    content: 'Delete Group Success',
    size: 'md',
    className: 'modal-delete-group-success'
  })
  deleteModel.show = false
}

const clear = () => {
  groupModel.group = ''
  groupModel.oldName = ''
}

const closeGroup = () => {
  baseModalShow.value = false
  router.push({
    name: 'invite'
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
  <!-- base when close modal -->
  <component :is="index"></component>

  <Teleport to="body">
    <!-- main page -->
    <component :is="baseModal" :is-open="baseModalShow" @on-close="closeGroup" size="lg">
      <template #content>
        <div class="bg-slate-300/20 p-5 rounded-5 modal-show-group">
          <h2 class="text-2xl font-bold">Choose Group</h2>
          <hr class="border-1 border-slate-200/20 my-1" />
          <div class="text-center">
            Please choose your group below or <br />
            <button
              class="text-blue cursor-pointer create-group"
              @click=";[clear(), (groupModel.show = true)]"
            >
              create a new one
            </button>
          </div>
          <component
            :is="baseInput"
            v-model="filterGroup"
            label="Search"
            mode="bordered"
            placeholder="Search"
          />
          <div class="w-full mt-5 flex flex-col gap-3">
            <div
              v-for="item in filteredGroup"
              class="justify-between items-center flex flex-row shadow shadow-lg shadow-slate-300/20 p-3 rounded-md block"
            >
              <span>{{ item }}</span>
              <div class="flex flex-row gap-2">
                <button
                  class="cursor-pointer edit-group text-center p-2 text-white capitalize flex flex-row"
                  @click="
                    ;[
                      (groupModel.group = item),
                      (groupModel.oldName = item),
                      (groupModel.show = true)
                    ]
                  "
                >
                  <i class="i-fad-pencil"></i>
                </button>
                <button
                  class="cursor-pointer delete-group text-center p-2 text-white capitalize flex flex-row"
                  @click=";[(deleteModel.show = true), (deleteModel.group = item)]"
                >
                  <i class="i-fad-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </component>

    <component
      :is="baseModal"
      :is-open="groupModel.show"
      @on-close="groupModel.show = false"
      size="lg"
    >
      <template #content>
        <div
          class="max-h-90vh overflow-auto p-4"
          :class="groupModel.oldName == '' ? 'modal-create-group' : 'modal-edit-group'"
        >
          <h2 class="py-4 text-2xl font-bold">
            {{ groupModel.oldName == '' ? 'Create Group' : 'Update Group' }}
          </h2>
          <form
            class="space-y-8 flex flex-col"
            :class="groupModel.oldName == '' ? 'add-group' : 'edit-group'"
            @submit.prevent="createGroup"
          >
            <component
              name="name"
              :is="baseInput"
              v-model="groupModel.group"
              label="Name"
              class="w-full"
              mode="bordered"
              :error="errorModel.group"
            />

            <button class="btn btn-primary btn-block mt-3" type="submit">
              {{ groupModel.oldName == '' ? 'Create' : 'Update' }}
            </button>
            <button
              class="btn bg-transparent border-1 border-secondary btn-block mt-3"
              type="button"
              @click="groupModel.show = false"
            >
              Cancel
            </button>
          </form>
        </div>
      </template>
    </component>

    <component
      :is="baseModal"
      :is-open="deleteModel.show"
      @on-close="deleteModel.show = false"
      size="lg"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4 modal-delete-group">
          <h2 class="py-4 text-2xl font-bold">Delete Group ?</h2>
          <form class="space-y-8 flex flex-col delete-group" @submit.prevent="deleteGroup">
            <component
              name="password"
              :is="baseInput"
              v-model="deleteModel.password"
              label="Type Password"
              class="w-full"
              mode="bordered"
              type="password"
              :error="errorModel.password"
            />
            <button class="btn btn-primary btn-block mt-3" type="submit">Confirm</button>
          </form>
        </div>
      </template>
    </component>

    <!-- modal notif -->
    <component
      :is="baseModal"
      :is-open="modalRef.show"
      @on-close="modalRef.show = false"
      :size="modalRef.size"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4" :class="modalRef.className">
          <h2 class="py-4 text-2xl font-bold" v-html="modalRef.title"></h2>
          <div class="space-y-8">
            {{ modalRef.content }}
            <button class="btn btn-primary btn-block mt-3" @click="modalRef.show = false">
              Close
            </button>
          </div>
        </div>
      </template>
    </component>
  </Teleport>
</template>
