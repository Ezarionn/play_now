import { ModalPlaylistsList } from './ModalPlaylistsList'
import { PlaylistInfo } from '../aside/Playlist'
import { CancelButton } from './CancelButton'
import { Track } from '../main/Track/Track'
import { UserAction } from '../core/base'
import { playlistsData } from '../index'

export class ModalPlaylists {

  private static instance: ModalPlaylists;
  private element: HTMLElement | null = null;
  private playlistsList: ModalPlaylistsList;
  private cancelButton: CancelButton;
  private track: Track;

  constructor(playlistsData: PlaylistInfo[], track: Track) {
    this.playlistsList = new ModalPlaylistsList(playlistsData, this.handlePlaylistSelect.bind(this));
    this.cancelButton = new CancelButton();
    this.track = track;
    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }

  static getInstance(track: Track): ModalPlaylists {
    if (!this.instance) {
      this.instance = new ModalPlaylists(playlistsData, track);
    } else {
      this.instance.setTrack(track);
    }
    return this.instance;
  }

  setTrack(track: Track): void {
    this.track = track;
  }

  private handlePlaylistSelect(playlist: PlaylistInfo): void {
    this.track.handleUserAction(UserAction.ADD, this.track, playlist);
    this.element?.remove()
    this.removeElement();
  }

  getTemplate(): string {

    return `
    <div class="playlists-modal__title">
      Добавить в плейлист
    </div>
    <div class="playlists-modal__footer">
    </div>
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const section = document.createElement('div');
    section.className = 'playlists-modal';
    section.innerHTML = template.trim();
    return section;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    this.playlistsList.render();
    const modal = this.getElement();
    modal.firstElementChild?.after(this.playlistsList.getElement());
    this.cancelButton.getElement().addEventListener('click', this.hidePopup.bind(this))
    modal.lastElementChild?.append(this.cancelButton.getElement());
  }

  handleDocumentClick(event: MouseEvent): void {
    if (this.element && !this.element.contains(event.target as Node)) {
      this.hidePopup();
    }
  }

  hidePopup() {
    if (this.element) {
      this.element.remove();
      this.removeElement();
    }
  }

}