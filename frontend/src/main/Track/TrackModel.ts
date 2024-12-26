import { TrackInfo, Track } from './Track'
import { TrackList } from '../TracksSection/TracksList'
import { PlaylistInfo } from '../../aside/Playlist';
import { trackData, playlistsData } from '../../index'
import { apiService } from '../../index';
import { PlaylistsList } from '../PlaylistsSection/PlaylistsList';


export class TrackModel {

  private tracksData: TrackInfo[] = [];
  private trackList: TrackList | undefined;
  private playlistsData: PlaylistInfo[] | undefined;
  private playlist: PlaylistInfo | undefined;
  private playlistsList: PlaylistsList | undefined;

  constructor() {
    this.playlistsData = playlistsData;
  }

  setTracks(tracks: TrackInfo[]): TrackInfo[] {
    this.tracksData = tracks;
    return this.tracksData
  }

  getTracks(filter?: string): TrackInfo[] {
    if (!filter || filter.trim() === '') {
      return this.tracksData;
    }
    const lowerCaseFilter = filter.toLowerCase();

    return this.tracksData.filter(track =>
      track.title.toLowerCase().includes(lowerCaseFilter) ||
      track.artist.toLowerCase().includes(lowerCaseFilter) ||
      track.album.toLowerCase().includes(lowerCaseFilter)
    );
  }

  setPlaylistsData(playlistsData: PlaylistInfo[]): PlaylistInfo[] {
    const favorites = this.createFavouritesPlaylist()
    const recommendedTracks = this.createRecommendedTracks()
    const finalPlaylistsList: PlaylistInfo[] = [
      recommendedTracks,
      favorites,
      ...playlistsData
    ];
    this.playlistsData = finalPlaylistsList;
    return this.playlistsData;
  }

  getPlaylistsData(filter?: string): PlaylistInfo[] | undefined {
    if (this.playlistsData !== undefined) {
      if (!filter || filter.trim() === '') {
        return this.playlistsData;
      }
      const lowerCaseFilter = filter.toLowerCase();
      if (this.playlistsData) {
        return this.playlistsData.filter(playlist =>
          playlist.name.toLowerCase().includes(lowerCaseFilter)
        );
      }
    }
  }

  setPlaylistsList(newPlaylistList: PlaylistsList) {
    this.playlistsList = newPlaylistList;
  }

  getPlaylistsList() {
    return this.playlistsList;
  }

  setPlaylist(playlist: PlaylistInfo) {
    this.playlist = playlist;
    return this.playlist;
  }

  getPlaylist(): PlaylistInfo | undefined {
    return this.playlist;
  }

  getPlaylistName(): string | undefined {
    return this.playlist?.name
  }

  setTrackList(tracklist: TrackList) {
    this.trackList = tracklist;
    return this.trackList;
  }

  getTrackList(): TrackList | undefined {
    return this.trackList;
  }

  getTracksFromTrackList(): Track[] | undefined {
    return this.trackList?.getTracks();
  }

  createFavouritesPlaylist(): PlaylistInfo {
    const favoriteTracks: PlaylistInfo = { name: 'favourites', tracks: [] }
    const tracksData = this.tracksData
    const favorites = tracksData.filter(track => track.isFavorite);
    favoriteTracks.tracks.push(...favorites);
    return favoriteTracks
  }

  createRecommendedTracks() {
    const recommendedTracks: PlaylistInfo = { name: 'recommendedTracks', tracks: [] }
    recommendedTracks.tracks.push(...trackData);
    return recommendedTracks
  }

  updateTrackData<K extends keyof TrackInfo>(id: number, field: K, newData: TrackInfo[K]): void {
    const trackIndex = this.getTracks().findIndex(
      track => track.id === id
    );
    if (trackIndex !== -1) {
      const track: TrackInfo = this.getTracks()[trackIndex];
      track[field] = newData;
      if (field === 'isFavorite') {
        if (newData === true) {
          apiService.likeTrack(id)
        } else {
          apiService.unlikeTrack(id)
        }
      }
    } else {
      throw new Error("Трек с указанными названием и исполнителем не найден.");
    }
  }

  getTrackData(title: string, artist: string): TrackInfo {
    const trackIndex = this.getTracks().findIndex(
      track => track.title === title && track.artist === artist
    );
    if (trackIndex !== -1) {
      return this.getTracks()[trackIndex];
    }

    throw new Error(`Track with title "${title}" and artist "${artist}" not found`);
  }

  deleteTrack(trackFields: TrackInfo) {
    const trackIndex = this.getTracks().findIndex(
      track => track.title === trackFields.title && track.artist === trackFields.artist
    );
    if (trackIndex !== -1) {
      this.getTracks().splice(trackIndex, 1);
      const currentPlaylist = this.getPlaylist()
      if (currentPlaylist) {
        if (currentPlaylist.id && trackFields.id) {
          apiService.removeTrackFromPlaylist(currentPlaylist.id, trackFields.id)
        }
      }
    } else {
      throw new Error("Трек с указанными названием и исполнителем не найден.");
    }
  }

  addTrackToPlaylist(trackToAdd: Track, playlistInfo: PlaylistInfo) {
    const trackTitle = trackToAdd.getTrackTitle()
    const trackArtist = trackToAdd.getTrackArtist()
    const mainPlaylistsData = this.getPlaylistsData()
    const playlist = mainPlaylistsData?.find(playlistData => playlistData.name === playlistInfo.name);
    const track: TrackInfo | undefined = this.getTracks().find(trackData => trackData.title === trackTitle && trackData.artist === trackArtist)
    if (track) {
      playlist?.tracks.push(track)
    }
    const trackId = trackToAdd.getTrackId();
    if (playlistInfo.id && trackId) {
      apiService.addTrackToPlaylist(playlistInfo.id, trackId)
    }
  }

}