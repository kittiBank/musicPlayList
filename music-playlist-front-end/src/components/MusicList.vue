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
              class="border-b border-gray-700 hover:bg-gray-800 hover:bg-opacity-30 transition-colors"
            >
              <!-- Image -->
              <td class="py-2 px-4">
                <div
                  class="w-11 h-11 bg-gradient-to-br from-[#64b5f6] to-[#2196f3] rounded-md flex items-center justify-center"
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
                    class="p-2 rounded-full hover:bg-gray-700 transition-colors group"
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
                  <button
                    @click="addToPlaylist(music)"
                    class="p-2 rounded-full hover:bg-gray-700 transition-colors group"
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
          class="px-3 py-1.5 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Previous
        </button>

        <div class="flex gap-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-2 py-1.5 rounded-lg transition-colors text-sm',
              currentPage === page
                ? 'bg-gradient-to-r from-[#64b5f6] to-[#2196f3] text-white font-semibold'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
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

interface Music {
  id: number;
  title: string;
  artist: string;
  album: string;
}

export default defineComponent({
  name: "MusicList",
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      musics: [
        {
          id: 1,
          title: "Blinding Lights",
          artist: "The Weeknd",
          album: "After Hours",
        },
        {
          id: 2,
          title: "Shape of You",
          artist: "Ed Sheeran",
          album: "÷ (Divide)",
        },
        {
          id: 3,
          title: "Someone You Loved",
          artist: "Lewis Capaldi",
          album: "Divinely Uninspired to a Hellish Extent",
        },
        { id: 4, title: "Sunroof", artist: "Nicky Youre", album: "Sunroof" },
        {
          id: 5,
          title: "As It Was",
          artist: "Harry Styles",
          album: "Harry's House",
        },
        {
          id: 6,
          title: "Flowers",
          artist: "Miley Cyrus",
          album: "Endless Summer Vacation",
        },
        {
          id: 7,
          title: "Anti-Hero",
          artist: "Taylor Swift",
          album: "Midnights",
        },
        {
          id: 8,
          title: "Calm Down",
          artist: "Rema & Selena Gomez",
          album: "Rema",
        },
        {
          id: 9,
          title: "Good as Hell",
          artist: "Lizzo",
          album: "Cuz I Love You",
        },
        {
          id: 10,
          title: "Levitating",
          artist: "Dua Lipa",
          album: "Future Nostalgia",
        },
        {
          id: 11,
          title: "Peaches",
          artist: "Justin Bieber ft. Daniel Caesar & Giveon",
          album: "Justice",
        },
        {
          id: 12,
          title: "Watermelon Sugar",
          artist: "Harry Styles",
          album: "Fine Line",
        },
        {
          id: 13,
          title: "Industry Baby",
          artist: "Lil Nas X & Jack Harlow",
          album: "Montero",
        },
        {
          id: 14,
          title: "Break My Soul",
          artist: "Beyoncé",
          album: "Renaissance",
        },
        {
          id: 15,
          title: "Heat Waves",
          artist: "Glass Animals",
          album: "Dreamland",
        },
        {
          id: 16,
          title: "Unholy",
          artist: "Sam Smith & Kim Petras",
          album: "Love Goes",
        },
        {
          id: 17,
          title: "About You",
          artist: "The 1975",
          album: "I Like America & America Likes Me",
        },
        {
          id: 18,
          title: "Moonlight",
          artist: "Kali Uchis",
          album: "Orquideas",
        },
        {
          id: 19,
          title: "Night Shift",
          artist: "Lucy Spraggan",
          album: "Night Shift",
        },
        { id: 20, title: "Golden", artist: "Harry Styles", album: "Fine Line" },
      ] as Music[],
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
    addToPlaylist(music: Music) {
      console.log("Adding to playlist:", music.title);
      // Add your add to playlist logic here
    },
  },
});
</script>
