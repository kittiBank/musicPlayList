<template>
  <div class="px-4 md:px-6 pb-6">
    <!-- Filter Bar -->
    <div class="mb-4 max-w-md">
      <div class="relative">
        <div
          class="absolute inset-y-0 left-3 flex items-center pointer-events-none"
        >
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
            />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for songs, artists, or albums..."
          class="w-full bg-[#1a1a1a] text-white rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1db954] placeholder-gray-500"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="bg-[#121212] rounded-lg overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-800">
            <th
              class="text-left px-4 py-2 text-gray-400 font-medium text-xs uppercase tracking-wider"
            ></th>
            <th
              class="text-left px-4 py-2 text-gray-400 font-medium text-xs uppercase tracking-wider"
            >
              Title
            </th>
            <th
              class="text-left px-4 py-2 text-gray-400 font-medium text-xs uppercase tracking-wider"
            >
              Artist
            </th>
            <th
              class="text-left px-4 py-2 text-gray-400 font-medium text-xs uppercase tracking-wider"
            >
              Album
            </th>
            <th
              class="text-left px-4 py-2 text-gray-400 font-medium text-xs uppercase tracking-wider"
            >
              Release Date
            </th>
            <th
              class="text-right px-4 py-2 text-gray-400 font-medium text-xs uppercase tracking-wider"
            >
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(song, index) in filteredSongs"
            :key="song.id"
            class="border-b border-gray-800/50 hover:bg-[#1a1a1a] transition-colors cursor-pointer group"
          >
            <td class="px-4 py-2 text-gray-400 text-xs">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2">
              <div
                class="text-white text-sm group-hover:text-[#1db954] transition-colors"
              >
                {{ song.title }}
              </div>
            </td>
            <td class="px-4 py-2 text-gray-400 text-xs">
              {{ song.artist }}
            </td>
            <td class="px-4 py-2 text-gray-400 text-xs">
              {{ song.album }}
            </td>
            <td class="px-4 py-2 text-gray-400 text-xs">
              {{ song.releaseDate }}
            </td>
            <td class="px-4 py-2 text-gray-400 text-xs text-right">
              {{ song.duration }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div
        v-if="filteredSongs.length === 0"
        class="text-center py-12 text-gray-400"
      >
        <svg
          class="w-12 h-12 mx-auto mb-3 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
        <p class="text-sm">No songs found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { musics, type Music } from "../mock/musicData";

const searchQuery = ref("");

// Use songs from mock data
const songs = ref<Music[]>(musics);

// Filter songs based on search query
const filteredSongs = computed(() => {
  if (!searchQuery.value) {
    return songs.value;
  }

  const query = searchQuery.value.toLowerCase();
  return songs.value.filter(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query),
  );
});
</script>

<style scoped>
tbody tr {
  height: 48px;
}
</style>
