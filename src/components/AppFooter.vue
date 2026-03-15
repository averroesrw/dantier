<template>
  <footer class="glass border-t border-glass-border mt-auto">
    <div class="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div>
          <h3 class="font-logo italic text-2xl text-white mb-3">Dantier</h3>
          <p class="text-sm text-text-muted leading-relaxed">
            Prémiové kadeřnictví s dlouholetou tradicí a moderním přístupem ke kráse.
          </p>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary mb-4">Navigace</h4>
          <nav class="flex flex-col gap-2">
            <RouterLink to="/" class="text-sm text-text-muted hover:text-white transition-colors">Domů</RouterLink>
            <RouterLink to="/o-nas" class="text-sm text-text-muted hover:text-white transition-colors">O nás</RouterLink>
            <RouterLink to="/rezervace" class="text-sm text-text-muted hover:text-white transition-colors">Rezervace</RouterLink>
            <RouterLink to="/kontakt" class="text-sm text-text-muted hover:text-white transition-colors">Kontakt</RouterLink>
          </nav>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-xs font-semibold tracking-[0.2em] uppercase text-text-secondary mb-4">Kontakt</h4>
          <div class="flex flex-col gap-2 text-sm text-text-muted">
            <span>Filhausova 67, Zátong</span>
            <span>+420 799 016 333</span>
            <span>info@dantier.cz</span>
          </div>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-xs text-text-muted">&copy; {{ new Date().getFullYear() }} Dantier. Všechna práva vyhrazena.</p>
        <div class="flex gap-4 text-xs text-text-muted">
          <span>CS</span>
          <span class="opacity-40">EN</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
