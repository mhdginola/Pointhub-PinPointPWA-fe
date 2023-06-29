<script setup lang="ts">
import BaseInput from '@/components/base-input.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/auth'

interface FormModel {
  username: string
  password: string
  remember: boolean
}

const router = useRouter()
const auth = useUserStore()
const form = reactive<FormModel>({
  username: '',
  password: '',
  remember: false
})

const loginWithGoogle = async () => {
  await auth.setAccessToken('token')
  router.push({
    name: 'attendances'
  })
}
</script>

<template>
  <div class="w-screen h-screen flex flex-row bg-white">
    <div
      class="w-0% lg-w-75% h-100% bg-[url(@/assets/images/background.webp)] bg-left-center bg-cover bg-no-repeat"
    ></div>
    <div class="w-100% lg-w-25% px-5 flex flex-col justify-center">
      <button
        class="bg-#629C44 block text-center p-2 text-white capitalize rounded my-2 login-google"
        @click="loginWithGoogle"
      >
        Signin With Google
      </button>
      <button class="bg-#606060 block text-center p-2 text-white capitalize rounded my-2">
        signin with github
      </button>
      <span class="text-dark font-bold text-center">OR</span>
      <BaseInput
        mode="bordered"
        type="text"
        placeholder="Username or Email"
        class="my-2 text-dark rounded"
        v-model="form.username"
      />
      <BaseInput
        mode="bordered"
        type="password"
        placeholder="Password"
        class="my-2 text-dark rounded"
        v-model="form.password"
      />
      <div class="flex flex-row justify-between my-1">
        <label class="text-blue">
          <input type="checkbox" class="border-blue mr-1" v-model="form.remember" />
          Remember me
        </label>
        <a class="text-blue" href="#">Forgot Password</a>
      </div>
      <button class="bg-#629C44 text-center py-2 px-7 text-white capitalize rounded my-2 mx-auto">
        sign in
      </button>
    </div>
  </div>
</template>

<style></style>
