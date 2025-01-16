import { Creatable } from '../core/base'

export class CancelButton implements Creatable {

  private element: HTMLElement | null = null;

  constructor() {
    this.element = this.getElement();
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  createElement(): HTMLElement {
    const button = document.createElement('button');
    button.className = 'playlists-modal__close-btn'
    button.textContent = 'Отменить'
    return button;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

}