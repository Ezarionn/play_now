import { ModalPlaylistItem } from './ModalPlaylistItem'
import { PlaylistInfo } from '../aside/Playlist'

export class ModalPlaylistsList {

  private element: HTMLElement | null = null;
  private playlists: ModalPlaylistItem[];
  private onSelect: (playlist: PlaylistInfo) => void;

  constructor(playlistsData: PlaylistInfo[], onSelect: (playlist: PlaylistInfo) => void) {
    this.playlists = playlistsData.map(playlistData => new ModalPlaylistItem(playlistData));
    this.onSelect = onSelect;
    this.element = this.getElement()
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  createElement(): HTMLElement {
    const element = document.createElement('ul')
    element.className = ('playlists-modal__playlist_content');
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const element = this.getElement()
    this.playlists.forEach(playlist => {
      const playlistInfo = playlist.getFields();
      const li = playlist.getElement()
      li.addEventListener('click', () => {
        this.onSelect(playlistInfo);
      });
      element.appendChild(li);
    });
  }

}