import axios from 'axios';
import { UserInfo } from './header/User'

export class ApiService {

  private baseURL: string = 'http://localhost:3000';
  private token: string | null = null;
  private username: string = '';
  private user: Partial<UserInfo> = {};

  constructor() {
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setUsername(username: string) {
    if (this.username !== username) {
      this.username = username
    }
  }

  getUsername() {
    return this.username;
  }

  setUser(firstName: string, lastName: string, username: string) {
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.username = username;
  }

  getUser(): Partial<UserInfo> | undefined {
    return this.user;
  }

  async register(username: string, password: string, firstName: string, lastName: string) {
    try {
      const response = await axios.post(`${this.baseURL}/api/auth/register`, { username, password, firstName, lastName });
      const token = response.data.access_token;
      this.setToken(token);
      return response.data;
    } catch (error) {
      throw new Error('Не удалось зарегистрировать пользователя');
    }
  }

  async login() {
    try {
      const response = await axios.post(`${this.baseURL}/api/auth/login`, { username: 'test1', password: 'test1' });
      const token = response.data.access_token;
      this.setToken(token);
      this.setUsername('test1')
      this.setUser('test1', 'test1', 'test1')
    } catch (error) {
      throw new Error('Не удалось выполнить вход');
    }
  }

  async authenticate() {
    try {
      return await this.login();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        await this.register('test1', 'test1', 'test1', 'test1');
        return await this.login();
      } else {
        console.error('An error occurred:', error);
        throw error;
      }
    }
  }

  async fetchPlaylists() {
    if (!this.token) {
      throw new Error('Токен не установлен');
    }

    const response = await axios.get(`${this.baseURL}/api/users/playlists`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return response.data;
  }

  async fetchUserPlaylists() {
    if (!this.token) {
      throw new Error('Токен не установлен');
    }

    const response = await axios.get(`${this.baseURL}/api/users/${this.getUsername()}/playlists`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return response.data;
  }

  async fetchSongs() {
    if (!this.token) {
      throw new Error('Токен не установлен');
    }
    const response = await axios.get(`${this.baseURL}/api/songs`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return response.data;
  }

  async fetchSpecificSong(songId: number) {
    if (!this.token) {
      throw new Error('Токен не установлен');
    }
    const response = await axios.get(`${this.baseURL}/api/songs/${songId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return response.data;
  }

  async createPlaylist(name: string) {
    if (!this.token) {
      throw new Error('Токен не установлен');
    }

    try {
      const response = await axios.post(`${this.baseURL}/api/playlists`,
        {
          name
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании плейлиста:', error);
      throw new Error('Не удалось создать плейлист');
    }
  }

  async deletePlaylist(playlistId: string) {
    if (!this.token) {
      throw new Error('Токен не установлен');
    }

    try {
      const response = await axios.delete(`${this.baseURL}/api/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при удалении плейлиста:', error);
      throw new Error('Не удалось удалить плейлист');
    }
  }

  async addTrackToPlaylist(playlistId: number, songId: number) {
    if (!this.token) {
      throw new Error('Токен не установлен');
    }

    try {
      const response = await axios.post(`${this.baseURL}/api/playlists/${playlistId}/add/${songId}`,
        {
          playlistId,
          songId
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Ошибка при добавлении трека в плейлист:', error);
      throw new Error('Не удалось добавить трек в плейлист');
    }
  }

  // Метод для удаления трека из плейлиста
  async removeTrackFromPlaylist(playlistId: number, songId: number) {
    if (!this.token) {
      throw new Error('Токен не установлен');
    }

    try {
      const response = await axios.post(`${this.baseURL}/api/playlists/${playlistId}/remove/${songId}`,
        {
          playlistId,
          songId
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Ошибка при удалении трека из плейлиста:', error);
      throw new Error('Не удалось удалить трек из плейлиста');
    }
  }

  async checkPlaylistExists(playlistId: string) {
    try {
      const response = await axios.get(`${this.baseURL}/api/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при проверке плейлиста:', error);
      throw new Error('Плейлист не найден');
    }
  }

  async fetchLikes() {
    if (!this.token) {
      throw new Error('Токен не установлен');
    }
    const response = await axios.get(`${this.baseURL}/api/users/likes`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return response.data;
  }

  async fetchUserLikes() {
    const username: string = this.getUsername()
    if (!this.token) {
      throw new Error('Токен не установлен');
    }
    const response = await axios.get(`${this.baseURL}/api/users/${username}/likes`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return response.data;
  }

  async likeTrack(songId: number) {
    if (!this.token) {
      throw new Error('Токен не установлен');
    }
    try {
      const response = await axios.post(`${this.baseURL}/api/songs/${songId}/like`,
        { songId },
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Ошибка при лайке трека:', error);
      throw new Error('Не удалось лайкнуть трек');
    }
  }

  async unlikeTrack(songId: number) {
    if (!this.token) {
      throw new Error('Токен не установлен');
    }

    try {
      const response = await axios.post(`${this.baseURL}/api/songs/${songId}/unlike`,
        { songId },
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Ошибка при лайке трека:', error);
      throw new Error('Не удалось лайкнуть трек');
    }
  }

}