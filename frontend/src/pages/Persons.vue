<template>
    <div>
        <Navbar />
        <div class="p-6">
            <h2 class="text-2xl font-bold mb-4">👥 Osobe koje zadužuju opremu</h2>

            <form @submit.prevent="addPerson" class="mb-6 bg-gray-50 p-4 rounded border grid md:grid-cols-4 gap-4">
                <input v-model="name" placeholder="Ime i prezime" class="input" required />
                <input v-model="position" placeholder="Pozicija" class="input" />
                <input v-model="department" placeholder="Odeljenje" class="input" />
                <input v-model="contact" placeholder="Kontakt" class="input" />
                <button type="submit" class="md:col-span-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    ➕ Dodaj osobu
                </button>
            </form>

            <table class="w-full text-left border">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="p-2">Ime i prezime</th>
                        <th class="p-2">Pozicija</th>
                        <th class="p-2">Odeljenje</th>
                        <th class="p-2">Kontakt</th>
                        <th class="p-2">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in persons" :key="p._id" class="border-t">
                        <td class="p-2">{{ p.name }}</td>
                        <td class="p-2">{{ p.position || '-' }}</td>
                        <td class="p-2">{{ p.department || '-' }}</td>
                        <td class="p-2">{{ p.contact || '-' }}</td>
                        <td class="p-2">
                            <button @click="deletePerson(p._id)" class="text-red-500 hover:underline">Obriši</button>
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

const persons = ref([])
const name = ref('')
const position = ref('')
const department = ref('')
const contact = ref('')

async function loadPersons() {
    const res = await api.get('/person')
    persons.value = res.data
}

async function addPerson() {
    await api.post('/person', {
        name: name.value,
        position: position.value,
        department: department.value,
        contact: contact.value
    })

    name.value = ''
    position.value = ''
    department.value = ''
    contact.value = ''

    await loadPersons()
}

async function deletePerson(id) {
    if (confirm('Obrisati ovu osobu?')) {
        await api.delete(`/person/${id}`)
        await loadPersons()
    }
}

onMounted(loadPersons)
</script>
