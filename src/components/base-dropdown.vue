<script lang="ts">
interface Props {
  position?: 'left' | 'right'
}
</script>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const props = withDefaults(defineProps<Props>(), {
  position: 'left'
})
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="">
        <slot name="trigger">
          <div
            class="w-full inline-flex justify-center items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <span>Options</span>
            <i class="i-far-angle-down block ml-2"></i>
          </div>
        </slot>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-700 divide-y divide-gray-100 dark:divide-gray-700 focus:outline-none cursor-pointer text-sm"
        :class="{ 'left-0': props.position === 'left', 'right-0': props.position === 'right' }"
      >
        <slot></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>

<style lang="postcss" scoped></style>
