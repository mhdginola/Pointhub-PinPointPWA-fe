<script setup lang="ts">
import { useBaseNotification, TypesEnum } from '@/composable/notification'
import { useAccountStore } from '@/stores/account'
import { TabGroup, TabList, TabPanel, Tab, TabPanels } from '@headlessui/vue'
import moment from 'moment'
import { onMounted } from 'vue'

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

onMounted(() => {
  account.mockInvitation()
})

const acceptInvitation = () => {
  openNotif({
    title: 'Accepted',
    text: 'Success to Join Group',
    type: TypesEnum.Success
  })
}
const rejectInvitation = () => {
  openNotif({
    title: 'Rejected',
    text: 'Invitation Rejected',
    type: TypesEnum.Danger
  })
}
</script>
<template>
  <div class="bg-slate-300/20 rounded-5 lg:p-10 p-5 mt-5" v-for="item in account.invitations">
    <div class="flex flex-col">
      <span class="lg:text-2xl text-xl uppercase"
        >{{ item.from }} has invite you to join group</span
      >
      <div class="flex lg:flex-row flex-col">
        <div class="p-3 border-secondary border-1 rounded-5 mt-3 flex-1">
          <table class="w-full">
            <tr>
              <td>Group Name</td>
              <td>:</td>
              <td>{{ item.inviteGroup }}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>:</td>
              <td>{{ item.inviteRole }}</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>:</td>
              <td>{{ moment(item.timestamp).fromNow() }}</td>
            </tr>
          </table>
        </div>
        <div class="flex flex-row justify-center items-center flex-1 gap-2 mt-5 lg:mt-0">
          <button
            class="bg-blue text-center py-2 px-10 text-white capitalize rounded-5 capitalize accept"
            @click.prevent="acceptInvitation"
          >
            join
          </button>
          <button
            class="bg-transparent border-1 text-center py-2 px-10 text-white capitalize rounded-5 capitalize rejected"
            @click.prevent="rejectInvitation"
          >
            reject
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
