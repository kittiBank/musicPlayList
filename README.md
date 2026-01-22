# Music Playlist WebApp

A fully functional music playlist application built with **Vue 3** and **Tailwind CSS** (front-end) and **NestJS** (back-end).  
Users can search for songs via the **Deezer API**, create playlists, add or remove songs from playlists, and save all data locally using **localStorage** (no database required).


---

## Features

- Search songs from **Deezer API**
- Create new playlists
- Add songs to playlists
- Remove songs from playlists
- Store playlists and songs in **localStorage**

---

## Tech Stack

- **Front-end:** Vue 3, TypeScript, Tailwind, Vue Router, SweetAlert2
- **Back-end:** NestJS (Node.js), Axios
- **State storage:** localStorage (no DB)
- **API Integration:** Deezer API
- **Package Manager:** npm or yarn

---

## Project Structure

Front-end
- src
  - components
    - MusicList.vue
    - MyPlayList.vue
    - MyPlaylistDetailsTable.vue
    - MyPlaylistHeader.vue
    - Navbar.vue
  - services
    - deezerService.ts
    - playlistService.ts
  - view
    - HomeView.vue
    - MyPlaylistDetail.vue
    - MyPlaylistView.vue


Back-end
- src/
  - deezer
    - deezer.controller.ts
    - deezer.module.ts
    - deezer.service.ts
  - playlist
    - playlist.controller.ts
    - playlist.module.ts
    - playlist.service.ts

---

## How to run

1. **Clone the repository:**

   `git clone https://github.com/kittiBank/musicPlayList.git`

2. **Front-end:**

   - Go to front-end folder: `cd ../music-playlist-front-end`  
   - Install: `npm install`  
   - Run: `npm run dev`

3. **Back-end:**

   - Go to back-end folder: `cd ../music-playlist-back-end`  
   - Install: `npm install`  
   - Run: `npm run start:dev`

4. **Open the app in your browser:**

   `http://localhost:5173/`



<img width="800" height="500" alt="Screenshot 2569-01-23 at 01 23 09" src="https://github.com/user-attachments/assets/aa1c0141-b112-465c-8ea4-6f8432ed43a0" />


<img width="800" height="500" alt="Screenshot 2569-01-23 at 01 24 38" src="https://github.com/user-attachments/assets/5cdd36de-890c-4bf8-8195-15ffb1c4b977" />




