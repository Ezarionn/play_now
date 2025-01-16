import { BasicFunctionality } from '../../core/base'

export class TrackDuration extends BasicFunctionality {

  private element: HTMLElement | null = null;

  constructor(private duration: number, private className: string) {
    super()
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  getTemplate(): string {
    const secondsDuration = Math.floor(this.duration / 1000)
    const mins: number = Math.trunc(secondsDuration / 60);
    let seconds: number | string = secondsDuration % 60;
    if (seconds <= 9) {
      seconds = `0${seconds}`;
    }
    return `<time class="${this.className}">${mins}:${seconds}</time>`;
  }

  createElement(template: string): HTMLElement {
    const item = document.createElement('div');
    item.innerHTML = template.trim();
    return item.firstElementChild as HTMLElement;
  }
}