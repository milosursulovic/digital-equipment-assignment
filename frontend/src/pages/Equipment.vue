<template>
    <div>
        <Navbar />
        <div class="p-6">
            <h2 class="text-2xl font-bold mb-4">📦 Oprema</h2>

            <form @submit.prevent="addEquipment" class="flex flex-col md:flex-row gap-4 mb-6">
                <input v-model="name" placeholder="Naziv opreme" class="input" />
                <input v-model="serialNumber" placeholder="Serijski broj (opcionalno)" class="input" />
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    ➕ Dodaj
                </button>
            </form>

            <table class="w-full text-left border">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="p-2">Naziv</th>
                        <th class="p-2">Serijski broj</th>
                        <th class="p-2">Dostupno</th>
                        <th class="p-2">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in equipment" :key="item._id" class="border-t">
                        <td class="p-2">{{ item.name }}</td>
                        <td class="p-2">{{ item.serialNumber || '-' }}</td>
                        <td class="p-2">{{ item.available ? '✔️' : '❌' }}</td>
                        <td class="p-2">
                            <button @click="deleteEquipment(item._id)" class="text-red-500 hover:underline">
                                Obriši
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'
import Navbar from '../components/Navbar.vue'

const equipment = ref([])
const name = ref('')
const serialNumber = ref('')

async function loadEquipment() {
    const res = await api.get('/equipment')
    equipment.value = res.data
}

async function addEquipment() {
    await api.post('/equipment', {
        name: name.value,
        serialNumber: serialNumber.value
    })
    name.value = ''
    serialNumber.value = ''
    await loadEquipment()
}

async function deleteEquipment(id) {
    if (confirm('Da li ste sigurni?')) {
        await api.delete(`/equipment/${id}`)
        await loadEquipment()
    }
}

onMounted(loadEquipment)
</script>
