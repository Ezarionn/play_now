import { TrackModel } from '../main/Track/TrackModel'
import { Search } from './Search'
import { TrackList } from '../main/TracksSection/TracksList'
import { trackList, main, playlistsList } from '../index'
import { ScreenState } from '../main/ScreenPresenter'
import { PlaylistsList } from '../main/PlaylistsSection/PlaylistsList'

export class SearchPresenter {

  private trackModel: TrackModel;
  private searchView: Search;
  private callback?: (filter: string) => void;
  private trackList: TrackList;
  static oldTrackList: TrackList = trackList;
  private playlistsList: PlaylistsList;

  constructor(tracksModel: TrackModel, searchComponent: Search, trackList: TrackList) {
    this.trackModel = tracksModel;
    this.searchView = searchComponent;
    this.trackList = trackList;
    this.playlistsList = playlistsList;
    this.searchView.setSearchInputChange(this.onSearchInputChange.bind(this));
  }

  setSearchCallback(callback: (filter: string) => void) {
    this.callback = callback;
  }

  static updateTrackList(context: SearchPresenter, newTrackList: TrackList) {
    const currentTrackList = SearchPresenter.oldTrackList || context.trackModel.getTrackList();
    SearchPresenter.oldTrackList = newTrackList;
    return currentTrackList;
  }

  private onSearchInputChange(inputValue: string) {
    if (this.callback) {
      this.callback(inputValue);
    }
    const currentScreen = main.getCurrentScreen();




    if (currentScreen === ScreenState.Playlists) {
      const filteredPlaylists = this.trackModel.getPlaylistsData(inputValue)?.filter(playlist => playlist.name !== 'favourites' && playlist.name !== 'recommendedTracks');
      let newPlaylistList;
      if (filteredPlaylists) {
        newPlaylistList = new PlaylistsList(filteredPlaylists, (screen, playlistName) => main.getScreenPresenter().handleMenuSelect(screen, playlistName))
        const oldPlaylistsList = this.trackModel.getPlaylistsList();
        if (oldPlaylistsList) {
          this.playlistsList = oldPlaylistsList
        }
        const newPlaylistsListElement = newPlaylistList.getElement()
        newPlaylistList.render()
        this.playlistsList.getElement().replaceWith(newPlaylistsListElement)
        this.playlistsList = newPlaylistList
        this.trackModel.setPlaylistsList(newPlaylistList);
      }




    } else {
      const filteredTracks = this.trackModel.getTracks(inputValue);
      const newTrackList = new TrackList(filteredTracks);
      const oldTrackList = this.trackModel.getTrackList();
      if (oldTrackList) {
        this.trackList = oldTrackList
      }
      const newTrackListElement = newTrackList.getElement()
      newTrackList.render()
      this.trackList.getElement().replaceWith(newTrackListElement)
      this.trackList = newTrackList
      this.trackModel.setTrackList(newTrackList);
    }
  }

  updateTrackList(newTrackList: TrackList) {
    this.trackList = newTrackList;
  }

}