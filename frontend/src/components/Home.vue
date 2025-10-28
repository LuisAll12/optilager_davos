<template>
  <div id="home" class="min-h-screen bg-gradient-to-b from-navy-900 to-navy-800">
    <NavBar />

    <main class="mx-auto max-w-6xl px-4">
      <!-- Hero -->
      <section class="relative mt-8 md:mt-10 rounded-smooth bg-black shadow-soft overflow-hidden">
        <div class="aspect-[16/6] md:aspect-[16/5] flex items-center justify-between px-6 md:px-12">
          <div class="space-y-2">
            <h1 class="text-2xl md:text-3xl font-extrabold tracking-wider leading-tight">
              OPTI LAGER<br />DAVOS
            </h1>
          </div>

          <button
            aria-label="Play"
            class="group grid place-items-center h-16 w-16 md:h-20 md:w-20 rounded-full border border-white/50 hover:border-white transition"
          >
            <span class="block h-10 w-10 md:h-12 md:w-12 rounded-full grid place-items-center bg-white/10 group-hover:bg-white/20 transition">
              <svg viewBox="0 0 24 24" class="h-6 w-6 fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </div>
      </section>

      <!-- Info Doppelspalten -->
      <section id="info" class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="order-2 md:order-1 md:col-span-2">
          <p class="text-sm leading-6 text-white/80">
            Lorem ipsum dolor sit amet consectetur. Viverra molestie gravida ultricies arcu integer. Nec facilisis
            elementum laoreet dictumst. In non id egestas at eu aenean malesuada. Non sit egestas eu a arcu
            habitant.
          </p>
        </div>
        <div class="order-1 md:order-2">
          <div class="h-24 md:h-28 w-full rounded-md bg-white/70"></div>
        </div>

        <div class="order-3">
          <div class="h-24 md:h-28 w-full rounded-md bg-white/70"></div>
        </div>
        <div class="order-4 md:col-span-2">
          <p class="text-sm leading-6 text-white/80">
            Lorem ipsum dolor sit amet consectetur. Viverra molestie gravida ultricies arcu integer. Nec facilisis
            elementum laoreet dictumst. In non id egestas at eu aenean malesuada. Non sit egestas eu a arcu
            habitant.
          </p>
        </div>
      </section>

      <!-- Öffentliche Galerie -->
      <section class="mt-10">
        <h2 class="text-xs tracking-widest font-semibold text-white/90">
          ÖFFENTLICHE GALERIE
        </h2>

        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <GalleryCard />
          <GalleryCard />
          <GalleryCard />
          <GalleryCard />
        </div>
      </section>

      <!-- Anmeldung -->
      <section id="anmeldung" class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div class="md:col-span-1">
          <div class="h-40 rounded-smooth bg-slateglass border border-white/10 relative overflow-hidden">
            <svg viewBox="0 0 200 200" class="absolute inset-0 m-auto h-full w-full opacity-60">
              <path d="M20 180 C60 120, 40 60, 100 20 C160 60, 140 120, 180 180" fill="none" stroke="white" stroke-width="2" />
            </svg>
          </div>
        </div>

        <div class="md:col-span-2">
          <h3 class="text-xs tracking-widest font-semibold text-white/90">
            ANMELDUNG
          </h3>
          <p class="mt-3 text-sm text-white/80">
            Das Formular zur Teilnahme ist bereitgestellt. Registriere dich mit den notwendigen Angaben
            und sichere dir deinen Platz. Die Plätze sind limitiert. Informationen zu Terminen und
            Konditionen findest du im Dokumentbereich.
          </p>

          <a
            href="#jetzt-anmelden"
            class="mt-4 inline-block text-xs font-semibold px-3 py-1.5 rounded-md bg-white text-navy-900 hover:opacity-90"
          >
            Jetzt anmelden
          </a>
        </div>
      </section>

      <!-- Blog Teaser -->
      <section id="blog" class="mt-12">
        <h4 class="text-xs tracking-widest font-semibold text-white/90">BLOGS</h4>

        <div class="mt-4">
          <div
            class="rounded-[18px] md:rounded-[22px] bg-slateglass border border-white/10 shadow-soft px-6 py-10 md:px-10 md:py-14"
          >
            <div class="h-24 w-28 mx-auto rounded-md bg-white/70"></div>
            <p class="mt-6 text-center text-sm text-white/80 max-w-2xl mx-auto">
              Teaser für aktuelle Beiträge und Insights. Klicke dich durch die neuesten Stories
              und Impressionen aus Davos.
            </p>
          </div>
        </div>
      </section>

      <!-- Footer Spacer -->
      <div class="h-16"></div>
    </main>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
export default { components: { NavBar } }

const GalleryCard = {
  name: 'GalleryCard',
  template: `
    <div class="aspect-[3/4] rounded-md bg-white/70 grid place-items-center">
      <svg viewBox="0 0 24 24" class="w-8 h-8 opacity-60">
        <path fill="currentColor" d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14h18ZM5 5h14v8.59l-3.3-3.3a1 1 0 0 0-1.4 0L11 12.59 9.7 11.3a1 1 0 0 0-1.4 0L5 14.59V5Z"/>
      </svg>
    </div>
  `,
}
</script>