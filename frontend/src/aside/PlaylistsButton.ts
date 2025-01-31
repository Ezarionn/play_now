import { BasicFunctionality, Creatable } from '../core/base'

export class PlaylistsButton extends BasicFunctionality implements Creatable {

  private element: HTMLElement | null = null;

  constructor() {
    super()
    this.element = this.getElement();
  }

  getTemplate(): string {
    return ` 
            <button class="aside__btn aside__btn-playlists aside__tabs-btn" data-path="playlists">
              <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.5 22C22.433 22 24 20.433 24 18.5C24 16.567 22.433 15 20.5 15C18.567 15 17 16.567 17 18.5C17 20.433 18.567 22 20.5 22Z"
                  stroke="#FC6D3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M4.5 26C6.433 26 8 24.433 8 22.5C8 20.567 6.433 19 4.5 19C2.567 19 1 20.567 1 22.5C1 24.433 2.567 26 4.5 26Z"
                  stroke="#FC6D3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M24 7L8 11" stroke="#FC6D3E" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M8 22.5V5L24 1V18.5" stroke="#FC6D3E" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              <span class="aside__btn__text">Плейлисты</span> 
            </button> 
    `;
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const item = document.createElement('li');
    item.className = 'aside__item';
    item.innerHTML = template.trim();
    return item;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

}