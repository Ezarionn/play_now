import { Creatable, Renderable } from '../core/base'
import { PlaylistsButton } from './PlaylistsButton'
import { TracksButton } from './TracksButton'
import { FavoritesButton } from './FavoritesButton'
import { Playlist, PlaylistInfo } from './Playlist'
import { ScreenState } from '../main/ScreenPresenter'

export class AsideNavigationList implements Creatable, Renderable {

  private element: HTMLElement | null = null;
  private playlistsButton: PlaylistsButton;
  private tracksButton: TracksButton;
  private favouriteTracksButton: FavoritesButton;
  private playlists: Playlist[];
  private onMenuSelect: (screen: ScreenState, playlistName?: string) => void;

  constructor(playlistsData: PlaylistInfo[], onMenuSelect: (screen: ScreenState, playlistName?: string) => void) {
    this.element = this.getElement();
    this.playlistsButton = new PlaylistsButton();
    this.tracksButton = new TracksButton();
    this.playlists = playlistsData.map(playlistData => new Playlist(playlistData));
    this.favouriteTracksButton = new FavoritesButton();
    this.onMenuSelect = onMenuSelect;
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  createElement(): HTMLElement {
    const element = document.createElement('ul')
    element.className = ('aside__list');
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const buttons: HTMLElement[] = []
    const element = this.getElement()
    this.playlists.forEach(playlist => {
      const li = playlist.getElement()
      element.appendChild(li);
      buttons.push(li)
      li.addEventListener('click', () => {
        this.onMenuSelect(ScreenState.PlaylistTracks, playlist.getPlaylistName())
        this.highlightActiveButton(li, buttons)
      });
    });
    const playlistsButton = this.playlistsButton.getElement()
    const tracksButton = this.tracksButton.getElement()
    tracksButton.firstElementChild?.classList.add('aside__btn--active')
    const favouritesButton = this.favouriteTracksButton.getElement()
    playlistsButton.addEventListener('click', () => {
      this.onMenuSelect(ScreenState.Playlists)
      this.highlightActiveButton(playlistsButton, buttons)
    });
    tracksButton.addEventListener('click', () => {
      this.onMenuSelect(ScreenState.Tracks, 'recommendedTracks')
      this.highlightActiveButton(tracksButton, buttons)
    });
    favouritesButton.addEventListener('click', () => {
      this.onMenuSelect(ScreenState.PlaylistTracks, 'favourites')
      this.highlightActiveButton(favouritesButton, buttons)
    });
    buttons.push(playlistsButton, tracksButton, favouritesButton)
    element.prepend(playlistsButton, tracksButton, favouritesButton)
  }

  highlightActiveButton(button: HTMLElement, buttons: HTMLElement[]) {
    buttons.forEach(i => {
      const button = i.firstElementChild
      button?.classList.remove('aside__btn--active')
    });
    button.firstElementChild?.classList.add('aside__btn--active')
  }

  getPlaylists() {
    return this.playlists;
  }

}