<template>
  <div
    class="flex items-end gap-6 p-8 bg-gradient-to-b from-[#1a1a1a] to-transparent"
  >
    <!-- Playlist Image -->
    <div class="flex-shrink-0">
      <img
        :src="playlist.image"
        :alt="playlist.name"
        class="w-56 h-56 object-cover rounded-lg shadow-2xl"
      />
    </div>

    <!-- Playlist Info -->
    <div class="flex-1 pb-2">
      <!-- Playlist Label -->
      <p class="text-sm font-semibold text-white uppercase mb-2">Play list</p>

      <!-- Playlist Name -->
      <h1
        class="text-6xl font-bold text-white mb-4 hover:underline cursor-pointer"
      >
        {{ playlist.name }}
      </h1>

      <!-- Playlist Description -->
      <p class="text-sm text-gray-300 mb-4">
        {{ playlist.description }}
      </p>

      <!-- Stats and Play Button -->
      <div class="flex items-center gap-6">
        <!-- Play Button -->
        <button
          class="play-button px-12 py-3 rounded-full hover:scale-105 transition-all duration-200 shadow-xl"
          @click="handlePlay"
        >
          <span class="text-black font-bold text-base">Play</span>
        </button>

        <!-- Stats -->
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <span class="font-semibold">{{ totalSongs }} songs</span>
          <span>•</span>
          <span>{{ formattedDuration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Playlist } from "../mock/playlistData";

interface Props {
  playlist: Playlist;
  totalSongs: number;
  totalDuration: number;
}

const props = defineProps<Props>();

const formattedDuration = computed(() => {
  const hours = Math.floor(props.totalDuration / 3600);
  const minutes = Math.floor((props.totalDuration % 3600) / 60);

  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }
  return `${minutes} min`;
});

const handlePlay = () => {
  // Handle play functionality
  console.log("Playing playlist:", props.playlist.name);
};
</script>

<style scoped>
.play-button {
  background-color: #1db954;
}

.play-button:hover {
  background-color: #1ed760;
}
</style>
