import { BasicFunctionality, Creatable } from '../core/base'

export class Search extends BasicFunctionality implements Creatable {

  private element: HTMLElement | null = null;
  private onSearchInputChange: (value: string) => void;

  constructor() {
    super();
    this.element = this.getElement();
    this.addEventListeners();
    this.onSearchInputChange = () => { };
  }

  getTemplate(): string {
    return `
      <input class="header__search__field" type="search" placeholder="ЧТО БУДЕМ ИСКАТЬ?">
    `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('div');
    element.className = 'header__search';
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  addEventListeners(): void {
    const inputField = this.element?.querySelector('.header__search__field') as HTMLInputElement;
    inputField?.addEventListener('input', this.handleInput.bind(this));
  }

  handleInput(event: Event): void {
    const inputField = event.target as HTMLInputElement;
    const value = inputField.value;
    this.onSearchInputChange(value);
  }

  setSearchInputChange(callback: (value: string) => void) {
    this.onSearchInputChange = callback;
  }

  updateElement(newElement: HTMLElement): void {
    this.element = newElement;
    this.addEventListeners();
  }

}