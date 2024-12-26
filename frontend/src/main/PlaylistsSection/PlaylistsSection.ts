import { BasicFunctionality, Creatable, Renderable } from '../../core/base'
import { PlaylistsList } from './PlaylistsList'
import { PlaylistInfo } from '../../aside/Playlist'
import { ScreenState } from '../ScreenPresenter';

export class PlaylistsSection extends BasicFunctionality implements Creatable, Renderable {

  private element: HTMLElement | null = null;
  private playlistsList: PlaylistsList;

  constructor(playlistsData: PlaylistInfo[], onMenuSelect: (screen: ScreenState, playlistName?: string) => void) {
    super()
    this.playlistsList = new PlaylistsList(playlistsData, onMenuSelect);
    this.element = this.getElement();
  }

  getTemplate(): string {
    return `
          <h2 class="playlist__h2 visually-hidden">Плейлисты</h2>
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const section = document.createElement('section')
    section.className = 'playlist section tabs-content'
    section.innerHTML = template.trim();
    return section
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    this.playlistsList.render();
    const section = this.getElement();
    section.append(this.playlistsList.getElement());
  }

  getPlaylistsList() {
    return this.playlistsList;
  }

}