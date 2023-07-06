<script setup lang="ts">
import BaseInput from '@/components/base-input.vue'
import BaseButton from '@/components/base-button.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/auth'
import logo from '@/assets/images/logo.png'

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
    name: 'dashboard'
  })
}
</script>

<template>
  <div class="w-screen h-screen flex flex-row bg-white">
    <div
      class="w-0% lg-w-75% h-100% bg-[url(@/assets/images/background.webp)] bg-left-center bg-cover bg-no-repeat"
    ></div>
    <div class="w-100% lg-w-25% px-5 flex flex-col justify-center gap-5">
      <img alt="Logo" :src="logo" />
      <p class="text-3xl text-center">Sign in to your account</p>
      <BaseInput
        mode="bordered"
        type="text"
        label="Username or Email"
        class="text-dark rounded"
        v-model="form.username"
      />
      <BaseInput
        mode="bordered"
        type="password"
        label="Password"
        class="text-dark rounded"
        v-model="form.password"
      />
      <div class="flex flex-row justify-between">
        <label class="text-blue">
          <input type="checkbox" class="border-blue mr-1" v-model="form.remember" />
          Remember me
        </label>
        <a class="text-blue" href="#">Forgot Password</a>
      </div>
      <BaseButton class-name="bg-blue "> sign in </BaseButton>
      <span class="font-normal text-dark font-bold text-center">Or Continue with</span>
      <BaseButton class-name="bg-blue login-google" @click="loginWithGoogle">
        signin with google
      </BaseButton>
    </div>
  </div>
</template>

<style></style>
