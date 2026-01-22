<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#000000] via-[#121212] to-[#1a1a1a] p-4 md:p-6"
  >
    <div class="max-w-full">
      <div class="text-center mb-6">
        <h2
          class="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#1DB954] to-[#1ed760] bg-clip-text text-transparent"
        >
          Welcome to Music Playlist
        </h2>
        <p class="text-lg md:text-xl text-gray-400 mb-6">
          Your personal music collection manager
        </p>

        <!-- Search Bar -->
        <div class="flex justify-center gap-3">
          <div class="relative flex-1 max-w-md">
            <div class="absolute left-4 top-1/2 -translate-y-1/2">
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search your music..."
              class="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#282828] text-white placeholder-gray-500 border-2 border-transparent hover:border-[#1DB954] focus:border-[#1DB954] focus:outline-none transition-all duration-300 text-sm"
              @keyup.enter="handleSearch"
            />
          </div>
          <!-- search btn -->
          <button
            @click="handleSearch"
            class="search-btn px-6 py-2.5 rounded-2xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <!-- Music List Section -->
    <MusicList :search-query="searchQuery" :trigger-search="searchTrigger" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MusicList from "../components/MusicList.vue";

const searchQuery = ref("");
const searchTrigger = ref(0);

const handleSearch = () => {
  searchTrigger.value++;
};
</script>

<style scoped>
.search-btn {
  background-color: #1DB954;
}

.search-btn:hover {
  background-color: #1ed760;
}
</style>
