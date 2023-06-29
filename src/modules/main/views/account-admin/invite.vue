<script setup lang="ts">
import { useAccountStore, type user } from '@/stores/account'
import baseInput from '@/components/base-input.vue'
import baseModal from '@/components/base-modal.vue'
import baseSelect from '@/components/base-select.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { TypesEnum, useBaseNotification } from '@/composable/notification'

const account = useAccountStore()
const { notification } = useBaseNotification()
interface notifInterface {
  type: TypesEnum
  title: string
  text: string
}
const openNotif = (model: notifInterface) => {
  notification(model.title, model.text, { type: model.type })
}
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
const deleteModel = reactive({
  show: false,
  email: ''
})

onMounted(() => {
  account.mockUser()
})

const inviteUser = () => {
  account.inviteUser({
    email: inviteModel.email,
    name: inviteModel.name,
    role: tempRole.value?.label,
    id: inviteModel.id
  })
  openNotif({
    title: 'Success',
    text: 'Invite Success',
    type: TypesEnum.Success
  })
  inviteModel.show = false
}

const deleteInvited = () => {
  account.deleteUser(deleteModel.email)
  openNotif({
    title: 'Success',
    text: 'Delete Success',
    type: TypesEnum.Success
  })
  deleteModel.show = false
}

const clear = () => {
  inviteModel.email = ''
  inviteModel.id = 0
  inviteModel.name = ''
  inviteModel.role = 'user'
}
</script>

<template>
  <div class="flex flex-col w-full gap-2 overflow-y-auto">
    <div class="bg-slate-300/20 p-5 rounded-5 mt-5">
      <div class="flex lg:flex-row flex-col justify-between items-center gap-2">
        <component :is="baseInput" v-model="filterUser" label="Search" mode="bordered" />
        <button
          class="bg-blue text-center py-2 px-10 text-white capitalize rounded-5 capitalize flex flex-row gap-2 button.invite-user"
          @click=";[clear(), (inviteModel.show = true)]"
        >
          invite user
          <i class="i-fad-user-plus text-2xl text-white"></i>
        </button>
      </div>
      <table class="w-full mt-5 table-fixed border-secondary border-1">
        <thead class="bg-blue p-5">
          <th>#</th>
          <th>Name</th>
          <th>Role</th>
          <th>Action</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredUser">
            <td class="px-2 border-se border-1 p-3">{{ index + 1 }}</td>
            <td class="px-2 border-se border-1 p-3">{{ item.name }}</td>
            <td class="px-2 border-se border-1 p-3">{{ item.role }}</td>
            <td class="px-2 border-se border-1 p-3">
              <div class="flex flex-row justify-around items-center gap-2">
                <i
                  class="i-fad-pencil cursor-pointer"
                  @click="
                    ;[
                      Object.assign(inviteModel, item),
                      (inviteModel.show = true),
                      (tempRole.label = item.role ?? '')
                    ]
                  "
                ></i>
                <i
                  class="i-fad-circle-xmark cursor-pointer button.remove-user"
                  @click=";[(deleteModel.show = true), (deleteModel.email = item.email)]"
                ></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <Teleport to="body">
    <component
      :is="baseModal"
      :is-open="inviteModel.show"
      @on-close="inviteModel.show = false"
      size="lg"
      class="modal-invite-user"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4">
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
              required
            />
            <component
              name="email"
              :is="baseInput"
              v-model="inviteModel.email"
              label="E-Mail"
              class="w-full select-item-role"
              mode="bordered"
              required
            />
            <baseSelect
              name="role"
              placeholder="Role"
              :list="[{ label: 'admin' }, { label: 'user' }]"
              v-model="tempRole"
              border="full"
              required
            />

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
      class="modal-remove-user"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4">
          <h2 class="py-4 text-2xl font-bold">Delete User ?</h2>
          <button class="btn btn-primary btn-block mt-3 remove-user-confirm" @click="deleteInvited">
            Confirm
          </button>
        </div>
      </template>
    </component>
  </Teleport>
</template>
