<template>
  <div class="h-screen flex items-center justify-center">
    <form @submit.prevent="login" class="bg-white p-6 rounded shadow-md w-80">
      <h1 class="text-xl font-bold mb-4">Login</h1>
      <input v-model="username" placeholder="Korisničko ime" class="input" />
      <input v-model="password" type="password" placeholder="Lozinka" class="input mt-2" />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 mt-4 w-full rounded hover:bg-blue-700">Prijavi
        se</button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      username: username.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Pogrešno korisničko ime ili lozinka'
  }
}
</script>
