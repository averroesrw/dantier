<script setup lang="ts">
const galleryImages = [
  { src: './public/pictures/g-1.jpg', alt: 'Galerie 1' },
  { src: './public/pictures/g-2.jpg', alt: 'Galerie 2' },
  { src: './public/pictures/g-3.jpg', alt: 'Galerie 3' },
  { src: './public/pictures/g-4.jpg', alt: 'Galerie 4' },
  { src: './public/pictures/g-5.jpg', alt: 'Galerie 5' },
  { src: './public/pictures/g-6.jpg', alt: 'Galerie 6' },
]
</script>

<template>
  <div class="pt-28 md:pt-36">
    <!-- About section -->
    <section class="max-w-5xl mx-auto px-6 md:px-10 mb-24 md:mb-36">
      <div class="text-center mb-12">
        <span class="text-xs font-semibold tracking-[0.3em] uppercase text-accent">O nás</span>
        <h1 class="mt-3 text-4xl md:text-5xl font-bold text-white">Kdo jsme</h1>
      </div>

      <div class="glass-card p-8 md:p-14">
        <p class="text-base md:text-lg leading-loose text-text-secondary text-center">
          Vítejte v kadeřnickém salonu Dantier, vaší oáze klidu a krásy v samém srdci historického Českého Krumlova. Věříme, že vlasy jsou korunou každé ženy i muže, a proto k nim přistupujeme s maximální individuální péčí. Náš tým sleduje nejnovější trendy ve střizích a technikách barvení, abychom vám mohli nabídnout moderní vzhled, který dokonale sedne k vaší osobnosti. Spojujeme profesionální dovednosti s prémiovou vlasovou kosmetikou, díky čemuž od nás odejdete nejen s perfektním účesem, ale především se zdravými a vyživenými vlasy. Zastavte se u nás, odpočiňte si od každodenního shonu a nechte se hýčkat.
        </p>
      </div>
    </section>

    <!-- Gallery section -->
    <section class="max-w-7xl mx-auto px-6 md:px-10 pb-24 md:pb-36">
      <div class="flex items-center justify-between mb-10">
        <div>
          <span class="text-xs font-semibold tracking-[0.3em] uppercase text-accent">Galerie</span>
          <h2 class="mt-2 text-3xl md:text-4xl font-bold text-white">Naše práce</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <div
          v-for="(img, i) in galleryImages"
          :key="i"
          class="group relative aspect-square rounded-2xl overflow-hidden glass-card p-0"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </section>
  </div>
</template>
