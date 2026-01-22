<template>
  <div class="mt-6 bg-transparent">
    <div class="max-w-full mx-auto px-4 md:px-6">
      <h3 class="text-2xl font-bold text-white mb-4">Playlist</h3>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-700">
              <th
                class="text-left py-2 px-4 text-gray-300 font-semibold w-16"
              ></th>
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
                <div
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
              <td class="py-2 px-4 text-gray-300">{{ music.artist }}</td>
              <!-- Album -->
              <td class="py-2 px-4 text-gray-300">{{ music.album }}</td>
              <!-- Action -->
              <td class="py-2 px-4">
                <div class="flex items-center justify-center gap-3">
                  <!-- Play Button -->
                  <button
                    @click="playMusic(music)"
                    class="p-2 rounded-full hover:bg-[#1DB954] transition-colors group"
                    title="Play"
                  >
                    <svg
                      class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"></path>
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
                        <div class="text-xs text-gray-400 px-3 py-2 font-semibold">
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

<script lang="ts">
import { defineComponent } from "vue";
import Swal from "sweetalert2";
//Mock data
import { musics, type Music } from "../mock/musicData";
import { playlists, type Playlist } from "../mock/playlistData";

export default defineComponent({
  name: "MusicList",
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      musics: musics,
      playlists: playlists,
      showDialog: false,
      selectedMusic: null as Music | null,
      dialogStyle: {} as any,
    };
  },
  computed: {
    totalPages(): number {
      return Math.ceil(this.musics.length / this.itemsPerPage);
    },
    paginatedMusics(): Music[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.musics.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    playMusic(music: Music) {
      console.log("Playing:", music.title);
      // Add your play logic here
    },
    togglePlaylistDialog(music: Music) {
      if (this.showDialog && this.selectedMusic?.id === music.id) {
        this.showDialog = false;
        this.selectedMusic = null;
      } else {
        this.selectedMusic = music;
        this.showDialog = true;

        // Position the dialog to the left of the button
        this.dialogStyle = {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: "8px",
        };
      }
    },
    addMusicToPlaylist(music: Music, playlist: Playlist) {
      this.showDialog = false;
      this.selectedMusic = null;

      Swal.fire({
        title: "Success!",
        html: `<strong>${music.title}</strong> by ${music.artist}<br>added to <strong>${playlist.name}</strong>`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#282828",
        color: "#fff",
        iconColor: "#1DB954",
      });

      console.log(`Added "${music.title}" to "${playlist.name}"`);
    },
  },
  mounted() {
    // Close dialog when clicking outside
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".relative")) {
        this.showDialog = false;
        this.selectedMusic = null;
      }
    });
  },
});
</script>

<style scoped>
/* Pagination */
.active-page {
  background-color: #1DB954;
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
</style>
