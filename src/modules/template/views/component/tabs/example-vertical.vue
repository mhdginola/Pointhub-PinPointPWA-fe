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
      <!-- vertical pills -->
      <TabGroup as="div" class="mb-5 flex flex-col sm:flex-row">
        <TabList class="mb-5 sm:mb-0 sm:flex-[0_0_20%] space-y-2 ltr:pr-4 rtl:pl-4">
          <Tab as="template" v-slot="{ selected }"
            ><a
              href="javascript:;"
              class="block rounded-md p-3.5 py-2 transition-all duration-300 hover:bg-success hover:text-white !outline-none"
              :class="{ '!bg-success text-white': selected }"
              >Home</a
            ></Tab
          >
          <Tab as="template" v-slot="{ selected }"
            ><a
              href="javascript:;"
              class="block rounded-md p-3.5 py-2 transition-all duration-300 hover:bg-success hover:text-white !outline-none"
              :class="{ '!bg-success text-white': selected }"
              >Profile</a
            ></Tab
          >
          <Tab as="template" v-slot="{ selected }"
            ><a
              href="javascript:;"
              class="block rounded-md p-3.5 py-2 transition-all duration-300 hover:bg-success hover:text-white !outline-none"
              :class="{ '!bg-success text-white': selected }"
              >Messages</a
            ></Tab
          >
          <Tab as="template" v-slot="{ selected }"
            ><a
              href="javascript:;"
              class="block rounded-md p-3.5 py-2 transition-all duration-300 hover:bg-success hover:text-white !outline-none"
              :class="{ '!bg-success text-white': selected }"
              >Settings</a
            ></Tab
          >
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
          <TabPanel>
            <blockquote
              class="border border-l-2 border-white-light rounded-br-md rounded-tr-md bg-white p-5 text-black shadow-md dark:border-[#060818] !border-l-primary dark:bg-[#060818] ltr:pl-3.5 rtl:pr-3.5"
            >
              <div class="flex items-start">
                <p class="m-0 text-sm not-italic text-[#515365] dark:text-white-dark">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                </p>
              </div>
            </blockquote>
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
