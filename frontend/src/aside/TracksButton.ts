export class TracksButton {

  private element: HTMLElement | null = null;

  constructor() {
    this.element = this.getElement();
  }

  getTemplate(): string {
    return ` 
            <button class="aside__btn aside__btn-tracks aside__tabs-btn" data-path="tracks">
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.5185 12.1467L2.52146 1.14814C2.36988 1.0555 2.19634 1.00492 2.01872 1.00159C1.8411 0.998268 1.6658 1.04232 1.51085 1.12922C1.3559 1.21612 1.2269 1.34273 1.13711 1.49602C1.04733 1.64932 1 1.82376 1 2.00142V23.9986C1 24.1762 1.04733 24.3507 1.13711 24.504C1.2269 24.6573 1.3559 24.7839 1.51085 24.8708C1.6658 24.9577 1.8411 25.0017 2.01872 24.9984C2.19634 24.9951 2.36988 24.9445 2.52146 24.8519L20.5185 13.8533C20.6647 13.7639 20.7855 13.6386 20.8693 13.4891C20.9531 13.3397 20.9971 13.1713 20.9971 13C20.9971 12.8287 20.9531 12.6603 20.8693 12.5108C20.7855 12.3614 20.6647 12.2361 20.5185 12.1467Z"
                  stroke="#FC6D3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="aside__btn__text">Треки</span> 
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