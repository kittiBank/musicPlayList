<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#16213e] p-6 md:p-12">
    <div class="max-w-4xl mx-auto">
      <div class="text-center">
        <h2 class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#64b5f6] to-[#81c784] bg-clip-text text-transparent">
          Welcome to Music Playlist
        </h2>
        <p class="text-xl md:text-2xl text-gray-400 mb-8">
          Your personal music collection manager
        </p>
        <button class="bg-gradient-to-r from-[#64b5f6] to-[#2196f3] hover:shadow-lg hover:-translate-y-0.5 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md">
          Browse Music
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView'
})
</script>
