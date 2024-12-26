import { BasicFunctionality, Creatable } from '../core/base'
import { PlaylistName } from './PlaylistName'
import { TrackInfo } from '../main/Track/Track'

export class Playlist extends BasicFunctionality implements Creatable {

  private element: HTMLElement | null = null;

  constructor(private fields: PlaylistInfo) {
    super()
    this.element = this.getElement();
  }

  getTemplate(): string {
    const playlistName = new PlaylistName(this.fields.name).getTemplate();

    return `
        ${playlistName}
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('li');
    element.className = 'aside__item';
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  getPlaylistName(): string {
    return this.fields.name;
  }

}

export interface PlaylistInfo {
  id?: number;
  name: string;
  tracks: TrackInfo[];
}