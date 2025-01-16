export class SkipbackButton {

  private element: HTMLElement | null = null;

  constructor() {
    this.element = this.getElement();
  }

  getTemplate(): string {
    return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.5 2C3.63261 2 3.75978 2.05268 3.85355 2.14645C3.94732 2.24022 4 2.36739 4 2.5V7.10846L11.4786 2.53821C11.6302 2.44558 11.8037 2.39501 11.9813 2.39169C12.1589 2.38838 12.3342 2.43244 12.4892 2.51934C12.6441 2.60624 12.7731 2.73285 12.8629 2.88615C12.9527 3.03944 13 3.21389 13 3.39154V12.6085C12.9999 12.7861 12.9526 12.9605 12.8628 13.1137C12.773 13.267 12.644 13.3936 12.489 13.4805C12.3341 13.5674 12.1588 13.6114 11.9812 13.6081C11.8036 13.6048 11.6301 13.5543 11.4785 13.4618L4 8.89151V13.5C4 13.6326 3.94732 13.7598 3.85355 13.8536C3.75979 13.9473 3.63261 14 3.5 14C3.36739 14 3.24021 13.9473 3.14645 13.8536C3.05268 13.7598 3 13.6326 3 13.5V2.5C3 2.36739 3.05268 2.24022 3.14645 2.14645C3.24022 2.05268 3.36739 2 3.5 2Z"
                  fill="#AAAAAA" />
              </svg>
    `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const item = document.createElement('button');
    item.className = 'player__skipback-btn';
    item.innerHTML = template.trim();
    return item;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

}