import { ApiService } from './ApiService';
import { TrackInfo } from './main/Track/Track'
import { apiService } from './index'
import { PlaylistInfo } from './aside/Playlist';

export class DataTransformer {

  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async getUserLikes() {
    const likes = await apiService.fetchUserLikes();
    return likes;
  }

  async getSongs() {
    const songs = await apiService.fetchSongs();
    return songs;
  }

  transformTrack(serverTrack: ServerSong): TrackInfo {
    return {
      id: serverTrack.id,
      title: serverTrack.name,
      artist: serverTrack.artist.name,
      album: serverTrack.album.name,
      duration: serverTrack.duration,
      addedDate: new Date(serverTrack.createdAt),
      isFavorite: this.checkIfTrackIsFavorite(serverTrack.likes),
      path: serverTrack.path,
      image: serverTrack.image,
      filename: serverTrack.filename,
    };
  }

  checkIfTrackIsFavorite(songLikes: Array<{ id: number }>): boolean {
    return (songLikes.length !== 0);
  }

  transformPlaylist(serverPlaylist: ServerPlaylist): PlaylistInfo {
    return {
      id: serverPlaylist.id,
      name: serverPlaylist.name,
      tracks: serverPlaylist.songs.map((song: ServerSong) => this.transformTrack(song)),
    };
  }
}

export interface ServerSong {
  id: number,
  name: string,
  filename: string,
  path: string,
  image: string,
  duration: number,
  createdAt: Date,
  album: ArtistOrAlbumInfo,
  artist: ArtistOrAlbumInfo,
  likes: UserInfo[]
}

interface ArtistOrAlbumInfo {
  id: number,
  name: string,
  image: string,
  createdAt: Date,
}

interface UserInfo {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

export interface ServerPlaylist {
  id: number,
  name: string,
  createdAt: Date,
  songs: ServerSong[]
}