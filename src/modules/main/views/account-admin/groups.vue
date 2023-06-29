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
const filterGroup = ref('')
const filteredGroup = computed(() => {
  return filterGroup.value
    ? account.groups.filter((x) => x.toLowerCase().includes(filterGroup.value))
    : account.groups
})

const groupModel = reactive({
  show: false,
  group: '',
  oldName: ''
})
const deleteModel = reactive({
  show: false,
  group: ''
})

onMounted(() => {
  account.mockGroup()
})

const inviteUser = () => {
  account.createGroup(groupModel.group, groupModel.oldName)
  openNotif({
    title: 'Success',
    text: 'Create Group Success',
    type: TypesEnum.Success
  })
  groupModel.show = false
}

const deleteGroup = () => {
  account.deleteGroup(deleteModel.group)
  openNotif({
    title: 'Success',
    text: 'Delete Group Success',
    type: TypesEnum.Success
  })
  deleteModel.show = false
}

const clear = () => {
  groupModel.group = ''
  groupModel.oldName = ''
}
</script>

<template>
  <div class="flex flex-col w-full gap-2 overflow-y-auto">
    <div class="bg-slate-300/20 p-5 rounded-5 mt-5">
      <div class="flex lg:flex-row flex-col justify-between items-center gap-2">
        <component :is="baseInput" v-model="filterGroup" label="Search" mode="bordered" />
        <button
          class="bg-blue text-center py-2 px-10 text-white capitalize rounded-5 capitalize flex flex-row gap-2 button.invite-user"
          @click=";[clear(), (groupModel.show = true)]"
        >
          add group
          <i class="i-fad-user-plus text-2xl text-white"></i>
        </button>
      </div>
      <table class="w-full mt-5 table-fixed border-secondary border-1">
        <thead class="bg-blue p-5">
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredGroup">
            <td class="px-2 border-se border-1 p-3">{{ index + 1 }}</td>
            <td class="px-2 border-se border-1 p-3">{{ item }}</td>
            <td class="px-2 border-se border-1 p-3">
              <div class="flex flex-row justify-around items-center gap-2">
                <i
                  class="i-fad-pencil cursor-pointer"
                  @click="
                    ;[
                      (groupModel.group = item),
                      (groupModel.oldName = item),
                      (groupModel.show = true)
                    ]
                  "
                ></i>
                <i
                  class="i-fad-circle-xmark cursor-pointer button.remove-user"
                  @click=";[(deleteModel.show = true), (deleteModel.group = item)]"
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
      :is-open="groupModel.show"
      @on-close="groupModel.show = false"
      size="lg"
      class="modal-invite-user"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4">
          <h2 class="py-4 text-2xl font-bold">
            {{ groupModel.oldName == '' ? 'Create Group' : 'Update Group' }}
          </h2>
          <form class="space-y-8 flex flex-col invite-user" @submit.prevent="inviteUser">
            <component
              name="name"
              :is="baseInput"
              v-model="groupModel.group"
              label="Name"
              class="w-full"
              mode="bordered"
              required
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
      class="modal-remove-user"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4">
          <h2 class="py-4 text-2xl font-bold">Delete Group ?</h2>
          <button class="btn btn-primary btn-block mt-3 remove-user-confirm" @click="deleteGroup">
            Confirm
          </button>
        </div>
      </template>
    </component>
  </Teleport>
</template>
