<script setup lang="ts"></script>

<template>
  <notifications position="bottom right" :duration="3000">
    <template #body="props">
      <div
        class="card-header items-start rounded-xl shadow space-x-2 my-1 mx-4 bg-white text-slate-600"
        :class="{
          'bg-blue-50 text-blue-600': props.item.type === 'info',
          'bg-green-50 text-green-600': props.item.type === 'success',
          'bg-yellow-50 text-yellow-600': props.item.type === 'warning',
          'bg-red-50 text-red-600': props.item.type === 'danger'
        }"
      >
        <div class="flex gap-2">
          <div
            class="rounded-l-xl items-start justify-center flex p-1 bg-primary"
            :class="{
              '!bg-info ': props.item.type === 'info',
              '!bg-success ': props.item.type === 'success',
              '!bg-warning ': props.item.type === 'warning',
              '!bg-danger ': props.item.type === 'danger'
            }"
          ></div>
          <div class="flex flex-col py-2">
            <p class="font-bold">
              {{ props.item.title }}
            </p>
            <p>
              {{ props.item.text }}
            </p>
          </div>
        </div>
        <button type="button" class="hover:opacity-80 p-2" @click="props.close()">
          <i class="i-fas-xmark block"></i>
        </button>
      </div>
    </template>
  </notifications>
</template>
