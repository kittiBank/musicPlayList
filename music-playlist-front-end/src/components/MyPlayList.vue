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
              <th class="text-center py-3 px-4 text-gray-300 font-semibold w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="playlist in playlists"
              :key="playlist.id"
              class="border-b border-gray-700 hover:bg-[#282828] hover:bg-opacity-50 transition-colors"
            >
              <!-- Image -->
              <td class="py-3 px-4 cursor-pointer" @click="goToPlaylistDetail(playlist.id)">
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
              <td class="py-3 px-4 text-white font-medium cursor-pointer" @click="goToPlaylistDetail(playlist.id)">
                {{ playlist.name }}
              </td>
              <!-- Description -->
              <td class="py-3 px-4 text-gray-300 cursor-pointer" @click="goToPlaylistDetail(playlist.id)">
                {{ playlist.description }}
              </td>
              <!-- Created At -->
              <td class="py-3 px-4 text-gray-400 text-sm cursor-pointer" @click="goToPlaylistDetail(playlist.id)">
                {{ formatDate(playlist.createdAt) }}
              </td>
              <!-- Delete Button -->
              <td class="py-3 px-4 text-center">
                <button
                  @click.stop="handleDeletePlaylist(playlist.id, playlist.name)"
                  class="text-red-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-500/10"
                  title="Delete playlist"
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
import type { Playlist } from "../services/playlistService";
import { deletePlaylist } from "../services/playlistService";
import Swal from "sweetalert2";

defineProps<{
  playlists: Playlist[];
}>();

const emit = defineEmits<{
  (e: 'refresh'): void
}>();

const router = useRouter();

const goToPlaylistDetail = (id: string) => {
  router.push({
    name: "MyPlaylistDetail",
    params: { id: id.toString() },
  });
};

const handleDeletePlaylist = async (id: string, name: string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to delete "${name}" playlist?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    background: '#1a1a1a',
    color: '#fff',
  });

  if (result.isConfirmed) {
    try {
      await deletePlaylist(id);
      
      Swal.fire({
        title: 'Deleted!',
        text: `Playlist "${name}" has been deleted successfully!`,
        icon: 'success',
        background: '#1a1a1a',
        color: '#fff',
        iconColor: '#1DB954',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      
      emit('refresh');
    } catch (error) {
      console.error('Failed to delete playlist:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete playlist. Please try again.',
        icon: 'error',
        background: '#1a1a1a',
        color: '#fff',
        iconColor: '#ff4444',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
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
