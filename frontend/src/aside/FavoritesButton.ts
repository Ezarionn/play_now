import { BasicFunctionality, Creatable } from '../core/base'

export class FavoritesButton extends BasicFunctionality implements Creatable {

  private element: HTMLElement | null = null;

  constructor() {
    super()
    this.element = this.getElement();
  }

  getTemplate(): string {
    return `
              <button class="aside__btn aside__btn-favourites">Любимые песни</button>
    `;
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const item = document.createElement('li');
    item.className = 'aside__item'
    item.innerHTML = template.trim();
    return item;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

}