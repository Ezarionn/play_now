import { BasicFunctionality, Creatable, Interactive } from '../../core/base'
import { TrackPopup } from './TrackPopup'
import { Track } from './Track'

export class TrackDropdown extends BasicFunctionality implements Creatable, Interactive {

  private element: HTMLElement | null = null;
  private track: Track;

  constructor(track: Track) {
    super()
    this.element = this.getElement();
    this.addEventListeners();
    this.track = track;
  }

  getTemplate(): string {
    return `
        <button class="track__btn-dropdown">
          <svg width="23" height="4" viewBox="0 0 23 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
            <circle cx="11.5" cy="2" r="2" fill="#C4C4C4" />
            <circle cx="21" cy="2" r="2" fill="#C4C4C4" />
          </svg>
        </button>
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('div');
    element.className = 'tracks__item__drop';
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  addEventListeners(): void {
    this.element?.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event: Event): void {
    event.stopPropagation()
    const popupManager = TrackPopup.getInstance(this.track);
    popupManager.hidePopup();
    popupManager.showPopup(this.track);

  }

}

