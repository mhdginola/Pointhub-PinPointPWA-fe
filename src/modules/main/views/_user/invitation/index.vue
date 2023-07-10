<script setup lang="ts">
import type { SizeType } from '@/components/base-modal.vue'
import baseModal from '@/components/base-modal.vue'
import moment from 'moment'
import { onMounted, reactive } from 'vue'
import BaseButton from '@/components/base-button.vue'
import { UseInvitationStore } from './store'

const invitation = UseInvitationStore()
onMounted(() => {
  invitation.mockInvitation()
})

const acceptInvitation = () => {
  openModal({
    show: true,
    title: 'Joined',
    content: `Success to join Group`,
    size: 'md',
    className: 'modal-invitation-accepted'
  })
}
const rejectInvitation = () => {
  openModal({
    show: true,
    title: 'Rejected',
    content: `Success Reject invitation`,
    size: 'md',
    className: 'modal-invitation-rejected'
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
  setTimeout(() => {
    modalRef.show = true
    modalRef.title = model.title
    modalRef.content = model.content
    modalRef.size = model.size
    modalRef.className = model.className
  }, 500)
}
</script>
<template>
  <div class="bg-slate-300/20 rounded-5 lg:p-10 p-5 mt-5" v-for="item in invitation.invitations">
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
            class="bg-transparent border-1 border-slate-800 dark:border-slate-500 text-center py-2 px-10 text-slate-800 dark:text-white capitalize rounded-5 capitalize reject"
            @click.prevent="rejectInvitation"
          >
            reject
          </button>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
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
          <div class="gap-5 flex flex-col">
            {{ modalRef.content }}
            <BaseButton class="bg-blue" @click="modalRef.show = false"> Close </BaseButton>
          </div>
        </div>
      </template>
    </component>
  </Teleport>
</template>
