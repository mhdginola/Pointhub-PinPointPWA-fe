<script setup lang="ts">
import baseInput from '@/components/base-input.vue'
import baseModal from '@/components/base-modal.vue'
import baseSelect from '@/components/base-select.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import Table from '@/components/table-component.vue'
import Row from '@/components/table-row-component.vue'
import Col from '@/components/table-col-component.vue'
import BaseButton from '@/components/base-button.vue'
import { openModalNotification } from '@/plugins/modal-notification'
import { useUserStore } from '@/stores/auth'
import { useGroupStore } from '@/stores/groups'
import { useAttendanceStore } from '@/stores/attendance'
import { useInviteStore, type invite as userType } from '@/stores/invite'

const user = useUserStore()
const invitation = useInviteStore()
const groups = useGroupStore()
const attendance = useAttendanceStore()

const filterUser = ref('')
const filteredUser = computed(() => {
  let data = filterUser.value
    ? invitation.invites.filter((x) => x.email.toLowerCase().includes(filterUser.value))
    : invitation.invites
  if (user.role == 'user') {
    data = data.filter((x) => x.email.toLowerCase() == user.username.toLowerCase())
  }

  return data
})

interface OptionsInterface {
  label: string
}
const tempRole = ref<OptionsInterface>({
  label: ''
})
interface inviteType extends userType {
  show: boolean
}
const inviteModel = reactive<inviteType>({
  show: false,
  group: '',
  email: '',
  _id: ''
})
const errorModel = reactive({
  group: '',
  email: '',
  role: ''
})
const deleteModel = reactive({
  show: false,
  email: ''
})

onMounted(async () => {
  await attendance.fetchAttendaces()
})

