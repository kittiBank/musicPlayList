import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface Playlist {
  id: string;
  name: string;
  description: string;
  image?: string;
  createdAt: string;
  songs?: number[];
}

export interface CreatePlaylistDto {
  name: string;
  description?: string;
  songs?: number[];
}

// LocalStorage key
const PLAYLISTS_KEY = 'playlists';

// Get playlists from localStorage
export const getPlaylistsFromStorage = (): Playlist[] => {
  const data = localStorage.getItem(PLAYLISTS_KEY);
  return data ? JSON.parse(data) : [];
};

// Save playlists to localStorage
const savePlaylistsToStorage = (playlists: Playlist[]): void => {
  localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
};

// Generate random image from Unsplash
const getRandomImage = (): string => {
  const images = [
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
  ];
  return images[Math.floor(Math.random() * images.length)]!;
};

// Generate UUID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Create a new playlist
export const createPlaylist = async (data: CreatePlaylistDto): Promise<Playlist> => {
  try {
    // Call backend API
    const response = await axios.post(`${API_BASE_URL}/playlists`, data);
    
    // Create playlist object
    const newPlaylist: Playlist = {
      id: response.data.id || generateId(),
      name: data.name,
      description: data.description || '',
      image: getRandomImage(),
      createdAt: new Date().toISOString(),
      songs: data.songs || [],
    };

    // Save to localStorage
    const playlists = getPlaylistsFromStorage();
    playlists.push(newPlaylist);
    savePlaylistsToStorage(playlists);

    return newPlaylist;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};

// Get all playlists
export const getAllPlaylists = async (): Promise<Playlist[]> => {
  try {
    // Get from localStorage first
    const localPlaylists = getPlaylistsFromStorage();
    
    // If no local data, try to fetch from backend
    if (localPlaylists.length === 0) {
      try {
        const response = await axios.get(`${API_BASE_URL}/playlists`);
        const playlists = response.data;
        savePlaylistsToStorage(playlists);
        return playlists;
      } catch (error) {
        console.warn('Could not fetch from backend, using empty array');
        return [];
      }
    }
    
    return localPlaylists;
  } catch (error) {
    console.error('Error getting playlists:', error);
    return [];
  }
};

// Get playlist by ID
export const getPlaylistById = async (id: string): Promise<Playlist | null> => {
  const playlists = getPlaylistsFromStorage();
  return playlists.find(p => p.id === id) || null;
};

// Delete playlist
export const deletePlaylist = async (id: string): Promise<void> => {
  try {
    // Call backend API
    await axios.delete(`${API_BASE_URL}/playlists/${id}`);
    
    // Remove from localStorage
    const playlists = getPlaylistsFromStorage();
    const updatedPlaylists = playlists.filter(p => p.id !== id);
    savePlaylistsToStorage(updatedPlaylists);
  } catch (error) {
    console.error('Error deleting playlist:', error);
    throw error;
  }
};

// Update playlist
export const updatePlaylist = async (id: string, data: Partial<CreatePlaylistDto>): Promise<Playlist | null> => {
  try {
    // Call backend API
    await axios.patch(`${API_BASE_URL}/playlists/${id}`, data);
    
    // Update in localStorage
    const playlists = getPlaylistsFromStorage();
    const index = playlists.findIndex(p => p.id === id);
    
    if (index !== -1) {
      playlists[index] = { ...playlists[index], ...data } as Playlist;
      savePlaylistsToStorage(playlists);
      return playlists[index] ?? null;
    }
    
    return null;
  } catch (error) {
    console.error('Error updating playlist:', error);
    throw error;
  }
};

// Add song to playlist
export const addSongToPlaylist = async (playlistId: string, songId: number): Promise<Playlist> => {
  try {
    // Call backend API
    const response = await axios.post(`${API_BASE_URL}/playlists/${playlistId}/songs`, {
      songId
    });
    
    // Update in localStorage
    const playlists = getPlaylistsFromStorage();
    const index = playlists.findIndex(p => p.id === playlistId);
    
    if (index !== -1) {
      if (!playlists[index]!.songs) {
        playlists[index]!.songs = [];
      }
      if (!playlists[index]!.songs!.includes(songId)) {
        playlists[index]!.songs!.push(songId);
      }
      savePlaylistsToStorage(playlists);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    throw error;
  }
};

// Remove song from playlist
export const removeSongFromPlaylist = async (playlistId: string, songId: number): Promise<void> => {
  try {
    // Call backend API
    await axios.delete(`${API_BASE_URL}/playlists/${playlistId}/songs/${songId}`);
    
    // Update in localStorage
    const playlists = getPlaylistsFromStorage();
    const index = playlists.findIndex(p => p.id === playlistId);
    
    if (index !== -1 && playlists[index]!.songs) {
      playlists[index]!.songs = playlists[index]!.songs!.filter(id => id !== songId);
      savePlaylistsToStorage(playlists);
    }
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    throw error;
  }
};
