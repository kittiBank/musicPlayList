<template>
  <div class="mt-6 bg-transparent">
    <div class="max-w-full mx-auto px-4 md:px-6">
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-700">
              <th
                class="text-left py-3 px-4 text-gray-300 font-semibold w-20"
              ></th>
              <th class="text-left py-3 px-4 text-gray-300 font-semibold">
                Play List
              </th>
              <th class="text-left py-3 px-4 text-gray-300 font-semibold">
                Description
              </th>
              <th class="text-left py-3 px-4 text-gray-300 font-semibold">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="playlist in playlists"
              :key="playlist.id"
              @click="goToPlaylistDetail(playlist.id)"
              class="border-b border-gray-700 hover:bg-[#282828] hover:bg-opacity-50 transition-colors cursor-pointer"
            >
              <!-- Image -->
              <td class="py-3 px-4">
                <div
                  class="w-14 h-14 rounded-md overflow-hidden bg-gradient-to-br from-[#1DB954] to-[#169c46] flex items-center justify-center"
                >
                  <img
                    v-if="playlist.image"
                    :src="playlist.image"
                    :alt="playlist.name"
                    class="w-full h-full object-cover"
                  />
                  <svg
                    v-else
                    class="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 3v9.28c-1.591 0-3 1.277-3 3s1.409 3 3 3 3-1.277 3-3V7h4V3h-7z"
                    ></path>
                  </svg>
                </div>
              </td>
              <!-- Playlist Name -->
              <td class="py-3 px-4 text-white font-medium">
                {{ playlist.name }}
              </td>
              <!-- Description -->
              <td class="py-3 px-4 text-gray-300">
                {{ playlist.description }}
              </td>
              <!-- Created At -->
              <td class="py-3 px-4 text-gray-400 text-sm">
                {{ playlist.createdAt }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div
        v-if="!playlists || playlists.length === 0"
        class="text-center py-16 text-gray-400"
      >
        <h3 class="text-2xl text-gray-200 mb-2">No playlists yet</h3>
        <p class="text-lg">Create your first playlist to get started</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

interface Playlist {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
}

defineProps<{
  playlists: Playlist[];
}>();

const router = useRouter();

const goToPlaylistDetail = (id: number) => {
  router.push({
    name: "MyPlaylistDetail",
    params: { id: id.toString() },
  });
};
</script>

<style scoped>
/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #181818;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #1db954;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #1ed760;
}
</style>
