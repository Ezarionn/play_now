import { BasicFunctionality, Creatable, Renderable } from '../../core/base'
import { TrackInfo } from './Track';
import { TrackFavouriteButton } from './TrackFavouriteButton'
import { Track } from './Track'


export class TrackData extends BasicFunctionality implements Creatable, Renderable {

  private element: HTMLElement | null = null;
  private favouriteButton: TrackFavouriteButton;

  constructor(private fields: TrackInfo, track: Track) {
    super()
    this.element = this.getElement();
    this.favouriteButton = new TrackFavouriteButton(this.fields, track);
  }

  private getDaysAgoTrackAdded(): string {
    const currentDate: Date = new Date();
    const daysDiff: number = Math.trunc((currentDate.getTime() - this.fields.addedDate.getTime()) / (1000 * 60 * 60 * 24));
    return `${daysDiff} дней назад`;
  }

  getTemplate(): string {

    return `
        <span class="data__text">${this.getDaysAgoTrackAdded()}</span>
    `;
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('div');
    element.className = 'tracks__item__data flex';
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const element = this.getElement();
    element.append(this.favouriteButton.getElement());
  }

  getFavouriteButton(): TrackFavouriteButton {
    return this.favouriteButton;
  }
}