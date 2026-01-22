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

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#1DB954] border-t-transparent"
      ></div>
      <p class="text-gray-400 mt-2">Loading songs...</p>
    </div>

    <!-- Table -->
    <div v-else class="bg-[#121212] rounded-lg overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-800">
            <th
              class="text-left px-4 py-2 text-gray-400 font-medium text-xs uppercase tracking-wider"
            ></th>
            <th
              class="text-left px-4 py-2 text-gray-400 font-medium text-xs uppercase tracking-wider"
            >
              Cover
            </th>
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
              Duration
            </th>
            <th
              class="text-left px-4 py-2 text-gray-400 font-medium text-xs uppercase tracking-wider"
            >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(song, index) in filteredSongs"
            :key="song.id"
            @click="handleRowClick(song.id)"
            :class="[
              'border-b border-gray-800/50 hover:bg-[#1a1a1a] transition-colors cursor-pointer group',
              { 'border-l-4 border-l-[#1db954]': playingSongId === song.id }
            ]"
          >
            <td class="px-4 py-2 text-gray-400 text-xs">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2">
              <img
                v-if="song.album?.cover_medium"
                :src="song.album.cover_medium"
                :alt="song.album?.title"
                class="w-10 h-10 rounded-md object-cover"
              />
            </td>
            <td class="px-4 py-2">
              <div
                class="text-white text-sm group-hover:text-[#1db954] transition-colors"
              >
                {{ song.title }}
              </div>
            </td>
            <td class="px-4 py-2 text-gray-400 text-xs">
              {{ song.artist?.name || song.artist }}
            </td>
            <td class="px-4 py-2 text-gray-400 text-xs">
              {{ song.album?.title || song.album }}
            </td>
            <td class="px-4 py-2 text-gray-400 text-xs">
              {{ formatDuration(song.duration) }}
            </td>
            <td class="px-4 py-2">
              <button
                @click.stop="handleDeleteSong(song.id)"
                class="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-gray-800"
                title="Remove from playlist"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div
        v-if="filteredSongs.length === 0 && !isLoading"
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
        <p class="text-sm">No songs in this playlist yet</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { getPlaylistById, removeSongFromPlaylist } from "../services/playlistService";
import deezerService, { type DeezerTrack } from "../services/deezerService";

const props = defineProps<{
  playlistId: string;
}>();

const emit = defineEmits<{
  songsLoaded: [songs: DeezerTrack[]];
}>();

const searchQuery = ref("");
const songs = ref<DeezerTrack[]>([]);
const isLoading = ref(false);
const playingSongId = ref<number | null>(null);
const audioElement = ref<HTMLAudioElement | null>(null);

/**
 * Format duration from seconds to mm:ss
 */
const formatDuration = (seconds?: number): string => {
  if (!seconds) return "-";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Filter songs based on search query
const filteredSongs = computed(() => {
  if (!searchQuery.value) {
    return songs.value;
  }

  const query = searchQuery.value.toLowerCase();
  return songs.value.filter((song) => {
    const title = song.title?.toLowerCase() || "";
    const artist = song.artist?.name?.toLowerCase() || "";
    const album = song.album?.title?.toLowerCase() || "";
    
    return title.includes(query) || artist.includes(query) || album.includes(query);
  });
});

/**
 * โหลดเพลงในplaylist
 */
const loadPlaylistSongs = async () => {
  isLoading.value = true;
  try {
    const playlist = await getPlaylistById(props.playlistId);
    
    if (playlist && playlist.songs && playlist.songs.length > 0) {
      // Fetch all songs by their IDs
      const songPromises = playlist.songs.map((songId) =>
        deezerService.getTrackById(songId)
      );
      const fetchedSongs = await Promise.all(songPromises);
      songs.value = fetchedSongs;
      emit('songsLoaded', fetchedSongs);
    } else {
      songs.value = [];
      emit('songsLoaded', []);
    }
  } catch (err) {
    console.error("Error loading playlist songs:", err);
    songs.value = [];
  } finally {
    isLoading.value = false;
  }
};

/**
 * เล่นหรือหยุดเพลง
 */
const handleRowClick = async (songId: number) => {
  await playSong(songId);
};

/**
 * เล่นเพลงตาม ID
 */
const playSong = async (songId: number) => {
  try {
    // ถ้ากดเพลงเดิมอีกรอบ ให้หยุดเพลง
    if (playingSongId.value === songId) {
      stopCurrentSong();
      return;
    }

    // หยุดเพลงที่กำลังเล่นอยู่ (ถ้ามี)
    stopCurrentSong();

    // ดึงข้อมูลเพลงจาก API
    const track = await deezerService.getTrackById(songId);
    
    if (track.preview) {
      // สร้าง audio element ใหม่
      audioElement.value = new Audio(track.preview);
      
      // เมื่อเพลงจบ ให้ reset state
      audioElement.value.onended = () => {
        playingSongId.value = null;
        audioElement.value = null;
      };
      
      // เล่นเพลง
      await audioElement.value.play();
      playingSongId.value = songId;
    } else {
      console.warn("No preview available for this track");
      alert("ไม่มีตัวอย่างเพลงนี้");
    }
  } catch (err) {
    console.error("Error playing song:", err);
    alert("ไม่สามารถเล่นเพลงได้");
  }
};

/**
 * เล่นเพลงแบบสุ่ม
 */
const playRandomSong = async () => {
  if (songs.value.length === 0) {
    alert("ไม่มีเพลงใน playlist นี้");
    return;
  }

  // สุ่มเพลง
  const randomIndex = Math.floor(Math.random() * songs.value.length);
  const randomSong = songs.value[randomIndex];
  
  if (randomSong) {
    await playSong(randomSong.id);
  }
};

/**
 * หยุดเพลงที่กำลังเล่นอยู่
 */
const stopCurrentSong = () => {
  if (audioElement.value) {
    audioElement.value.pause();
    audioElement.value = null;
  }
  playingSongId.value = null;
};

/**
 * ลบเพลงออกจาก playlist
 */
const handleDeleteSong = async (songId: number) => {
  try {
    // ถ้าเพลงที่กำลังลบคือเพลงที่กำลังเล่นอยู่ ให้หยุดเพลงก่อน
    if (playingSongId.value === songId) {
      stopCurrentSong();
    }
    
    await removeSongFromPlaylist(props.playlistId, songId);
    // Reload playlist songs after deletion
    await loadPlaylistSongs();
  } catch (err) {
    console.error("Error deleting song:", err);
    alert("Failed to delete song from playlist");
  }
};

// Watch for playlistId changes
watch(() => props.playlistId, () => {
  stopCurrentSong(); // หยุดเพลงเมื่อเปลี่ยน playlist
  loadPlaylistSongs();
}, { immediate: true });

onMounted(() => {
  loadPlaylistSongs();
});

// Cleanup เมื่อ component ถูก unmount
onUnmounted(() => {
  stopCurrentSong();
});

// Expose methods ให้ parent component เรียกใช้
defineExpose({
  playRandomSong,
  stopCurrentSong
});
</script>

<style scoped>
tbody tr {
  height: 48px;
}
</style>
