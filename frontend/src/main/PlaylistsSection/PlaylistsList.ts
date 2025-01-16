import { Creatable, Renderable } from '../../core/base'
import { Playlist } from './Playlist'
import { PlaylistInfo } from '../../aside/Playlist'
import { ScreenState } from '../ScreenPresenter';

export class PlaylistsList implements Creatable, Renderable {

  private element: HTMLElement | null = null;
  private playlists: Playlist[];
  private onMenuSelect: (screen: ScreenState, playlistName?: string) => void;

  constructor(playlistsData: PlaylistInfo[], onMenuSelect: (screen: ScreenState, playlistName?: string) => void) {
    this.onMenuSelect = onMenuSelect;
    this.playlists = playlistsData.map(playlistData => new Playlist(playlistData, this.onMenuSelect));
    this.element = this.getElement()
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  createElement(): HTMLElement {
    const element = document.createElement('ul')
    element.className = ('playlist__list');
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const element = this.getElement()
    this.playlists.forEach(playlist => {
      playlist.render()
      element.appendChild(playlist.getElement());
    });
  }

}