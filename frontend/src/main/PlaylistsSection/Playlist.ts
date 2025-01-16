import { BasicFunctionality, Creatable, Renderable } from '../../core/base'
import { PlaylistCover } from './PlaylistCover'
import { PlaylistContent } from './PlaylistContent'
import { PlaylistInfo } from '../../aside/Playlist'
import { ScreenState } from '../ScreenPresenter'

export class Playlist extends BasicFunctionality implements Creatable, Renderable {

  private element: HTMLElement | null = null;
  private playlistContent: PlaylistContent;
  private onMenuSelect: (screen: ScreenState, playlistName?: string) => void;

  constructor(private fields: PlaylistInfo, onMenuSelect: (screen: ScreenState, playlistName?: string) => void) {
    super()
    this.element = this.getElement();
    this.onMenuSelect = onMenuSelect;
    this.playlistContent = new PlaylistContent(this.fields, this.onMenuSelect);
  }

  getTemplate(): string {
    const playlistCover = new PlaylistCover(this.fields.name).getTemplate();

    return `
      ${playlistCover} 
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('li');
    element.className = 'playlist__item';
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const element = this.getElement();
    this.playlistContent.render()
    element.lastElementChild?.after(this.playlistContent.getElement());
  }

}