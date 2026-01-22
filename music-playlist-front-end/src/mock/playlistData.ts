// Mock data for playlists
export interface Playlist {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
}

export const playlists: Playlist[] = [
  {
    id: 1,
    name: "My Favorites",
    description: "All my favorite songs in one place",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    createdAt: "2025-12-15, 14:30",
  },
  {
    id: 2,
    name: "Chill Vibes",
    description: "Relaxing music for a peaceful mood",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
    createdAt: "2025-12-20, 09:15",
  },
  {
    id: 3,
    name: "Workout Mix",
    description: "High energy tracks to keep you motivated",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
    createdAt: "2025-12-28, 07:45",
  },
  {
    id: 4,
    name: "Study Focus",
    description: "Instrumental music for concentration",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop",
    createdAt: "2026-01-05, 16:20",
  },
];
