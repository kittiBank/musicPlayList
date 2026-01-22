<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#000000] via-[#121212] to-[#1a1a1a] p-6 md:p-12"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12"
      >
        <h2 class="text-4xl md:text-5xl font-bold text-gray-100">
          My Playlist
        </h2>
        <button
          class="bg-[#1DB954] hover:bg-[#1ed760] hover:shadow-lg hover:-translate-y-0.5 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md w-full md:w-auto"
        >
          + Add Playlist
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-if="playlists.length === 0"
        class="text-center py-16 text-gray-400"
      >
        <h3 class="text-2xl md:text-3xl text-gray-200 mb-2">
          No playlists yet
        </h3>
        <p class="text-lg">Create your first playlist to get started</p>
      </div>

      <!-- Playlist Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="playlist in playlists"
          :key="playlist.id"
          class="bg-[#181818] border border-[rgba(29,185,84,0.2)] rounded-lg p-6 text-center text-gray-100 hover:bg-[#282828] hover:border-[rgba(29,185,84,0.5)] hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-pointer shadow-md"
        >
          <div
            class="w-full aspect-square bg-gradient-to-br from-[#1DB954] to-[#169c46] rounded-lg flex items-center justify-center text-5xl mb-4"
          >
            {{ playlist.icon }}
          </div>
          <h4 class="text-lg font-semibold text-[#1DB954] mb-1">
            {{ playlist.name }}
          </h4>
          <p class="text-gray-500 text-sm">{{ playlist.songs }} songs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Playlist {
  id: number;
  name: string;
  songs: number;
  icon: string;
}

export default defineComponent({
  name: "MyPlaylistView",
  data() {
    return {
      playlists: [] as Playlist[],
    };
  },
});
</script>
