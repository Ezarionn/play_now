import { BasicFunctionality, Creatable, Renderable } from '../../core/base'
import { PlaylistInfo } from '../../aside/Playlist'
import { PlaylistLink } from './PlaylistLink'
import { ScreenState } from '../ScreenPresenter';

export class PlaylistContent extends BasicFunctionality implements Creatable, Renderable {

  private element: HTMLElement | null = null;
  private playlistLink: PlaylistLink;
  private onMenuSelect: (screen: ScreenState, playlistName?: string) => void;

  constructor(private fields: PlaylistInfo, onMenuSelect: (screen: ScreenState, playlistName?: string) => void) {
    super()
    this.element = this.getElement();
    this.onMenuSelect = onMenuSelect;
    this.playlistLink = new PlaylistLink(this.fields.name, this.onMenuSelect);

  }

  getTemplate(): string {
    return `
        <h3 class="playlist__h3">
        </h3>
        <span class="playlist__count">${this.getAmountOfTracks()} треков</span>
    `
  }

  getAmountOfTracks(): string {
    const tracksAmount = this.fields.tracks.length
    return `${tracksAmount}`
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('div');
    element.className = 'playlist__content';
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const element = this.getElement();
    element.firstElementChild?.append(this.playlistLink.getElement());
  }

}