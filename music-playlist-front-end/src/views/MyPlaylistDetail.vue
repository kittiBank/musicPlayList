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
        @play="handlePlayRandom"
      />

      <!-- Playlist Details Table -->
      <MyPlaylistDetailsTable 
        ref="playlistTableRef"
        :playlistId="playlistId" 
        @songsLoaded="handleSongsLoaded" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import MyPlaylistHeader from "../components/MyPlaylistHeader.vue";
import MyPlaylistDetailsTable from "../components/MyPlaylistDetailsTable.vue";
import { getPlaylistById, type Playlist } from "../services/playlistService";
import type { DeezerTrack } from "../services/deezerService";

const route = useRoute();

const playlistId = computed(() => route.params.id as string);
const currentPlaylist = ref<Playlist | null>(null);
const loadedSongs = ref<DeezerTrack[]>([]);
const playlistTableRef = ref<InstanceType<typeof MyPlaylistDetailsTable> | null>(null);

// คำนวณจำนวนเพลงและระยะเวลาจริงจากข้อมูลที่โหลดมา
const totalSongs = computed(() => loadedSongs.value.length);
const totalDuration = computed(() => {
  return loadedSongs.value.reduce((total, song) => total + (song.duration || 0), 0);
});

/**
 * โหลดข้อมูล playlist
 */
const loadPlaylist = async () => {
  try {
    const playlist = await getPlaylistById(playlistId.value);
    currentPlaylist.value = playlist;
  } catch (err) {
    console.error("Error loading playlist:", err);
  }
};

/**
 * รับข้อมูลเพลงที่โหลดมาจาก MyPlaylistDetailsTable
 */
const handleSongsLoaded = (songs: DeezerTrack[]) => {
  loadedSongs.value = songs;
};

/**
 * เล่นเพลงแบบสุ่มเมื่อกดปุ่ม play
 */
const handlePlayRandom = () => {
  if (playlistTableRef.value) {
    playlistTableRef.value.playRandomSong();
  }
};

onMounted(() => {
  loadPlaylist();
});
</script>

<style scoped>
</style>
