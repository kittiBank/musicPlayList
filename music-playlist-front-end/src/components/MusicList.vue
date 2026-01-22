<template>
  <div class="mt-6 bg-transparent">
    <div class="max-w-full mx-auto px-4 md:px-6">
      <h3 class="text-2xl font-bold text-white mb-4">Playlist</h3>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-8">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#1DB954] border-t-transparent"
        ></div>
        <p class="text-gray-400 mt-2">Loading...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-400">{{ error }}</p>
        <button
          @click="loadCharts"
          class="mt-4 px-4 py-2 rounded-lg bg-[#1DB954] text-white hover:bg-[#1ed760] transition-colors"
        >
          Retry
        </button>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="text-left py-2 px-4 text-gray-300 font-semibold w-16">
                Cover
              </th>
              <th class="text-left py-2 px-4 text-gray-300 font-semibold">
                Title
              </th>
              <th class="text-left py-2 px-4 text-gray-300 font-semibold">
                Artist
              </th>
              <th class="text-left py-2 px-4 text-gray-300 font-semibold">
                Album
              </th>
              <th class="text-center py-2 px-4 text-gray-300 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="music in paginatedMusics"
              :key="music.id"
              class="border-b border-gray-700 hover:bg-[#282828] hover:bg-opacity-50 transition-colors"
            >
              <!-- Image -->
              <td class="py-2 px-4">
                <img
                  v-if="music.album?.cover_medium"
                  :src="music.album.cover_medium"
                  :alt="music.album?.title"
                  class="w-11 h-11 rounded-md object-cover"
                />
                <div
                  v-else
                  class="w-11 h-11 bg-gradient-to-br from-[#1DB954] to-[#169c46] rounded-md flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 3v9.28c-1.591 0-3 1.277-3 3s1.409 3 3 3 3-1.277 3-3V7h4V3h-7z"
                    ></path>
                  </svg>
                </div>
              </td>
              <!-- Title -->
              <td class="py-2 px-4 text-white font-medium">
                {{ music.title }}
              </td>
              <!-- Artist -->
              <td class="py-2 px-4 text-gray-300">
                {{ music.artist?.name || music.artist }}
              </td>
              <!-- Album -->
              <td class="py-2 px-4 text-gray-300">
                {{ music.album?.title || music.album }}
              </td>
              <!-- Action -->
              <td class="py-2 px-4">
                <div class="flex items-center justify-center gap-3">
                  <!-- Play/Pause Button -->
                  <button
                    @click="togglePlayPause(music)"
                    class="p-2 rounded-full transition-all duration-200 group play-button"
                    :class="{ 'playing': playingMusicId === music.id }"
                    :title="playingMusicId === music.id && !isPaused ? 'Pause' : 'Play'"
                  >
                    <!-- Play Icon -->
                    <svg
                      v-if="playingMusicId !== music.id || isPaused"
                      class="w-5 h-5 transition-colors"
                      :class="playingMusicId === music.id ? 'text-white' : 'text-gray-300 group-hover:text-white'"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                    <!-- Pause Icon -->
                    <svg
                      v-else
                      class="w-5 h-5 text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
                    </svg>
                  </button>

                  <!-- Add to Playlist Button -->
                  <div class="relative">
                    <button
                      @click="togglePlaylistDialog(music)"
                      class="p-2 rounded-full hover:bg-[#1DB954] transition-colors group"
                      title="Add to Playlist"
                    >
                      <svg
                        class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        ></path>
                      </svg>
                    </button>

                    <!-- Playlist Dialog -->
                    <div
                      v-if="showDialog && selectedMusic?.id === music.id"
                      class="absolute z-50 bg-[#282828] rounded-lg shadow-2xl border border-gray-700 min-w-[200px]"
                      :style="dialogStyle"
                    >
                      <div class="p-2">
                        <div
                          class="text-xs text-gray-400 px-3 py-2 font-semibold"
                        >
                          Add to Playlist
                        </div>
                        <button
                          v-for="playlist in playlists"
                          :key="playlist.id"
                          @click="addMusicToPlaylist(music, playlist)"
                          class="w-full text-left px-3 py-2 rounded hover:bg-[#3e3e3e] transition-colors text-white text-sm flex items-center gap-2"
                        >
                          <svg
                            class="w-4 h-4 text-[#1DB954]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"
                            ></path>
                          </svg>
                          {{ playlist.name }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-2 mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 rounded-lg bg-[#282828] text-white hover:bg-[#3e3e3e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Previous
        </button>

        <div class="flex gap-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-1.5 rounded-lg transition-colors text-sm font-semibold min-w-[2.5rem]',
              currentPage === page ? 'active-page' : 'inactive-page',
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 rounded-lg bg-[#282828] text-white hover:bg-[#3e3e3e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Next
        </button>
      </div>

      <!-- Info -->
      <div class="text-center mt-3 text-gray-400 text-xs">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, musics.length) }} of
        {{ musics.length }} songs
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import Swal from "sweetalert2";
import deezerService, { type DeezerTrack } from "../services/deezerService";
import { getAllPlaylists, addSongToPlaylist, type Playlist } from "../services/playlistService";

