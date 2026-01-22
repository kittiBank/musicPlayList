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
          @click="openDialog"
          class="bg-[#1DB954] hover:bg-[#1ed760] hover:shadow-lg hover:-translate-y-0.5 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md w-full md:w-auto"
        >
          + Add Playlist
        </button>
      </div>

      <!-- Playlist Table Component -->
      <MyPlayList :playlists="playlists" />
    </div>

    <!-- Add Playlist Dialog -->
    <div
      v-if="showDialog"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      @click.self="closeDialog"
    >
      <div
        class="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-xl shadow-2xl w-full max-w-md p-8 border border-gray-800"
      >
        <h3 class="text-2xl font-bold text-gray-100 mb-6">
          Create New Playlist
        </h3>

        <form @submit.prevent="savePlaylist">
          <!-- Playlist Name -->
          <div class="mb-5">
            <label class="block text-gray-300 text-sm font-semibold mb-2">
              Playlist Name
            </label>
            <input
              v-model="newPlaylist.name"
              type="text"
              placeholder="Enter playlist name"
              required
              class="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954] focus:ring-opacity-50 transition-all"
            />
          </div>

          <!-- Description -->
          <div class="mb-6">
            <label class="block text-gray-300 text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              v-model="newPlaylist.description"
              placeholder="Enter playlist description"
              rows="4"
              required
              class="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954] focus:ring-opacity-50 transition-all resize-none"
            ></textarea>
          </div>

          <!-- Buttons -->
          <div class="flex gap-3">
            <button
              type="button"
              @click="closeDialog"
              class="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn-save"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import MyPlayList from "../components/MyPlayList.vue";
import { playlists as playlistData } from "../mock/playlistData";
import Swal from "sweetalert2";

const playlists = ref(playlistData);
const showDialog = ref(false);
const newPlaylist = reactive({
  name: "",
  description: "",
});

const openDialog = () => {
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  resetForm();
};

const resetForm = () => {
  newPlaylist.name = "";
  newPlaylist.description = "";
};

const savePlaylist = () => {
  // Sweet Alert success theme dark
  Swal.fire({
    title: "Success!",
    text: `Playlist "${newPlaylist.name}" has been created successfully!`,
    icon: "success",
    background: "#1a1a1a",
    color: "#fff",
    iconColor: "#1DB954",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  // Close dialog and reset form
  closeDialog();
};
</script>

<style scoped>
.btn-save {
  flex: 1;
  padding: 0.75rem 1.5rem;
  background-color: #1DB954;
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: none;
  cursor: pointer;
}

.btn-save:hover {
  background-color: #1ed760;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}
</style>
