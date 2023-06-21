<script setup lang="ts">
import { ref } from 'vue'
import BaseSwitch from '@/components/base-switch.vue'
import { codeExample } from './example-basic'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Basic</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>
        The accordion component allows the user to show and hide sections of related content on a
        page.
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <!-- line -->
      <TabGroup as="div" class="mb-5">
        <TabList class="mb-5 mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:;"
              class="flex items-center border-transparent p-5 py-3 transition duration-300 -mb-[1px] hover:border-b hover:text-secondary !outline-none hover:!border-secondary"
              :class="{ 'border-b !border-secondary text-secondary': selected }"
            >
              <i class="i-fas-house"></i>
              Home
            </a>
          </Tab>
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:;"
              class="flex items-center border-transparent p-5 py-3 transition duration-300 -mb-[1px] hover:border-b hover:text-secondary !outline-none hover:!border-secondary"
              :class="{ 'border-b !border-secondary text-secondary': selected }"
            >
              <i class="i-fas-house"></i>
              Profile
            </a>
          </Tab>
          <Tab as="template" v-slot="{ selected }">
            <a
              href="javascript:;"
              class="flex items-center border-transparent p-5 py-3 transition duration-300 -mb-[1px] hover:border-b hover:text-secondary !outline-none hover:!border-secondary"
              :class="{ 'border-b !border-secondary text-secondary': selected }"
            >
              <i class="i-fas-house"></i>
              Contact
            </a>
          </Tab>
        </TabList>
        <TabPanels class="flex-1 text-sm">
          <TabPanel>
            <h4 class="mb-4 text-2xl font-semibold">We move your world!</h4>
            <p class="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </TabPanel>
          <TabPanel>
            <div class="flex items-start">
              <div class="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt=""
                  class="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark"
                />
              </div>
              <div class="flex-auto">
                <h5 class="mb-4 text-xl font-medium">Media heading</h5>
                <p class="text-white-dark">
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                  sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                  Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in
                  faucibus.
                </p>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </TabPanel>
        </TabPanels>
      </TabGroup>
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
