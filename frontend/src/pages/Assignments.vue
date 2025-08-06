<template>
    <div>
        <Navbar />
        <div class="p-6">
            <h2 class="text-2xl font-bold mb-4">📄 Reversi</h2>

            <!-- Forma za zaduživanje -->
            <form @submit.prevent="assign" class="mb-6 bg-gray-50 p-4 rounded border">
                <h3 class="font-bold mb-2">➕ Zaduži opremu osobi</h3>

                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-1">Osoba</label>
                        <select v-model="selectedPerson" class="input" required>
                            <option disabled value="">-- Izaberi osobu --</option>
                            <option v-for="p in persons" :key="p._id" :value="p._id">
                                {{ p.name }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="block mb-1">Napomena</label>
                        <input v-model="note" class="input" placeholder="npr. privremeno zadužen" />
                    </div>
                </div>

                <div class="mt-4">
                    <label class="block mb-2 font-semibold">Oprema (dostupna)</label>
                    <div class="flex flex-wrap gap-4">
                        <label v-for="eq in availableEquipment" :key="eq._id"
                            class="flex items-center gap-2 border px-2 py-1 rounded bg-white">
                            <input type="checkbox" :value="eq._id" v-model="selectedEquipment" />
                            <span>{{ eq.name }} ({{ eq.serialNumber || 'N/A' }})</span>
                        </label>
                    </div>
                </div>

                <button type="submit" class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    ✅ Zaduži
                </button>
            </form>

            <table class="w-full text-left border">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="p-2">Osoba</th>
                        <th class="p-2">Datum</th>
                        <th class="p-2">Oprema</th>
                        <th class="p-2">Napomena</th>
                        <th class="p-2">PDF</th>
                        <th class="p-2">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in assignments" :key="item._id" class="border-t">
                        <td class="p-2">{{ item.person.name }}</td>
                        <td class="p-2">{{ formatDate(item.dateAssigned) }}</td>
                        <td class="p-2">
                            <ul>
                                <li v-for="eq in item.equipment" :key="eq._id">
                                    {{ eq.name }} ({{ eq.serialNumber || 'N/A' }})
                                </li>
                            </ul>
                        </td>
                        <td class="p-2">{{ item.note || '-' }}</td>
                        <td class="p-2">
                            <button @click="downloadPdf(item._id)" class="text-blue-600 hover:underline">
                                📥 Preuzmi PDF
                            </button>
                        </td>
                        <td class="p-2">
                            <button @click="deleteAssignment(item._id)" class="text-red-600 hover:underline">
                                🗑 Obriši
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

const assignments = ref([])
const persons = ref([])
const availableEquipment = ref([])

const selectedPerson = ref('')
const selectedEquipment = ref([])
const note = ref('')

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString()
}

async function loadAssignments() {
    const res = await api.get('/reverse')
    assignments.value = res.data
}

async function loadPersons() {
    const res = await api.get('/person')
    persons.value = res.data
}

async function loadAvailableEquipment() {
    const res = await api.get('/equipment')
    availableEquipment.value = res.data.filter(eq => eq.available)
}

async function assign() {
    if (!selectedPerson.value || selectedEquipment.value.length === 0) return

    await api.post('/reverse', {
        personId: selectedPerson.value,
        equipmentIds: selectedEquipment.value,
        note: note.value
    })

    selectedPerson.value = ''
    selectedEquipment.value = []
    note.value = ''

    await loadAssignments()
    await loadAvailableEquipment()
}

async function downloadPdf(id) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reverse/pdf/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        alert('Neautorizovan pristup PDF-u')
        return
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `revers_${id}.pdf`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
}

async function deleteAssignment(id) {
    if (confirm('Obrisati ovaj revers?')) {
        await api.delete(`/reverse/${id}`)
        await loadAssignments()
        await loadAvailableEquipment()
    }
}

onMounted(() => {
    loadAssignments()
    loadPersons()
    loadAvailableEquipment()
})

</script>
