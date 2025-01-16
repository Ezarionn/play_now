import { BasicFunctionality, Creatable, Renderable } from '../../core/base'
import { TrackInfo } from './Track';
import { TrackAuthor } from './TrackAuthor'
import { TrackTitle } from './TrackTitle'

export class TrackContent extends BasicFunctionality implements Creatable, Renderable {

  private element: HTMLElement | null = null;
  private name: TrackTitle;

  constructor(private fields: TrackInfo) {
    super()
    this.element = this.getElement();
    this.name = new TrackTitle(this.fields, 'track__name')
  }

  getTemplate(): string {
    const trackAuthor = new TrackAuthor(this.fields, 'player__track__author').getTemplate();

    return `
            ${trackAuthor}
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('div');
    element.className = 'track__content';
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const element = this.getElement();
    element.prepend(this.name.getElement());
  }

}