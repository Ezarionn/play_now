import { BasicFunctionality, Creatable } from '../../core/base'
import { ScreenState } from '../ScreenPresenter';

export class PlaylistLink extends BasicFunctionality implements Creatable {

  private element: HTMLElement | null = null;
  private onMenuSelect: (screen: ScreenState, playlistName?: string) => void;

  constructor(private name: string, onMenuSelect: (screen: ScreenState, playlistName?: string) => void) {
    super()
    this.element = this.getElement();
    this.addEventListeners();
    this.onMenuSelect = onMenuSelect;
  }

  getTemplate(): string {

    return `
        <a class="playlist__h3__link" href="#">${this.name}</a>
    `;
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const item = document.createElement('div');
    item.innerHTML = template.trim();
    return item.firstElementChild as HTMLElement;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  addEventListeners(): void {
    this.element?.addEventListener('click', () => this.onMenuSelect(ScreenState.PlaylistTracks, this.name));
  }

}