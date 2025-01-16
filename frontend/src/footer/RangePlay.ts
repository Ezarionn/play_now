import { TrackInfo } from '../main/Track/Track'

export class RangePlay {

  private element: HTMLElement | null = null;

  constructor(private tracks: TrackInfo) {
    this.element = this.getElement();
  }

  getTemplate(): string {
    return `
      <div class="player__range-play" id="range-play"></div>
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
}