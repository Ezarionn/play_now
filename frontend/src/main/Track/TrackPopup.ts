import { Track } from './Track'
import { UserAction } from '../../core/base'
import { ModalPlaylists } from '../../modal/ModalPlaylists'
import { trackModel } from '../../index';

export class TrackPopup {

  private static instance: TrackPopup;
  private element: HTMLElement | null = null;
  private isVisible: boolean | false = false;
  private track: Track;
  private presenter: Track | null = null;

  private constructor(track: Track) {
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    this.track = track;
  }

  static getInstance(track: Track): TrackPopup {
    if (!this.instance) {
      this.instance = new TrackPopup(track);
    } else {
      this.instance.setTrack(track);
    }
    return this.instance;
  }

  setPresenter(presenter: Track): void {
    this.presenter = presenter;
  }

  removePresenter(): void {
    this.presenter = null;
  }

  setTrack(track: Track): void {
    this.track = track;
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  getCurrentStatus() {
    return this.isVisible;
  }

  createElement(): HTMLElement {
    const element = document.createElement('div');
    element.className = 'track__dropdown';
    const button = document.createElement('button');
    if (!this.isTrackAddedToPlaylist()) {
      button.className = 'track__add-btn';
      button.textContent = 'Добавить в плейлист'
      button.addEventListener('click', this.handleAddToPlaylist.bind(this));
    } else {
      button.className = 'track__delete-btn';
      button.textContent = 'Удалить из плейлиста'
      button.addEventListener('click', this.handleRemoveFromPlaylist.bind(this));
    }
    element.prepend(button)
    return element;
  }

  isTrackAddedToPlaylist(): boolean {
    const playlists = trackModel.getPlaylistsData()?.filter(playlist => playlist.name !== 'favourites' && playlist.name !== 'recommendedTracks');
    if (playlists) {
      for (const playlist of playlists) {
        if (playlist.tracks.some(track => track.id === this.track.getTrackId())) {
          return true;
        }
      }
    }
    return false;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  showPopup(element: Track): void {
    this.setPresenter(this.track)
    const targetElement = element.getElement();
    const popupElement = this.getElement();
    targetElement.lastElementChild?.lastElementChild?.after(popupElement);
  }

  handleDocumentClick(event: MouseEvent): void {
    if (this.element && !this.element.contains(event.target as Node)) {
      this.hidePopup();
      this.removePresenter()
    }
  }

  hidePopup() {
    if (this.element) {
      this.element.remove();
      this.removeElement();
    }
  }

  handleRemoveFromPlaylist(): void {
    if (!this.presenter) {
      this.setPresenter(this.track);
    }
    if (this.presenter) {
      this.presenter.handleUserAction(UserAction.DELETE, this.track);
      this.hidePopup();
    }
  }

  handleAddToPlaylist(): void {
    if (!this.presenter) {
      this.setPresenter(this.track);
    }
    if (this.presenter) {
      this.hidePopup();
      const modalPlaylists = ModalPlaylists.getInstance(this.track);
      modalPlaylists.render();
      document.body.prepend(modalPlaylists.getElement());
    }
  }

}