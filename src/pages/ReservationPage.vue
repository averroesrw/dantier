<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'

interface ReservationApiResponse {
  reservationId?: number
  message?: string
  error?: string
  emailSent?: boolean
  emailError?: string
  reservedTimes?: string[]
  date?: string
}

interface CalendarDay {
  date: string
  day: number
  isDisabled: boolean
  isSelected: boolean
  isToday: boolean
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
const PHONE_RE = /^[+]?([0-9\s()-]{6,20})$/

const isSubmitting = ref(false)
const submitError = ref('')
const submitWarning = ref('')
const submitSuccess = ref('')
const reservationId = ref<number | null>(null)
const reservedTimes = ref<string[]>([])
const isLoadingSlots = ref(false)
const slotsError = ref('')
const isPickerOpen = ref(false)

const today = new Date()
today.setHours(0, 0, 0, 0)

const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const monthNames = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec',
]

const weekdayLabels = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDate(value: string): Date {
  const [year, month, day] = value.split('-').map((part) => Number(part))
  return new Date(year, month - 1, day)
}

function setSelectedDate(value: string) {
  const parsed = parseDate(value)
  if (parsed < today) {
    return
  }

  form.date = value
  currentMonth.value = parsed.getMonth()
  currentYear.value = parsed.getFullYear()
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.service = ''
  form.date = ''
  form.time = ''
  form.note = ''
  isPickerOpen.value = false
}

function isPhoneValid(value: string): boolean {
  if (!value.trim()) {
    return true
  }

  return PHONE_RE.test(value.trim())
}

const selectedDateLabel = computed(() => {
  if (!form.date) {
    return 'Nevybrano'
  }

  const date = parseDate(form.date)
  return date.toLocaleDateString('cs-CZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const selectedDateTimeLabel = computed(() => {
  if (!form.date) {
    return 'Vyberte datum a cas'
  }

  const dateLabel = selectedDateLabel.value
  const timeLabel = form.time ? form.time : 'Vyberte cas'
  return `${dateLabel} · ${timeLabel}`
})

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const totalDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const offset = (firstDay.getDay() + 6) % 7
  const days: Array<CalendarDay | null> = []

  for (let i = 0; i < offset; i += 1) {
    days.push(null)
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const dateObj = new Date(currentYear.value, currentMonth.value, day)
    const dateValue = formatDate(dateObj)
    const isDisabled = dateObj < today

    days.push({
      date: dateValue,
      day,
      isDisabled,
      isSelected: form.date === dateValue,
      isToday: formatDate(today) === dateValue,
    })
  }

  return days
})

const canGoPrevMonth = computed(() => {
  if (currentYear.value > today.getFullYear()) {
    return true
  }

  return currentYear.value === today.getFullYear() && currentMonth.value > today.getMonth()
})

function goPrevMonth() {
  if (!canGoPrevMonth.value) {
    return
  }

  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value -= 1
  } else {
    currentMonth.value -= 1
  }
}

function goNextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value += 1
  } else {
    currentMonth.value += 1
  }
}

const reservedTimesSet = computed(() => new Set(reservedTimes.value))

function isReserved(time: string): boolean {
  return reservedTimesSet.value.has(time)
}

function selectTime(time: string) {
  if (!form.date || isReserved(time)) {
    return
  }

  form.time = time
  isPickerOpen.value = false
}

async function loadReservedTimes(date: string) {
  isLoadingSlots.value = true
  slotsError.value = ''

  try {
    const response = await fetch(`${apiBase}/reservations?date=${encodeURIComponent(date)}`)
    const payload = (await response.json()) as ReservationApiResponse

    if (!response.ok) {
      throw new Error(payload?.error ?? 'Nepodarilo se nacist obsazene terminy.')
    }

    reservedTimes.value = Array.isArray(payload.reservedTimes) ? payload.reservedTimes : []

    if (form.time && reservedTimesSet.value.has(form.time)) {
      form.time = ''
    }
  } catch (error) {
    slotsError.value = error instanceof Error
      ? error.message
      : 'Nepodarilo se nacist obsazene terminy.'
  } finally {
    isLoadingSlots.value = false
  }
}

watch(
  () => form.date,
  (value) => {
    if (!value) {
      reservedTimes.value = []
      form.time = ''
      return
    }

    loadReservedTimes(value)
  },
  { immediate: true }
)

setSelectedDate(formatDate(today))

