<template>
  <div
    class="h-screen bg-gradient-to-br from-[#000000] via-[#121212] to-[#1a1a1a] overflow-y-auto"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Playlist Header -->
      <MyPlaylistHeader
        v-if="currentPlaylist"
        :playlist="currentPlaylist"
        :totalSongs="totalSongs"
        :totalDuration="totalDuration"
      />

      <!-- Playlist Details Table -->
      <MyPlaylistDetailsTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import MyPlaylistHeader from "../components/MyPlaylistHeader.vue";
import MyPlaylistDetailsTable from "../components/MyPlaylistDetailsTable.vue";
import { playlists } from "../mock/playlistData";

const route = useRoute();

const playlistId = computed(() => Number(route.params.id));

const currentPlaylist = computed(() => {
  return playlists.find((p) => p.id === playlistId.value);
});

// Mock data for demonstration
const totalSongs = computed(() => 15);
const totalDuration = computed(() => 3720);
</script>

<style scoped>
</style>
