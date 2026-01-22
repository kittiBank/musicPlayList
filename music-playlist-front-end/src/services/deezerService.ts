import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface DeezerTrack {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_medium: string;
  };
  duration?: number;
  preview?: string;
}

export interface DeezerChartResponse {
  data: DeezerTrack[];
}

export interface DeezerSearchResponse {
  data: DeezerTrack[];
}

class DeezerService {
  /**
   * ดึงข้อมูลเพลง charts จาก Deezer API
   * @param limit จำนวนเพลงที่ต้องการ (default: 25)
   * @returns Promise<DeezerTrack[]>
   */
  async getCharts(limit: number = 25): Promise<DeezerTrack[]> {
    try {
      const response = await axios.get<DeezerChartResponse>(
        `${API_BASE_URL}/deezer/charts`,
        {
          params: { limit }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching charts:', error);
      throw error;
    }
  }

  /**
   * ค้นหาเพลงจาก Deezer API
   * @param query คำค้นหา
   * @param limit จำนวนเพลงที่ต้องการ (default: 25)
   * @returns Promise<DeezerTrack[]>
   */
  async searchMusic(query: string, limit: number = 25): Promise<DeezerTrack[]> {
    try {
      // ถ้าคำค้นหาว่าง ให้เรียก getCharts แทน
      if (!query || query.trim() === '') {
        return this.getCharts(limit);
      }

      const response = await axios.get<DeezerSearchResponse>(
        `${API_BASE_URL}/deezer/search`,
        {
          params: { q: query, limit }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error searching music:', error);
      throw error;
    }
  }

  /**
   * ดึงข้อมูลเพลงจาก ID
   * @param id ID ของเพลง
   * @returns Promise<DeezerTrack>
   */
  async getTrackById(id: number): Promise<DeezerTrack> {
    try {
      const response = await axios.get<DeezerTrack>(
        `${API_BASE_URL}/deezer/track/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching track:', error);
      throw error;
    }
  }
}

export default new DeezerService();
