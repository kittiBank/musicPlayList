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
        <div class="flex justify-center">
          <div class="relative w-full max-w-xl">
            <div class="absolute left-6 top-1/2 -translate-y-1/2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search your music..." 
              class="w-full pl-14 pr-6 py-4 rounded-3xl bg-gray-800 text-white placeholder-gray-500 border-2 border-transparent hover:border-[#64b5f6] focus:border-[#64b5f6] focus:outline-none transition-all duration-300"
            />
          </div>
        </div>
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