async function handleSubmit() {
  submitError.value = ''
  submitWarning.value = ''
  submitSuccess.value = ''
  reservationId.value = null

  if (!form.date) {
    submitError.value = 'Vyberte datum rezervace.'
    return
  }

  if (!form.time) {
    submitError.value = 'Vyberte cas rezervace.'
    return
  }

  if (!isPhoneValid(form.phone)) {
    submitError.value = 'Telefon musi byt prazdny nebo ve spravnem formatu.'
    return
  }

  if (isReserved(form.time)) {
    submitError.value = 'Vybrany termin je obsazeny. Zvolte prosim jiny cas.'
    return
  }

  isSubmitting.value = true

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

    const payload = (await response.json()) as ReservationApiResponse

    if (!response.ok) {
      throw new Error(payload?.error ?? 'Nepodarilo se odeslat rezervaci. Zkuste to znovu.')
    }

    submitSuccess.value = payload?.message ?? 'Rezervace byla uspesne odeslana.'
    reservationId.value = typeof payload?.reservationId === 'number' ? payload.reservationId : null

    if (payload?.emailSent === false) {
      submitWarning.value = payload?.emailError ?? 'Potvrzovaci email se nepodarilo odeslat.'
    }

    resetForm()
    setSelectedDate(formatDate(today))
    isPickerOpen.value = false
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
            <label class="block text-xs font-medium tracking-wide text-text-secondary mb-2">Telefon (nepovinné)</label>
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
        <div class="relative">
          <button
            type="button"
            class="w-full text-left glass-card px-6 py-4 flex items-center justify-between"
            @click="isPickerOpen = !isPickerOpen"
            aria-haspopup="dialog"
            :aria-expanded="isPickerOpen"
          >
            <div>
              <span class="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary">Datum a čas</span>
              <p class="mt-2 text-base text-white capitalize">{{ selectedDateTimeLabel }}</p>
            </div>
            <span class="text-xl text-white/70">▾</span>
          </button>

          <div v-if="isPickerOpen" class="fixed inset-0 z-30" @click="isPickerOpen = false" />

          <div
            v-if="isPickerOpen"
            class="absolute z-40 mt-3 w-full rounded-3xl border border-white/10 glass-dark p-6 shadow-2xl"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <span class="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary">Vybraný termín</span>
                    <p class="mt-2 text-base text-white capitalize">{{ selectedDateLabel }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      class="w-9 h-9 rounded-full border border-white/10 text-white/80 hover:text-white transition-colors"
                      :class="canGoPrevMonth ? 'hover:bg-white/10' : 'opacity-40 cursor-not-allowed'"
                      :disabled="!canGoPrevMonth"
                      @click="goPrevMonth"
                      aria-label="Předchozí měsíc"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      class="w-9 h-9 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      @click="goNextMonth"
                      aria-label="Další měsíc"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-lg font-semibold text-white">{{ monthNames[currentMonth] }} {{ currentYear }}</h3>
                </div>

                <div class="grid grid-cols-7 gap-2 text-xs text-text-muted mb-2">
                  <span v-for="label in weekdayLabels" :key="label" class="text-center">{{ label }}</span>
                </div>

                <div class="grid grid-cols-7 gap-2">
                  <template v-for="(day, index) in calendarDays" :key="day ? day.date : `empty-${index}`">
                    <div v-if="!day" class="h-9" />
                    <button
                      v-else
                      type="button"
                      class="h-9 rounded-lg text-sm font-medium transition-all"
                      :class="[
                        day.isDisabled
                          ? 'bg-white/5 text-text-muted border border-white/5 cursor-not-allowed'
                          : day.isSelected
                            ? 'glass-strong text-white'
                            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
                        day.isToday && !day.isSelected ? 'ring-1 ring-accent/60' : ''
                      ]"
                      :disabled="day.isDisabled"
                      @click="setSelectedDate(day.date)"
                    >
                      {{ day.day }}
                    </button>
                  </template>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <span class="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary">Dostupné časy</span>
                    <p class="mt-2 text-sm text-text-muted">
                      {{ form.date ? `Datum: ${form.date}` : 'Nejprve zvolte datum' }}
                    </p>
                  </div>
                  <span v-if="isLoadingSlots" class="text-xs text-text-muted">Načítám...</span>
                </div>

                <div v-if="slotsError" class="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100 mb-4">
                  {{ slotsError }}
                </div>

                <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  <button
                    v-for="time in times"
                    :key="time"
                    type="button"
                    :disabled="!form.date || isReserved(time)"
                    class="rounded-xl py-2 text-sm font-medium transition-all"
                    :class="[
                      !form.date
                        ? 'bg-white/5 text-text-muted border border-white/5 cursor-not-allowed'
                        : isReserved(time)
                          ? 'bg-neutral-600/60 text-text-muted border border-white/5 cursor-not-allowed'
                          : form.time === time
                            ? 'glass-strong text-white'
                            : 'glass text-white hover:bg-white/10'
                    ]"
                    @click="selectTime(time)"
                  >
                    {{ time }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Note -->
        <div>
          <label class="block text-xs font-medium tracking-wide text-text-secondary mb-2">Poznámka (nepovinné)</label>
          <textarea
            v-model="form.note"
            rows="3"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
            placeholder="Další požadavky (nepovinné)..."
          ></textarea>
        </div>

        <div v-if="submitError" class="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {{ submitError }}
        </div>

        <div v-if="submitWarning" class="rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {{ submitWarning }}
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
