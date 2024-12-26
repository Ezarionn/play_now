import { BasicFunctionality, Creatable, Renderable } from '../../core/base'
import { TrackList } from './TracksList';
import { TrackInfo, Track } from '../Track/Track';
import { TracksHeader } from './TracksHeader'

export class TracksSection extends BasicFunctionality implements Creatable, Renderable {
  private element: HTMLElement | null = null;
  private trackList: TrackList;

  constructor(tracksData: TrackInfo[]) {
    super()
    this.trackList = new TrackList(tracksData);
    this.element = this.getElement();
  }

  getTemplate(): string {
    const tracksHeader = new TracksHeader().getTemplate()

    return `
          <h2 class="tracks__h2 title__h2">Треки</h2>
          <div class="tracks__content">
            ${tracksHeader}
            </div>
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const section = document.createElement('section')
    section.className = 'tracks section tabs-content section--active'
    section.innerHTML = template.trim();
    return section
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const section = this.getElement()
    if (this.getTracks().length > 0) {
      this.trackList.render();
      section.lastElementChild?.append(this.trackList.getElement());
    } else {
      const warning = document.createElement('p')
      warning.className = 'warning-txt'
      warning.textContent = 'В текущем плейлисте нет ни одного трека'
      section.lastElementChild?.append(warning);
    }
  }

  getTracks(): Track[] {
    return this.trackList.getTracks();
  }

  getTrackList(): TrackList {
    return this.trackList;
  }
}
