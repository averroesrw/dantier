<script setup lang="ts">
import { reactive, ref } from 'vue'

interface ReservationApiResponse {
  reservationId?: number
  message?: string
  error?: string
}

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  note: '',
})

const services = [
  'Dámský střih',
  'Pánský střih',
  'Barvení',
  'Melír',
  'Foukaná',
  'Regenerace vlasů',
  'Svatební účes',
]

const times = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
]

const apiBase = (import.meta.env.VITE_RESERVATIONS_API_URL ?? '/api').replace(/\/+$/, '')
const minDate = new Date().toISOString().slice(0, 10)

const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref('')
const reservationId = ref<number | null>(null)

function resetForm() {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.service = ''
  form.date = ''
  form.time = ''
  form.note = ''
}

async function handleSubmit() {
  isSubmitting.value = true
  submitError.value = ''
  submitSuccess.value = ''
  reservationId.value = null

  try {
    const response = await fetch(`${apiBase}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        date: form.date,
        time: form.time,
        note: form.note,
      }),
    })

    let payload: ReservationApiResponse | null = null

    try {
      payload = (await response.json()) as ReservationApiResponse
    } catch {
      payload = null
    }

    if (!response.ok) {
      throw new Error(payload?.error ?? 'Nepodarilo se odeslat rezervaci. Zkuste to znovu.')
    }

    submitSuccess.value = payload?.message ?? 'Rezervace byla uspesne odeslana.'
    reservationId.value = typeof payload?.reservationId === 'number' ? payload.reservationId : null
    resetForm()
  } catch (error) {
    submitError.value = error instanceof Error
      ? error.message
      : 'Doslo k necekane chybe. Zkuste to prosim znovu.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="pt-28 md:pt-36 pb-24">
    <section class="max-w-3xl mx-auto px-6 md:px-10">
      <div class="text-center mb-12">
        <span class="text-xs font-semibold tracking-[0.3em] uppercase text-accent">Rezervace</span>
        <h1 class="mt-3 text-4xl md:text-5xl font-bold text-white">Rezervujte si termín</h1>
        <p class="mt-4 text-text-secondary max-w-md mx-auto">
          Vyberte si službu, datum a čas. Ozveme se vám s&nbsp;potvrzením.
        </p>
      </div>

      <form class="glass-card p-8 md:p-12 space-y-6" @submit.prevent="handleSubmit">
        <!-- Name & email -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs font-medium tracking-wide text-text-secondary mb-2">Jméno</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="Vaše jméno"
            />
          </div>
          <div>
            <label class="block text-xs font-medium tracking-wide text-text-secondary mb-2">E-mail</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="vas@email.cz"
            />
          </div>
        </div>

        <!-- Phone & service -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs font-medium tracking-wide text-text-secondary mb-2">Telefon</label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="+420 ..."
            />
          </div>
          <div>
            <label class="block text-xs font-medium tracking-wide text-text-secondary mb-2">Služba</label>
            <select
              v-model="form.service"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none"
            >
              <option value="" disabled class="bg-surface">Vyberte službu</option>
              <option v-for="s in services" :key="s" :value="s" class="bg-surface">{{ s }}</option>
            </select>
          </div>
        </div>

        <!-- Date & time -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-xs font-medium tracking-wide text-text-secondary mb-2">Datum</label>
            <input
              v-model="form.date"
              type="date"
              required
              :min="minDate"
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <div>
            <label class="block text-xs font-medium tracking-wide text-text-secondary mb-2">Čas</label>
            <select
              v-model="form.time"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none"
            >
              <option value="" disabled class="bg-surface">Vyberte čas</option>
              <option v-for="t in times" :key="t" :value="t" class="bg-surface">{{ t }}</option>
            </select>
          </div>
        </div>

        <!-- Note -->
        <div>
          <label class="block text-xs font-medium tracking-wide text-text-secondary mb-2">Poznámka</label>
          <textarea
            v-model="form.note"
            rows="3"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
            placeholder="Další požadavky..."
          ></textarea>
        </div>

        <div v-if="submitError" class="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {{ submitError }}
        </div>

        <div v-if="submitSuccess" class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          <p>{{ submitSuccess }}</p>
          <p v-if="reservationId !== null" class="mt-1 text-xs text-emerald-200/80">ID rezervace: #{{ reservationId }}</p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full glass-strong rounded-xl py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 glow-accent"
          :class="isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white/25 cursor-pointer'"
        >
          {{ isSubmitting ? 'Odesilam rezervaci...' : 'Odeslat rezervaci' }}
        </button>
      </form>
    </section>
  </div>
</template>
