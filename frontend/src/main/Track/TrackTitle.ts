import { BasicFunctionality, Creatable } from '../../core/base'
import { TrackInfo } from './Track';

export class TrackTitle extends BasicFunctionality implements Creatable {

  private element: HTMLElement | null = null;

  constructor(private fields: TrackInfo, private className: string) {
    super()
    this.element = this.getElement();
  }

  getTemplate(): string {
    if (this.className === 'track__name') {
      return ` 
        <h3 class="track__name" >${this.fields.title}</h3 >
      `
    }
    return `
      <h3 class="player__track__h3">${this.fields.title}</h3>
    `
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

}