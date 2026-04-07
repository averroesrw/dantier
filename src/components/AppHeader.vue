<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isOpen = ref(false)
const scrolled = ref(false)

const navLinks = [
  { to: '/', label: 'Domů' },
  { to: '/o-nas', label: 'O nás' },
  { to: '/rezervace', label: 'Rezervace' },
  { to: '/kontakt', label: 'Kontakt' },
]

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'glass py-3' : 'py-5'"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-baseline gap-3 group">
        <span class="font-logo italic text-3xl md:text-4xl tracking-wide text-white group-hover:text-accent transition-colors duration-300">
          Dantier
        </span>
        <span class="text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase hidden sm:block">
          Kadeřnictví
        </span>
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="relative px-4 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-300"
          :class="route.path === link.to
            ? 'text-white glass-strong'
            : 'text-text-secondary hover:text-white hover:bg-white/5'"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl glass"
        @click="isOpen = !isOpen"
        aria-label="Menu"
      >
        <div class="flex flex-col gap-1.5 w-5">
          <span
            class="block h-[2px] bg-white rounded transition-all duration-300"
            :class="isOpen ? 'rotate-45 translate-y-[8px]' : ''"
          />
          <span
            class="block h-[2px] bg-white rounded transition-all duration-300"
            :class="isOpen ? 'opacity-0' : ''"
          />
          <span
            class="block h-[2px] bg-white rounded transition-all duration-300"
            :class="isOpen ? '-rotate-45 -translate-y-[8px]' : ''"
          />
        </div>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isOpen" class="md:hidden glass-dark mt-2 mx-4 rounded-2xl p-4">
        <nav class="flex flex-col gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-3 text-base font-medium rounded-xl transition-all duration-200"
            :class="route.path === link.to
              ? 'text-white bg-white/10'
              : 'text-text-secondary hover:text-white hover:bg-white/5'"
            @click="isOpen = false"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>
