import { TrackInfo } from '../main/Track/Track'
import { TrackImage } from '../main/Track/TrackImage'
import { PlayerTrackFavouriteButton } from './PlayerTrackFavouriteButton'
import { TrackAuthor } from '../main/Track/TrackAuthor'
import { TrackTitle } from '../main/Track/TrackTitle'

export class PlayerTrack {

  private element: HTMLElement | null = null;
  private trackFavouriteButton: PlayerTrackFavouriteButton;

  constructor(private fields: TrackInfo) {
    this.element = this.getElement();
    this.trackFavouriteButton = new PlayerTrackFavouriteButton(this.fields)
  }

  getTemplate(): string {
    const trackImage = new TrackImage(this.fields, 'player__track__img').getTemplate();
    const trackAuthor = new TrackAuthor(this.fields, 'player__track__author').getTemplate();
    const trackTitle = new TrackTitle(this.fields, 'player__track__h3').getTemplate();

    return `
      ${trackImage}
          <div class="player__track-name__content">
            <div class="flex player__name__header">
              ${trackTitle}
            </div>
            ${trackAuthor}
          </div>
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('div');
    element.className = 'player__track-name flex';
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const element = this.getElement();
    element.lastElementChild?.firstElementChild?.append(this.trackFavouriteButton.getElement());
  }

  getFavouriteButton(): PlayerTrackFavouriteButton {
    return this.trackFavouriteButton
  }

  updateFavouriteButton(isFavorite: boolean) {
    const button = this.trackFavouriteButton.getElement();
    button.classList.toggle('like-btn--active', isFavorite);
  }

}