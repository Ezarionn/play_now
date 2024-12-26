import { ModalPlaylistCover } from './ModalPlaylistCover'
import { ModalPlaylistName } from './ModalPlaylistName'
import { ModalPlaylistAmount } from './ModalPlaylistAmount'
import { PlaylistInfo } from '../aside/Playlist'

export class ModalPlaylistItem {

  private element: HTMLElement | null = null;

  constructor(private fields: PlaylistInfo) { }

  getTemplate(): string {
    const playlistCover = new ModalPlaylistCover(this.fields.name).getTemplate();
    const playlistName = new ModalPlaylistName(this.fields.name).getTemplate();
    const playlistAmount = new ModalPlaylistAmount(this.fields.tracks).getTemplate();

    return `
      ${playlistCover}
      ${playlistName}
      ${playlistAmount}
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('li');
    element.className = 'playlists-modal__playlist';
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  getPlaylistName() {
    return this.fields.name;
  }

  getFields(): PlaylistInfo {
    return this.fields;
  }

}