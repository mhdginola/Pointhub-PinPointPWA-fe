<script setup lang="ts">
import BaseBreadcrumb from '@/components/base-breadcrumb.vue'
import BaseDivider from '@/components/base-divider.vue'
</script>

<template>
  <div class="main-content-container">
    <div class="main-content-header">
      <h1>Component</h1>
      <base-divider orientation="horizontal" />
      <component
        :is="BaseBreadcrumb"
        :breadcrumbs="[{ name: 'Template', path: '/template' }, { name: 'Component' }]"
      />
    </div>
    <div class="main-content-body">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <router-link to="/template/component/accordion" class="btn btn-xl btn-light-dark">
          Accordion
        </router-link>
        <router-link to="/template/component/alert" class="btn btn-xl btn-light-dark">
          Alert
        </router-link>
        <router-link to="/template/component/avatar" class="btn btn-xl btn-light-dark">
          Avatar
        </router-link>
        <router-link to="/template/component/badge" class="btn btn-xl btn-light-dark">
          Badge
        </router-link>
        <router-link to="/template/component/breadcrumb" class="btn btn-xl btn-light-dark">
          Breadcrumb
        </router-link>
        <router-link to="/template/component/button" class="btn btn-xl btn-light-dark">
          Button
        </router-link>
        <router-link to="/template/component/button-group" class="btn btn-xl btn-light-dark">
          Button Group
        </router-link>
        <router-link to="/template/component/card" class="btn btn-xl btn-light-dark">
          Card
        </router-link>
        <router-link to="/template/component/collapse" class="btn btn-xl btn-light-dark">
          Collapse
        </router-link>
        <router-link to="/template/component/divider" class="btn btn-xl btn-light-dark">
          Divider
        </router-link>
        <router-link to="/template/component/dropdown" class="btn btn-xl btn-light-dark">
          Dropdown
        </router-link>
        <router-link to="/template/component/mask" class="btn btn-xl btn-light-dark">
          Mask
        </router-link>
        <router-link to="/template/component/modal" class="btn btn-xl btn-light-dark">
          Modal
        </router-link>
        <router-link to="/template/component/notification" class="btn btn-xl btn-light-dark">
          Notification
        </router-link>
        <router-link to="/template/component/popover" class="btn btn-xl btn-light-dark">
          Popover
        </router-link>
        <router-link to="/template/component/progress" class="btn btn-xl btn-light-dark">
          Progress
        </router-link>
        <router-link to="/template/component/skeleton" class="btn btn-xl btn-light-dark">
          Skeleton
        </router-link>
        <router-link to="/template/component/spinner" class="btn btn-xl btn-light-dark">
          Spinner
        </router-link>
        <router-link to="/template/component/steps" class="btn btn-xl btn-light-dark">
          Steps
        </router-link>
        <router-link to="/template/component/table" class="btn btn-xl btn-light-dark">
          Table
        </router-link>
        <router-link to="/template/component/tabs" class="btn btn-xl btn-light-dark">
          Tabs
        </router-link>
        <router-link to="/template/component/timeline" class="btn btn-xl btn-light-dark">
          Timeline
        </router-link>
        <router-link to="/template/component/tooltip" class="btn btn-xl btn-light-dark">
          Tooltip
        </router-link>
        <router-link to="/template/component/treeview" class="btn btn-xl btn-light-dark">
          Treeview
        </router-link>
        <router-link to="/template/component/typography" class="btn btn-xl btn-light-dark">
          Typography
        </router-link>
      </div>
    </div>
  </div>
</template>