// Props
const props = defineProps<{
  searchQuery?: string;
  triggerSearch?: number;
}>();

const currentPage = ref(1);
const itemsPerPage = ref(5);
const musics = ref<DeezerTrack[]>([]);
const playlists = ref<Playlist[]>([]);
const showDialog = ref(false);
const selectedMusic = ref<DeezerTrack | null>(null);
const dialogStyle = ref<any>({});
const isLoading = ref(false);
const error = ref("");

// Audio player states
const audioPlayer = ref<HTMLAudioElement | null>(null);
const playingMusicId = ref<number | null>(null);
const isPaused = ref(false);

// Watch for search trigger changes
watch(() => props.triggerSearch, async () => {
  if (props.triggerSearch !== undefined && props.triggerSearch > 0) {
    await handleSearch();
  }
});

const totalPages = computed(() => {
  return Math.ceil(musics.value.length / itemsPerPage.value);
});

const paginatedMusics = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return musics.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

/**
 * โหลดเพลง charts จาก API
 */
const loadCharts = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    const tracks = await deezerService.getCharts(25);
    musics.value = tracks;
    currentPage.value = 1; // Reset to first page
  } catch (err) {
    error.value = "Failed to load music charts. Please try again.";
    console.error("Error loading charts:", err);
  } finally {
    isLoading.value = false;
  }
};

/**
 * จัดการการค้นหา
 */
const handleSearch = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    const query = props.searchQuery || "";
    const tracks = await deezerService.searchMusic(query, 25);
    musics.value = tracks;
    currentPage.value = 1; // Reset to first page
  } catch (err) {
    error.value = "Failed to search music. Please try again.";
    console.error("Error searching music:", err);
  } finally {
    isLoading.value = false;
  }
};

/**
 * สลับระหว่างการเล่นและหยุดเพลง
 */
const togglePlayPause = async (music: DeezerTrack) => {
  try {
    // ถ้ากดเพลงเดิมที่กำลังเล่นอยู่
    if (playingMusicId.value === music.id) {
      if (audioPlayer.value) {
        if (isPaused.value) {
          // กดเล่นต่อ
          audioPlayer.value.play();
          isPaused.value = false;
        } else {
          // กดหยุด
          audioPlayer.value.pause();
          isPaused.value = true;
        }
      }
      return;
    }

    // ถ้ากดเพลงใหม่ ต้องหยุดเพลงเดิมก่อน
    if (audioPlayer.value) {
      audioPlayer.value.pause();
      audioPlayer.value = null;
    }

    // ดึงข้อมูลเพลงจาก API
    const trackData = await deezerService.getTrackById(music.id);
    
    if (!trackData.preview) {
      Swal.fire({
        title: "Unavailable",
        text: "Preview for this track is not available",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
        background: "#282828",
        color: "#fff",
        iconColor: "#FFA500",
      });
      return;
    }

    // สร้าง audio player ใหม่
    audioPlayer.value = new Audio(trackData.preview);
    playingMusicId.value = music.id;
    isPaused.value = false;

    // เล่นเพลง
    await audioPlayer.value.play();

    // จัดการเมื่อเพลงเล่นจบ
    audioPlayer.value.onended = () => {
      playingMusicId.value = null;
      isPaused.value = false;
      audioPlayer.value = null;
    };

    console.log("Playing:", music.title);
  } catch (err) {
    console.error("Error playing music:", err);
    Swal.fire({
      title: "Error",
      text: "Failed to play music. Please try again.",
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
      background: "#282828",
      color: "#fff",
      iconColor: "#ff0000",
    });
  }
};

