<template>
  <div class="pt-28 md:pt-36 pb-24">
    <section class="max-w-5xl mx-auto px-6 md:px-10">
      <div class="text-center mb-14">
        <span class="text-xs font-semibold tracking-[0.3em] uppercase text-accent">Kontakt</span>
        <h1 class="mt-3 text-4xl md:text-5xl font-bold text-white">Kde nás najdete</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Contact info -->
        <div class="glass-card p-8 md:p-10 space-y-8">
          <div>
            <h3 class="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary mb-3">Adresa</h3>
            <p class="text-white text-lg">Filhausova 67</p>
            <p class="text-text-secondary">329 05 Zátong</p>
          </div>

          <div>
            <h3 class="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary mb-3">Telefon</h3>
            <a href="tel:+420123456789" class="text-white text-lg hover:text-accent transition-colors">
              +420 799 016 333
            </a>
          </div>

          <div>
            <h3 class="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary mb-3">E-mail</h3>
            <a href="mailto:info@dantier.cz" class="text-white text-lg hover:text-accent transition-colors">
              info@dantier.cz
            </a>
          </div>

          <div>
            <h3 class="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary mb-3">Otevírací doba</h3>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="text-text-secondary">Pondělí – Pátek</span>
                <span class="text-white">9:00 – 18:00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-secondary">Sobota</span>
                <span class="text-white">9:00 – 14:00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-secondary">Neděle</span>
                <span class="text-text-muted">Zavřeno</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Map / visual card -->
        <div class="glass-card p-0 overflow-hidden rounded-2xl min-h-100 flex flex-col">
          <div class="flex-1 bg-white/5 flex items-center justify-center">
            <div class="text-center p-8">
              <div class="w-16 h-16 rounded-full glass-strong flex items-center justify-center mx-auto mb-4">
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-white font-semibold mb-1">Dantier Salon</h3>
              <p class="text-text-secondary text-sm">Filhausova 67, Zátong</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block mt-5 glass rounded-full px-6 py-2.5 text-xs font-medium tracking-wide text-white hover:bg-white/15 transition-all duration-300"
              >
                Otevřít v mapách →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
