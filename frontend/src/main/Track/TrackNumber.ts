import { Creatable } from '../../core/base'

export class TrackNumber implements Creatable {

  private element: HTMLElement | null = null;

  constructor() { }

  getTemplate(): string {
    return `<div class="tracks__item__number"></div>`;
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  createElement(): HTMLElement {
    this.element = document.createElement('div');
    this.element.className = 'tracks__item__number';
    return this.element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }
}

