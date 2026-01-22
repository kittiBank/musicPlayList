<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- App Title/Logo -->
      <div class="navbar-brand">
        <h1 class="app-title">Music Playlist</h1>
      </div>

      <!-- Menu Items -->
      <ul class="nav-menu">
        <li class="nav-item">
          <router-link 
            to="/" 
            class="nav-link"
            :class="{ active: isActive('/') }"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link 
            to="/my-playlist" 
            class="nav-link"
            :class="{ active: isActive('/my-playlist') }"
          >
            My Playlist
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
  padding: 1rem 0;
  border-bottom: 3px solid #1DB954;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  flex-shrink: 0;
}

.app-title {
  color: #e0e0e0;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: #b0b0b0;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: block;
  position: relative;
}

.nav-link:hover {
  color: #1ed760;
  background-color: rgba(29, 185, 84, 0.1);
}

.nav-link.active {
  color: #1DB954;
  background-color: rgba(29, 185, 84, 0.15);
  border-bottom: 2px solid #1DB954;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #1DB954;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .app-title {
    font-size: 1.4rem;
  }

  .nav-menu {
    gap: 1rem;
    width: 100%;
    justify-content: center;
  }

  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
