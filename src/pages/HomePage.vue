<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const heroVisible = ref(false)
onMounted(() => {
  setTimeout(() => (heroVisible.value = true), 100)
})

const features = [
  { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>', title: 'Střihy', desc: 'Moderní i klasické střihy přizpůsobené vašemu stylu.' },
  { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="#FFFFFF"/><circle cx="17.5" cy="10.5" r=".5" fill="#FFFFFF"/><circle cx="8.5" cy="7.5" r=".5" fill="#FFFFFF"/><circle cx="6.5" cy="12.5" r=".5" fill="#FFFFFF"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`, title: 'Barvení', desc: 'Profesionální barvení s prémiovou kosmetikou.' },
  { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M14 10a2 2 0 0 0-2-2"/><path d="M21 4l-1 1"/><path d="M18 2l-1 1"/></svg>`, title: 'Péče', desc: 'Ošetření a regenerace pro zdravé vlasy.' },
]
</script>

<template>
  <div>
    <!-- Hero with video -->
    <section class="relative w-full h-screen overflow-hidden">
      <video
        autoplay
        loop
        muted
        playsinline
        class="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/mpv.mp4" type="video/mp4" />
      </video>

      <!-- Overlay gradient -->
      <div class="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-surface" />

      <!-- Hero content -->
      <div
        class="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-20 md:pb-28 transition-all duration-1000"
        :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <h1 class="font-logo italic text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-lg mb-4">
          Dantier
        </h1>
        <p class="text-lg md:text-xl text-white/80 font-light max-w-xl mb-8 leading-relaxed">
          Objevte svůj nový styl. Poskytujeme prvotřídní kadeřnické služby a péči, díky které budou vaše vlasy zářit zdravím.
        </p>

        <div class="flex flex-wrap gap-4">
          <RouterLink
            to="/rezervace"
            class="glass-strong rounded-full px-8 py-3 text-sm font-semibold tracking-wide text-white hover:bg-white/25 transition-all duration-300 glow-accent"
          >
            Rezervovat termín
          </RouterLink>
          <RouterLink
            to="/o-nas"
            class="glass rounded-full px-8 py-3 text-sm font-medium tracking-wide text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            Poznat nás
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-36">
      <div class="text-center mb-16">
        <span class="text-xs font-semibold tracking-[0.3em] uppercase text-accent">Služby</span>
        <h2 class="mt-3 text-3xl md:text-4xl font-bold text-white">Co pro vás děláme</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="glass-card p-8 md:p-10 text-center"
        >
          <span class="mb-5 flex justify-center" v-html="f.icon"></span>
          <h3 class="text-lg font-semibold text-white mb-3">{{ f.title }}</h3>
          <p class="text-sm text-text-secondary leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA band -->
    <section class="relative overflow-hidden">
      <div class="glass-dark rounded-3xl mx-4 md:mx-10 lg:mx-20 p-12 md:p-20 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Připraveni na změnu?</h2>
        <p class="text-text-secondary max-w-lg mx-auto mb-8">
          Rezervujte si termín online a nechte se hýčkat v&nbsp;příjemném prostředí našeho salonu.
        </p>
        <RouterLink
          to="/rezervace"
          class="inline-block glass-strong rounded-full px-10 py-4 text-sm font-semibold tracking-wide text-white hover:bg-white/25 transition-all duration-300 glow-accent"
        >
          Rezervovat termín
        </RouterLink>
      </div>
    </section>

    <div class="h-24" />
  </div>
</template>
