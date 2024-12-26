import { Header } from './header/Header';
import { Main } from './main/Main'
import { Footer } from './footer/Footer'
import { TrackInfo } from './main/Track/Track'
import { TrackModel } from './main/Track/TrackModel'
import { Track } from './main/Track/Track'
import { SearchPresenter } from './header/SearchPresenter'
import { PlaylistInfo } from './aside/Playlist'
import { ApiService } from './ApiService'
import { DataTransformer, ServerSong, ServerPlaylist } from './DataTransformer';
import { TrackList } from './main/TracksSection/TracksList';
import { PlaylistsList } from './main/PlaylistsSection/PlaylistsList';
import './css/style.css';


let isLoading = true;
export let trackData: TrackInfo[] = [];
export let playlistsData: PlaylistInfo[] = []
export let searchPresenter: SearchPresenter;
export const apiService = new ApiService();
export const dataTransformer = new DataTransformer(apiService);
export let trackModel: TrackModel;
export let trackList: TrackList;
export let playlistsList: PlaylistsList;
export let tracksElements: Track[];
export let currentTrack: TrackInfo;
export let footer: Footer;
export let main: Main;

async function getTracksData(): Promise<TrackInfo[]> {
  try {
    const songs = await getSongsFromServer();
    const trackData: TrackInfo[] = songs.map((song: ServerSong) => dataTransformer.transformTrack(song));
    return trackData;
  } catch (error) {
    console.error("Ошибка при получении песен:", error);
    return [];
  }
}

async function getSongsFromServer(): Promise<ServerSong[]> {
  const songs: ServerSong[] = await dataTransformer.getSongs()
  return songs
}

async function getPlaylistsData(): Promise<PlaylistInfo[]> {
  try {
    const playlists = await getPlaylistsFromServer();
    const playlistsData1: PlaylistInfo[] = playlists.map((playlist: ServerPlaylist) => dataTransformer.transformPlaylist(playlist));
    return playlistsData1;
  } catch (error) {
    console.error("Ошибка при получении песен:", error);
    return [];
  }
}

async function getPlaylistsFromServer() {
  const playlists = await apiService.fetchUserPlaylists()
  return playlists
}

async function initializeTrackData() {
  await apiService.authenticate();
  try {
    trackData = await getTracksData();
    playlistsData = await getPlaylistsData();
  } catch (error) {
    console.error('Ошибка при загрузке данных треков:', error);
    trackData = [];
  } finally {
    isLoading = false;
    renderApp();
  }
}

function renderApp() {
  const wrapper = document.createElement('div');
  wrapper.className = 'over-wrapper';
  if (isLoading) {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = 'Loading...';
    wrapper.appendChild(loadingIndicator);
  } else {
    trackModel = new TrackModel();
    trackModel.setTracks(trackData)
    trackModel.setPlaylistsData(playlistsData)
    const selectedPlaylist: PlaylistInfo | undefined = trackModel.getPlaylistsData()?.find((playlist: PlaylistInfo) => playlist.name === 'recommendedTracks');
    if (selectedPlaylist) {
      trackModel.setPlaylist(selectedPlaylist);
    }
    main = new Main(trackData, playlistsData);
    main.render()
    const header = new Header();
    header.render()
    const searchView = header.getSearch()
    currentTrack = getRandomTrack(trackData)
    footer = new Footer(trackData, currentTrack, new Track(currentTrack, trackModel));
    footer.render()
    wrapper.append(header.getElement(), main.getElement(), footer.getElement());
    trackList = main.getTrackList()
    playlistsList = main.getPlaylistsList()
    trackModel.setTrackList(trackList)
    tracksElements = main.getTracks()
    searchPresenter = new SearchPresenter(trackModel, searchView, trackList);
  };
  document.body.prepend(wrapper);
}

function getRandomTrack(tracks: TrackInfo[]): TrackInfo {
  const randomIndex = Math.floor(Math.random() * tracks.length);
  return tracks[randomIndex];
}

initializeTrackData();

