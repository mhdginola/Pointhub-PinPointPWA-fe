<script setup lang="ts">
import { ref } from 'vue'
import BaseSwitch from '@/components/base-switch.vue'
import { codeExample } from './example-basic'
import BaseTreeview from '@/components/base-treeview.vue'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Slot</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum reprehenderit minus quas
        cupiditate deleniti sint repellendus nesciunt commodi ducimus voluptatem repudiandae
        consequatur magni, dolore non tempora at quis? Quaerat, possimus.
      </p>
    </div>
    <div class="flex flex-col">
      <component :is="BaseTreeview" :is-open="true">
        <template #header="slotProps">
          <i
            class="i-far-folder"
            :class="{
              'i-far-folder-open': slotProps.isOpen
            }"
          ></i>
          <p class="flex-1 text-left">Parent 1</p>
        </template>
        <component :is="BaseTreeview" :is-open="true">
          <template #header="slotProps">
            <i
              class="i-far-folder"
              :class="{
                'i-far-folder-open': slotProps.isOpen
              }"
            ></i>
            <p class="flex-1 text-left">Child 1</p>
          </template>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 1.1</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 1.2</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 1.3</p>
          </button>
        </component>
        <component :is="BaseTreeview">
          <template #header="slotProps">
            <i
              class="i-far-folder"
              :class="{
                'i-far-folder-open': slotProps.isOpen
              }"
            ></i>
            <p class="flex-1 text-left">Child 2</p>
          </template>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 2.1</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 2.2</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 2.3</p>
          </button>
        </component>
      </component>
      <component :is="BaseTreeview">
        <template #header="slotProps">
          <i
            class="i-far-folder"
            :class="{
              'i-far-folder-open': slotProps.isOpen
            }"
          ></i>
          <p class="flex-1 text-left">Parent 2</p>
        </template>
        <component :is="BaseTreeview">
          <template #header="slotProps">
            <i
              class="i-far-folder"
              :class="{
                'i-far-folder-open': slotProps.isOpen
              }"
            ></i>
            <p class="flex-1 text-left">Child 1</p>
          </template>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 1.1</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 1.2</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 1.3</p>
          </button>
        </component>
        <component :is="BaseTreeview">
          <template #header="slotProps">
            <i
              class="i-far-folder"
              :class="{
                'i-far-folder-open': slotProps.isOpen
              }"
            ></i>
            <p class="flex-1 text-left">Child 2</p>
          </template>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 2.1</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 2.2</p>
          </button>
          <button class="btn btn-block space-x-4">
            <i class="i-far-file-lines block w-4 h-4"></i>
            <p class="flex-1 text-left">Child 2.3</p>
          </button>
        </component>
      </component>
    </div>
    <div
      class="card-code"
      :class="{
        'card-code-active': codeToggle,
        'card-code-inactive': !codeToggle
      }"
    >
      <div class="card-code-label">vue</div>
      <highlightjs autodetect :code="codeExample" />
    </div>
  </div>
</template>
