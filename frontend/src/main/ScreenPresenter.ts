import { TracksSection } from './TracksSection/TracksSection'
import { PlaylistsSection } from '../main/PlaylistsSection/PlaylistsSection'
import { PlaylistInfo } from '../aside/Playlist';
import { trackModel } from '../index'
import { SearchPresenter } from '../header/SearchPresenter'

export enum ScreenState {
  Playlists,
  Tracks,
  PlaylistTracks
}

export class ScreenPresenter {

  private tracksSection: TracksSection;
  private playlistsSection: PlaylistsSection;
  private currentScreen: ScreenState;
  private searchPresenter: SearchPresenter;
  private previousPlaylistName: string | null = null;

  constructor(tracksSection: TracksSection, playlistsSection: PlaylistsSection, searchPresenter: SearchPresenter) {
    this.tracksSection = tracksSection;
    this.playlistsSection = playlistsSection;
    this.currentScreen = ScreenState.Tracks;
    this.searchPresenter = searchPresenter;
  }

  getCurrentScreen() {
    return this.currentScreen;
  }

  switchScreen(screen: ScreenState, playlistName?: string): void {
    this.tracksSection.getElement().style.display = 'none';
    this.playlistsSection.getElement().style.display = 'none';
    switch (screen) {
      case ScreenState.Playlists:
        this.playlistsSection.getElement().style.display = 'block';
        break;
      case ScreenState.Tracks:
      case ScreenState.PlaylistTracks:
        if (playlistName !== undefined) {
          this.createTrackScreen(playlistName);
        }
        break;
    }
    this.currentScreen = screen;
  }

  handleMenuSelect(screen: ScreenState, playlistName?: string): void {
    this.switchScreen(screen, playlistName);
  }

  private createTrackScreen(playlistName: string): void {
    const selectedPlaylist: PlaylistInfo | undefined = trackModel.getPlaylistsData()?.find((playlist: PlaylistInfo) => playlist.name === playlistName);
    if (selectedPlaylist) {
      const newElement = new TracksSection(selectedPlaylist.tracks);
      newElement.render();
      this.tracksSection.getElement().replaceWith(newElement.getElement());
      this.tracksSection = newElement;
      trackModel.setTracks(selectedPlaylist.tracks);
      const newTrackList = newElement.getTrackList();
      trackModel.setPlaylist(selectedPlaylist);
      trackModel.setTrackList(newTrackList);
    }
    this.tracksSection.getElement().style.display = 'block';
  }

}