const togglePlaylistDialog = async (music: DeezerTrack) => {
  if (showDialog.value && selectedMusic.value?.id === music.id) {
    showDialog.value = false;
    selectedMusic.value = null;
  } else {
    // Load playlists from API
    await loadPlaylists();
    
    selectedMusic.value = music;
    showDialog.value = true;

    // Position the dialog to the left of the button
    dialogStyle.value = {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      marginRight: "8px",
    };
  }
};

const addMusicToPlaylist = async (music: DeezerTrack, playlist: Playlist) => {
  showDialog.value = false;
  selectedMusic.value = null;

  try {
    // Add song to playlist via API
    await addSongToPlaylist(playlist.id, music.id);

    const artistName =
      typeof music.artist === "string" ? music.artist : music.artist.name;

    Swal.fire({
      title: "Success!",
      html: `<strong>${music.title}</strong> by ${artistName}<br>added to <strong>${playlist.name}</strong>`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      background: "#282828",
      color: "#fff",
      iconColor: "#1DB954",
    });

    console.log(`Added "${music.title}" to "${playlist.name}"`);
  } catch (err: any) {
    const artistName =
      typeof music.artist === "string" ? music.artist : music.artist.name;
    
    // ตรวจสอบว่าเป็น error จากเพลงซ้ำหรือไม่
    const isDuplicate = err?.response?.data?.message === "This song is already in the playlist";
    
    Swal.fire({
      title: isDuplicate ? "Already Added!" : "Error!",
      html: isDuplicate 
        ? `<strong>${music.title}</strong> by ${artistName}<br>is already in <strong>${playlist.name}</strong>` 
        : "Failed to add song to playlist. Please try again.",
      icon: isDuplicate ? "warning" : "error",
      timer: 2500,
      showConfirmButton: false,
      background: "#282828",
      color: "#fff",
      iconColor: isDuplicate ? "#FFA500" : "#ff0000",
    });
    console.error("Error adding song to playlist:", err);
  }
};

/**
 * โหลดรายการ playlists จาก API
 */
const loadPlaylists = async () => {
  try {
    const data = await getAllPlaylists();
    playlists.value = data;
  } catch (err) {
    console.error("Error loading playlists:", err);
  }
};

onMounted(() => {
  // โหลดเพลง charts เมื่อเปิดหน้าเว็บ
  loadCharts();

  // Close dialog when clicking outside
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".relative")) {
      showDialog.value = false;
      selectedMusic.value = null;
    }
  });
});
</script>

<style scoped>
/* Pagination */
.active-page {
  background-color: #1db954;
  color: white;
}

.active-page:hover {
  background-color: #1ed760;
}

.inactive-page {
  background-color: #282828;
  color: #d1d5db;
}

.inactive-page:hover {
  background-color: #3e3e3e;
}

/* Play Button Styles */
.play-button {
  background-color: transparent;
}

.play-button:hover {
  background-color: #1DB954;
}

.play-button.playing {
  background-color: #1DB954;
}

.play-button.playing:hover {
  background-color: #1ed760;
}
</style>
