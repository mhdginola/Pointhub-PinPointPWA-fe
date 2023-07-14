<script setup lang="ts">
import BaseModal from '@/components/base-modal.vue'
import baseButton from '@/components/base-button.vue'
import { props } from './options'
</script>

<template>
  <Teleport to="body">
    <component
      :is="BaseModal"
      :is-open="(props?.show as boolean)"
      @on-close="props.show = false"
      :size="props.size"
    >
      <template #content>
        <div class="max-h-90vh overflow-auto p-4" :class="props.className">
          <h2 class="py-4 text-2xl font-bold" v-html="props.title"></h2>
          <div class="gap-5">
            <div v-html="props.content"></div>
            <baseButton class="bg-blue w-full" @click="props.show = false"> Close </baseButton>
          </div>
        </div>
      </template>
    </component>
  </Teleport>
</template>
