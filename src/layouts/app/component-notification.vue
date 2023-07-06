<script setup lang="ts">
import BasePopper from '@/components/base-popper.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const activeTab = ref('all')
const user = useUserStore()
const router = useRouter()
</script>

<template>
  <component :is="BasePopper">
    <button class="relative rounded-full p-2 hover:bg-slate-300/20 dark:hover:bg-slate-300/20">
      <i class="i-ph-bell-ringing h-24px w-24px flex items-center justify-center" />
      <!-- ping -->
      <span class="absolute right-px top-px h-2 w-2 flex items-center justify-center">
        <span
          class="absolute h-full w-full inline-flex animate-ping rounded-full bg-red-400 opacity-80"
        ></span>
        <span class="h-2 w-2 inline-flex rounded-full bg-red-400"></span>
      </span>
    </button>
    <template #content>
      <div
        class="popper-box shadow-soft dark:shadow-soft-dark mx-4 mt-1 max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] flex flex-col border border-slate-200 rounded-lg bg-white sm:m-0 sm:w-80 dark:border-slate-800 dark:bg-slate-700"
      >
        <div class="rounded-t-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200">
          <div class="flex items-center justify-between px-4 pt-2">
            <div class="flex items-center space-x-2">
              <h3 class="font-medium text-slate-700 dark:text-slate-100">Notifications</h3>
              <div
                class="badge h-5 rounded-full bg-primary/10 px-1.5 text-primary dark:bg-slate/15 dark:text-slate"
              >
                2
              </div>
            </div>

            <button
              class="btn h-7 w-7 rounded-full p-0 -mr-1.5 active:bg-slate-300/25 focus:bg-slate-300/20 hover:bg-slate-300/20 dark:active:bg-slate-300/25 dark:focus:bg-slate-300/20 dark:hover:bg-slate-300/20"
            >
              <i icon="fa-regular fa-maximize"></i>
            </button>
          </div>

          <div class="scrollbar-hidden flex shrink-0 overflow-x-auto px-3">
            <button
              :class="
                activeTab === 'all'
                  ? 'border-primary dark:border-accent text-primary dark:text-slate'
                  : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-slate-100 dark:focus:text-slate-100'
              "
              class="btn shrink-0 border-b-2 rounded-none px-3.5 py-2.5"
              @click="activeTab = 'all'"
            >
              <span>All</span>
            </button>
          </div>
        </div>
        <div class="tab-content flex flex-col overflow-hidden">
          <div v-if="activeTab === 'all'" class="overflow-y-auto p-4 space-y-4">
            <div class="flex items-center space-x-3">
              <div
                class="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg bg-secondary/10 dark:bg-secondary-light/15"
              >
                <i class="fa fa-user-edit text-secondary dark:text-secondary-light"></i>
              </div>
              <div
                v-if="user.role == 'user'"
                class="cursor-pointer"
                @click.prevent="router.push({ name: 'invitation' })"
              >
                <p class="font-medium text-slate-600 dark:text-slate-100">Group Invitation</p>
                <div class="line-clamp-1 mt-1 text-xs text-slate-400 dark:text-slate-300">
                  Nur Aini invite you to join group
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </component>
</template>

<style scoped lang="postcss">
.das {
  @apply bg-coolGray text-slate-4;
}
</style>
