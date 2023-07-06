<script setup lang="ts">
import { useAccountStore, type user } from '@/stores/account'
import baseInput from '@/components/base-input.vue'
import baseModal, { type SizeType } from '@/components/base-modal.vue'
import baseSelect from '@/components/base-select.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const account = useAccountStore()
const filterUser = ref('')
const filteredUser = computed(() => {
  return filterUser.value
    ? account.users.filter((x) => x.name.toLowerCase().includes(filterUser.value))
    : account.users
})

interface OptionsInterface {
  label: string
}
const tempRole = ref<OptionsInterface>({
  label: ''
})
interface inviteType extends user {
  show: boolean
}
const inviteModel = reactive<inviteType>({
  show: false,
  name: '',
  email: '',
  role: 'user',
  id: 0
})
const errorModel = reactive({
  name: '',
  email: '',
  role: ''
})
const deleteModel = reactive({
  show: false,
  email: ''
})

onMounted(() => {
  account.mockUser()
})

const inviteUser = () => {
  if (!inviteModel.name) {
    errorModel.name = 'This field is required'
    return
  } else {
    errorModel.name = ''
  }
  if (!inviteModel.email) {
    errorModel.email = 'This field is required'
    return
  } else {
    errorModel.email = ''
  }
  if (!tempRole.value?.label) {
    errorModel.role = 'This field is required'
    return
  } else {
    errorModel.role = ''
  }
  account.inviteUser({
    email: inviteModel.email,
    name: inviteModel.name,
    role: tempRole.value?.label,
    id: inviteModel.id
  })
  openModal({
    show: true,
    title: 'Success',
    content: 'Invite Success',
    size: 'md',
    className: inviteModel.id == 0 ? 'modal-invite-user-success' : 'modal-invite-user-edit-success'
  })
  inviteModel.show = false
}

const deleteInvited = () => {
  account.deleteUser(deleteModel.email)
  openModal({
    show: true,
    title: 'Success',
    content: 'Delete Success',
    size: 'md',
    className: 'modal-invite-user-edit-success'
  })
  deleteModel.show = false
}

const clear = () => {
  inviteModel.email = ''
  inviteModel.id = 0
  inviteModel.name = ''
  inviteModel.role = 'user'
}

// route as modal
const openGroups = () => {
  router.push({
    name: 'groups'
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
  <div class="bg-slate-300/20 p-5 rounded-5">
    <div class="flex flex-row justify-between items-center gap-2 mb-3">
      <button
        class="hover:border-1 hover:border-slate-200/20 border-1 border-transparent text-center py-2 px-2 text-white capitalize rounded-5 capitalize flex flex-row gap-2 show-group"
        @click="openGroups"
      >
        KB-Sidoarjo
        <i class="i-fad-chevron-down text-2xl text-white"></i>
      </button>
      <button
        class="hover:border-1 hover:border-slate-200/20 border-1 border-transparent text-center py-2 px-2 text-white capitalize rounded-5 capitalize flex flex-row gap-2 invite-user"
        @click=";[clear(), (inviteModel.show = true)]"
      >
        invite user
        <i class="i-fad-user-plus text-2xl text-white"></i>
      </button>
    </div>

    <component
      :is="baseInput"
      v-model="filterUser"
      label="Member"
      mode="bordered"
      placeholder="Search"
    />
    <table class="w-full mt-5 table-fixed">
      <thead class="p-5 text-left border-b-slate border-b-1">
        <th class="px-2 py-3 text-xl">Name</th>
        <th class="px-2 py-3 text-xl">Role</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="item in filteredUser">
          <td class="px-2 py-3 capitalize">
            <span class="p-3 block flex flex-col">
              {{ item.name }}
              <small>{{ item.email }}</small>
            </span>
          </td>
          <td class="px-2 py-3 capitalize">
            <span class="p-3 block h-full">
              {{ item.role }}
            </span>
          </td>
          <td class="px-2 py-3">
            <div class="flex flex-row justify-center items-center gap-2">
              <button
                class="flex flex-col justify-center items-center w-22 capitalize px-3 py-1 border-1 border-slate-200/20 rounded edit-user"
                @click="
                  ;[
                    Object.assign(inviteModel, item),
                    (inviteModel.show = true),
                    (tempRole.label = item.role ?? '')
                  ]
                "
              >
                <i class="i-fad-pencil cursor-pointer"></i>
                <small>edit</small>
              </button>
              <button
                class="flex flex-col justify-center items-center w-22 capitalize px-3 py-1 border-1 border-slate-200/20 rounded remove-user"
                @click=";[(deleteModel.show = true), (deleteModel.email = item.email)]"
              >
                <i class="i-fad-circle-xmark cursor-pointer"></i>
                <small>remove</small>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Teleport to="body">
    <component
      :is="baseModal"
      :is-open="inviteModel.show"
      @on-close="inviteModel.show = false"
      size="lg"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4 modal-invite-user">
          <h2 class="py-4 text-2xl font-bold">
            {{ inviteModel.id == 0 ? 'Invite User' : 'Update User' }}
          </h2>
          <form class="space-y-8 flex flex-col invite-user" @submit.prevent="inviteUser">
            <component
              name="name"
              :is="baseInput"
              v-model="inviteModel.name"
              label="Name"
              class="w-full"
              mode="bordered"
              :error="errorModel.name"
              :disabled="inviteModel.id != 0"
            />
            <component
              name="email"
              :is="baseInput"
              v-model="inviteModel.email"
              label="E-Mail"
              class="w-full"
              mode="bordered"
              :error="errorModel.email"
              :disabled="inviteModel.id != 0"
            />
            <baseSelect
              name="role"
              placeholder="Role"
              :list="[{ label: 'admin' }, { label: 'user' }]"
              v-model="tempRole"
              border="full"
              class="select-item-role"
            />
            <small class="text-danger" v-if="errorModel.role">{{ errorModel.role }}</small>

            <button class="btn btn-primary btn-block mt-3" type="submit">
              {{ inviteModel.id == 0 ? 'Save' : 'Update' }}
            </button>
            <button
              class="btn bg-transparent border-1 border-secondary btn-block mt-3"
              type="button"
              @click="inviteModel.show = false"
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
        <div class="max-h-90vh overflow-auto p-4 modal-remove-user">
          <h2 class="py-4 text-2xl font-bold">Delete User ?</h2>
          <button class="btn btn-primary btn-block mt-3 remove-user-confirm" @click="deleteInvited">
            Confirm
          </button>
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
