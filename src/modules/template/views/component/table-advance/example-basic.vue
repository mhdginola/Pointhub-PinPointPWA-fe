<script setup lang="ts">
import { ref } from 'vue'
import BaseCheckbox from '@/components/base-checkbox.vue'
import BaseInput from '@/components/base-input.vue'
import BaseSwitch from '@/components/base-switch.vue'
import { codeExample } from './example-basic'

const checkbox: boolean[] = []
const searchAll: string = ''
const search: string[] = []
const codeToggle = ref(false)
</script>

<template>
  <div class="card card-template">
    <div class="card-header">
      <h2>Example</h2>
      <component :is="BaseSwitch" v-model="codeToggle" label="code" />
    </div>
    <div>
      <p>Table component with checkbox, pagination, search, sort, column chooser</p>
    </div>
    <div class="flex flex-col items-center gap-8">
      <div class="w-full">
        <component :is="BaseInput" v-model="searchAll" placeholder="Search">
          <template #prefix>
            <i class="i-far-magnifying-glass block mx-3"></i>
          </template>
        </component>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr class="basic-table-row">
              <th class="basic-table-head text-center">
                <component :is="BaseCheckbox" v-model="checkbox[0]" theme="primary" />
              </th>
              <th class="basic-table-head">
                <div class="flex items-center justify-between">
                  <p>Name</p>
                  <i class="block i-far-angle-down"></i>
                </div>
              </th>
              <th class="basic-table-head">
                <div class="flex items-center justify-between">
                  <p>Job</p>
                  <i class="block i-far-angle-down"></i>
                </div>
              </th>
              <th class="basic-table-head">
                <div class="flex items-center justify-between">
                  <p>Favorite Color</p>
                  <i class="block i-far-angle-down"></i>
                </div>
              </th>
            </tr>
            <tr class="basic-table-row">
              <th></th>
              <th class="basic-table-head">
                <component
                  :is="BaseInput"
                  required
                  v-model="search[0]"
                  placeholder="Search"
                  mode="none"
                  class="font-light text-slate-800 dark:text-slate-400"
                ></component>
              </th>
              <th class="basic-table-head">
                <component
                  :is="BaseInput"
                  required
                  v-model="search[0]"
                  placeholder="Search"
                  mode="none"
                  class="font-light text-slate-800 dark:text-slate-400"
                ></component>
              </th>
              <th class="basic-table-head">
                <component
                  :is="BaseInput"
                  required
                  v-model="search[0]"
                  placeholder="Search"
                  mode="none"
                  class="font-light text-slate-800 dark:text-slate-400"
                ></component>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="basic-table-row">
              <td class="basic-table-body text-center">
                <component :is="BaseCheckbox" v-model="checkbox[0]" theme="primary" />
              </td>
              <td class="basic-table-body">Cy Ganderton lorem</td>
              <td class="basic-table-body">Quality Control Specialist</td>
              <td class="basic-table-body">Blue</td>
            </tr>
            <tr class="basic-table-row">
              <td class="basic-table-body text-center">
                <component :is="BaseCheckbox" v-model="checkbox[1]" theme="primary" />
              </td>
              <td class="basic-table-body">Hart Hagerty</td>
              <td class="basic-table-body">Desktop Support Technician</td>
              <td class="basic-table-body">Purple</td>
            </tr>
            <tr class="basic-table-row">
              <td class="basic-table-body text-center">
                <component :is="BaseCheckbox" v-model="checkbox[2]" theme="primary" />
              </td>
              <td class="basic-table-body">Brice Swyre</td>
              <td class="basic-table-body">Tax Accountant</td>
              <td class="basic-table-body">Red</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-outline-info rounded-r-none">
          <i class="i-fas-angle-left block"></i>
        </button>
        <button type="button" class="btn btn-info border-r-none rounded-none">1</button>
        <button type="button" class="btn btn-outline-info border-r-none rounded-none">2</button>
        <button type="button" class="btn btn-outline-info border-r-none rounded-none">3</button>
        <button type="button" class="btn btn-outline-info border-r-none rounded-none">4</button>
        <button type="button" class="btn btn-outline-info border-r-none rounded-none">5</button>
        <button type="button" class="btn btn-outline-info rounded-l-none">
          <i class="i-fas-angle-right block"></i>
        </button>
      </div>
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
