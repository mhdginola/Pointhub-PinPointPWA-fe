<script setup lang="ts">
import { name } from '@/config/app'
</script>

<template>
  <div class="max-w-[26rem] w-full p-4 sm:px-5">
    <div class="text-center">
      <img class="mx-auto h-16 w-16" src="@/assets/logo-icon.png" alt="logo" />
      <div class="mt-4">
        <h2 class="text-2xl font-semibold text-slate-600 dark:text-slate-100">
          Welcome To {{ name }}
        </h2>
        <p class="text-slate-400 dark:text-slate-300">Please sign up to continue</p>
      </div>
    </div>
    <div class="card mt-5 rounded-lg p-5 lg:p-7">
      <label class="relative flex">
        <input
          class="form-input peer dark:focus:border-accent w-full border border-slate-300 rounded-lg bg-transparent px-3 py-2 pl-9 focus:z-10 hover:z-10 dark:border-slate-500 focus:border-blue-700 hover:border-slate-400 placeholder:text-slate-400/70 dark:hover:border-slate-400"
          placeholder="Username"
          type="text"
        />
        <span
          class="dark:peer-focus:text-accent pointer-events-none absolute h-full w-10 flex items-center justify-center text-slate-400 dark:text-slate-300 peer-focus:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>
      </label>
      <label class="relative mt-4 flex">
        <input
          class="form-input peer dark:focus:border-accent w-full border border-slate-300 rounded-lg bg-transparent px-3 py-2 pl-9 focus:z-10 hover:z-10 dark:border-slate-400 focus:border-blue-700 hover:border-slate-400 placeholder:text-slate-400/70 dark:hover:border-slate-400"
          placeholder="Password"
          type="password"
        />
        <span
          class="dark:peer-focus:text-accent pointer-events-none absolute h-full w-10 flex items-center justify-center text-slate-400 dark:text-slate-300 peer-focus:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
      </label>
      <label class="relative mt-4 flex">
        <input
          class="form-input peer dark:focus:border-accent w-full border border-slate-300 rounded-lg bg-transparent px-3 py-2 pl-9 focus:z-10 hover:z-10 dark:border-slate-400 focus:border-blue-700 hover:border-slate-400 placeholder:text-slate-400/70 dark:hover:border-slate-400"
          placeholder="Repeat Password"
          type="password"
        />
        <span
          class="dark:peer-focus:text-accent pointer-events-none absolute h-full w-10 flex items-center justify-center text-slate-400 dark:text-slate-300 peer-focus:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
      </label>
      <div class="mt-4 flex items-center space-x-2">
        <input
          class="dark:focus:border-accent form-checkbox is-basic dark:checked:border-accent dark:checked:bg-accent dark:hover:border-accent h-5 w-5 border-slate-400/70 rounded checked:border-blue-700 dark:border-slate-400 focus:border-blue-700 hover:border-blue-700 checked:bg-blue-700"
          type="checkbox"
        />
        <p class="line-clamp-1">
          I agree with
          <a href="#" class="text-slate-400 dark:text-slate-300 hover:underline">
            privacy policy
          </a>
        </p>
      </div>
      <button
        class="btn btn-md dark:bg-accent dark:active:bg-accent/90 dark:hover:bg-accent-focus dark:focus:bg-accent-focus mt-5 w-full bg-blue-700 font-medium text-white active:bg-blue-800/90 focus:bg-blue-800 hover:bg-blue-800"
      >
        Sign Up
      </button>
      <div class="text-xs+ mt-4 text-center">
        <p class="line-clamp-1">
          <span>Already have an account? </span>
          <a
            class="dark:text-slate dark:hover:text-accent text-blue-500 transition-colors hover:text-blue-600"
            href="pages-login-1.html"
            >Sign In</a
          >
        </p>
      </div>
      <div class="my-7 flex items-center space-x-3">
        <div class="h-px flex-1 bg-slate-200 dark:bg-slate-500"></div>
        <p class="text-tiny+ uppercase">or sign up with email</p>
        <div class="h-px flex-1 bg-slate-200 dark:bg-slate-500"></div>
      </div>
      <div class="flex space-x-4">
        <button
          class="btn w-full border border-slate-300 font-medium text-slate-800 space-x-3 dark:border-slate-400 active:bg-slate-200/80 focus:bg-slate-200 hover:bg-slate-200 dark:text-slate-50 dark:active:bg-slate-500/90 dark:focus:bg-slate-500 dark:hover:bg-slate-500"
        >
          <i class="block i-fab-google"></i>
          <span>Google</span>
        </button>
        <button
          class="btn w-full border border-slate-300 font-medium text-slate-800 space-x-3 dark:border-slate-400 active:bg-slate-200/80 focus:bg-slate-200 hover:bg-slate-200 dark:text-slate-50 dark:active:bg-slate-500/90 dark:focus:bg-slate-500 dark:hover:bg-slate-500"
        >
          <i class="block i-fab-github"></i>
          <span>Github</span>
        </button>
      </div>
    </div>
  </div>
</template>
