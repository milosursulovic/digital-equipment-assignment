<template>
  <nav class="bg-blue-600 text-white px-4 py-3 flex justify-between">
    <div class="font-bold">Digitalni Revers</div>
    <div class="flex gap-4">
      <RouterLink to="/dashboard">📊 Dashboard</RouterLink>
      <RouterLink to="/equipment">📦 Oprema</RouterLink>
      <RouterLink to="/assignments">📄 Reversi</RouterLink>
      <RouterLink to="/persons">👥 Osobe</RouterLink>
      <button @click="logout" class="ml-4 text-red-300 hover:underline">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router'
const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