const inviteUser = async () => {
  if (!inviteModel.group) {
    errorModel.group = 'This field is required'
    return
  } else {
    errorModel.group = ''
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
  await invitation.createInvite(inviteModel)
  openModalNotification({
    show: true,
    title: 'Success',
    content: 'Invite Success',
    size: 'md',
    className:
      inviteModel._id == '' ? 'modal-invite-user-success' : 'modal-invite-user-edit-success'
  })
  inviteModel.show = false
}

const deleteInvited = async (id: string) => {
  await invitation.deleteInvite(id)
  openModalNotification({
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
  inviteModel._id = ''
  inviteModel.group = ''
}

// group

const filterGroup = ref('')
const filteredGroup = computed(() => {
  return filterGroup.value
    ? groups.groups.filter((x) => x.name.toLowerCase().includes(filterGroup.value))
    : groups.groups
})
const inputGroupRef = ref()
const inputPasswordRef = ref()

const groupModel = reactive({
  showBase: false,
  showCreate: false,
  name: '',
  _id: ''
})
const deleteGroupModel = reactive({
  show: false,
  _id: '',
  password: ''
})
const errorGroupModel = reactive({
  group: '',
  password: ''
})
const openGroups = async () => {
  await groups.fetchGroups()
  groupModel.showBase = true
}

const openCreateGroup = () => {
  clearGroupModel()
  groupModel.showCreate = true
  groupModel.showBase = false
}

const createGroup = async () => {
  if (!groupModel.name) {
    errorGroupModel.group = 'This field is required'
    return
  } else {
    errorGroupModel.group = ''
  }

  if (groupModel._id) {
    await groups.updateGroup({ _id: groupModel._id, name: groupModel.name })
  } else {
    await groups.createGroup(groupModel.name)
  }

  openModalNotification({
    show: true,
    title: 'Success',
    content: groupModel._id == '' ? 'Create Group Success' : 'Edit Group Success',
    size: 'md',
    className: groupModel._id == '' ? 'modal-create-group-success' : 'modal-edit-group-success'
  })
  groupModel.showCreate = false
  groupModel.showBase = true
}

const deleteGroup = async () => {
  if (!deleteGroupModel.password) {
    errorGroupModel.password = 'This field is required'
    return
  } else {
    errorGroupModel.password = ''
  }
  await groups.deleteGroup(deleteGroupModel._id)
  openModalNotification({
    show: true,
    title: 'Success',
    content: 'Delete Group Success',
    size: 'md',
    className: 'modal-delete-group-success'
  })
  deleteGroupModel.show = false
  groupModel.showBase = true
}

const clearGroupModel = () => {
  groupModel.name = ''
  groupModel._id = ''
}

const closeGroup = () => {
  groupModel.showBase = false
}
</script>

<template>
  <div class="flex flex-col flex-1">
    <span class="font-bold lg:text-5xl text-3xl mb-3 w-[fit-content]">
      Account
      <hr />
    </span>
    <div class="bg-slate-300/20 p-5 rounded-5">
      <div class="flex flex-row justify-between items-center gap-2 mb-3">
        <button
          class="hover:border-1 hover:border-slate-200/20 border-1 border-transparent text-center py-2 px-2 text-slate-500 dark:text-slate-200 capitalize rounded-5 capitalize flex flex-row gap-2 show-group"
          @click="openGroups"
        >
          KB-Sidoarjo
          <i class="i-fad-chevron-down text-2xl text-slate-500 dark:text-slate-200"></i>
        </button>
        <button
          class="hover:border-1 hover:border-slate-200/20 border-1 border-transparent text-center py-2 px-2 text-slate-500 dark:text-slate-200 capitalize rounded-5 capitalize flex flex-row gap-2 invite-user"
          @click=";[clear(), (inviteModel.show = true)]"
          v-if="user.role == 'admin'"
        >
          invite user
          <i class="i-fad-user-plus text-2xl text-slate-500 dark:text-slate-200"></i>
        </button>
      </div>

      <component
        :is="baseInput"
        v-model="filterUser"
        label="Member"
        mode="bordered"
        placeholder="Search"
      />
      <Table :cols="['Name', 'Role', 'Action']" class="mt-5">
        <template #body>
          <Row v-for="(item, index) in filteredUser" v-if="filteredUser.length > 0">
            <template #col>
              <Col>
                <span class="block flex flex-col">
                  <p class="font-bold">{{ item.email }}</p>
                  <small>{{ item.email }}</small>
                </span>
              </Col>
              <Col>
                <span class="block h-full"> - </span>
              </Col>
              <Col>
                <div class="flex flex-row justify-center items-center gap-2">
                  <template v-if="user.role == 'admin'">
                    <button
                      class="flex flex-row gap-2 justify-center items-center w-22 capitalize px-3 py-1 border-1 border-slate-200/20 rounded edit-user"
                      @click="
                        ;[
                          Object.assign(inviteModel, item),
                          (inviteModel.show = true)
                          // (tempRole.label = item.role ?? '')
                        ]
                      "
                    >
                      <i class="i-fad-pencil cursor-pointer"></i>
                      <small>edit</small>
                    </button>
                    <button
                      class="flex flex-row gap-2 justify-center items-center w-22 capitalize px-3 py-1 border-1 border-slate-200/20 rounded remove-user"
                      @click=";[(deleteModel.show = true), (deleteModel.email = item.email)]"
                    >
                      <i class="i-fad-circle-xmark cursor-pointer"></i>
                      <small>remove</small>
                    </button>
                  </template>
                  <template v-else>
                    <spa> - </spa>
                  </template>
                </div>
              </Col>
            </template>
          </Row>
          <Row v-else>
            <template #col>
              <Col colspan="5" class="text-center"> No Data</Col>
            </template>
          </Row>
        </template>
      </Table>
    </div>
  </div>

  <Teleport to="body">
    <!-- modal group -->
    <component :is="baseModal" :is-open="groupModel.showBase" @on-close="closeGroup" size="lg">
      <template #content>
        <div class="bg-slate-300/20 p-5 rounded-5 modal-show-group">
          <h2 class="text-2xl font-bold">Choose Group</h2>
          <hr class="border-1 border-slate-200/20 my-1" />
          <div class="text-center">
            Please choose your group below or <br />
            <button class="text-blue cursor-pointer create-group" @click="openCreateGroup">
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
              <span>{{ item.name }}</span>
              <div class="flex flex-row gap-2">
                <button
                  class="cursor-pointer edit-group text-center p-2 text-slate-500 dark:text-slate-200 capitalize flex flex-row"
                  @click="
                    ;[
                      (groupModel.name = item.name),
                      (groupModel._id = item._id),
                      (groupModel.showCreate = true),
                      (groupModel.showBase = false)
                    ]
                  "
                >
                  <i class="i-far-pencil"></i>
                </button>
                <button
                  class="cursor-pointer delete-group text-center p-2 text-slate-500 dark:text-slate-200 capitalize flex flex-row"
                  @click="
                    ;[
                      (deleteGroupModel.show = true),
                      (deleteGroupModel._id = item._id),
                      (groupModel.showBase = false)
                    ]
                  "
                >
                  <i class="i-far-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </component>

    <!-- modal create group -->
    <component
      :is="baseModal"
      :is-open="groupModel.showCreate"
      @on-close=";(groupModel.showCreate = false), (groupModel.showBase = true)"
      size="lg"
    >
      <template #content>
        <div
          class="max-h-90vh overflow-auto p-4"
          :class="groupModel._id == '' ? 'modal-create-group' : 'modal-edit-group'"
        >
          <h2 class="py-4 text-2xl font-bold">
            {{ groupModel._id == '' ? 'Create Group' : 'Update Group' }}
          </h2>
          <form
            class="gap-5 flex flex-col"
            :class="groupModel._id == '' ? 'add-group' : 'edit-group'"
            @submit.prevent="createGroup"
          >
            <component
              name="name"
              :is="baseInput"
              v-model="groupModel.name"
              label="Name"
              class="w-full"
              mode="bordered"
              :error="errorGroupModel.group"
              :ref="inputGroupRef"
            />
            <div class="flex flex-col">
              <BaseButton class="bg-blue" type="submit">
                {{ groupModel._id == '' ? 'Create' : 'Update' }}
              </BaseButton>
              <BaseButton
                class-name="bg-secondary"
                type="button"
                @click="groupModel.showCreate = false"
              >
                Cancel
              </BaseButton>
            </div>
          </form>
        </div>
      </template>
    </component>

    <!-- modal delete group -->
    <component
      :is="baseModal"
      :is-open="deleteGroupModel.show"
      @on-close=";(deleteGroupModel.show = false), (groupModel.showBase = true)"
      size="lg"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4 modal-delete-group">
          <h2 class="py-4 text-2xl font-bold">Delete Group ?</h2>
          <form class="gap-5 flex flex-col delete-group" @submit.prevent="deleteGroup">
            <component
              name="password"
              :is="baseInput"
              v-model="deleteGroupModel.password"
              label="Type Password"
              class="w-full"
              mode="bordered"
              type="password"
              :error="errorGroupModel.password"
              :ref="inputPasswordRef"
            />
            <BaseButton class-name="bg-blue" type="submit">Confirm</BaseButton>
          </form>
        </div>
      </template>
    </component>

    <!-- user -->
    <!-- modal user -->
    <component
      :is="baseModal"
      :is-open="inviteModel.show"
      @on-close="inviteModel.show = false"
      size="lg"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4 modal-invite-user">
          <h2 class="py-4 text-2xl font-bold">
            {{ inviteModel._id == '' ? 'Invite User' : 'Update User' }}
          </h2>
          <form class="space-y-8 flex flex-col invite-user" @submit.prevent="inviteUser">
            <component
              name="name"
              :is="baseInput"
              v-model="inviteModel.group"
              label="Group"
              class="w-full"
              mode="bordered"
              :error="errorModel.group"
              :disabled="inviteModel._id != ''"
            />
            <component
              name="email"
              :is="baseInput"
              v-model="inviteModel.email"
              label="E-Mail"
              class="w-full"
              mode="bordered"
              :error="errorModel.email"
              :disabled="inviteModel._id != ''"
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

            <BaseButton class="bg-blue w-full mt-3" type="submit">
              {{ inviteModel._id == '' ? 'Save' : 'Update' }}
            </BaseButton>
            <BaseButton class="bg-secondary w-full" type="button" @click="inviteModel.show = false">
              Cancel
            </BaseButton>
          </form>
        </div>
      </template>
    </component>

    <!-- delete user -->
    <component
      :is="baseModal"
      :is-open="deleteModel.show"
      @on-close="deleteModel.show = false"
      size="lg"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4 modal-remove-user">
          <h2 class="py-4 text-2xl font-bold">Delete User ?</h2>
          <p>This action cannot be undo</p>
          <BaseButton
            class="bg-blue w-full mt-3 remove-user-confirm"
            @click="deleteInvited(inviteModel._id as string)"
          >
            Confirm
          </BaseButton>
        </div>
      </template>
    </component>
  </Teleport>
</template>
