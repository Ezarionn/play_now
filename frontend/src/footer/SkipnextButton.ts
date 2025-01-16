export class SkipnextButton {

  private element: HTMLElement | null = null;

  constructor() {
    this.element = this.getElement();
  }

  getTemplate(): string {
    return `
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 0.5V11.5C10 11.6326 9.94732 11.7598 9.85355 11.8536C9.75979 11.9473 9.63261 12 9.5 12C9.36739 12 9.24021 11.9473 9.14645 11.8536C9.05268 11.7598 9 11.6326 9 11.5V6.89151L1.52148 11.4618C1.36989 11.5544 1.19636 11.605 1.01873 11.6083C0.841109 11.6116 0.665804 11.5676 0.510852 11.4807C0.355901 11.3938 0.226897 11.2672 0.137111 11.1139C0.0473251 10.9606 -1.32783e-06 10.7861 0 10.6085V1.39154C-2.12292e-06 1.21389 0.0473207 1.03944 0.137101 0.886149C0.226881 0.732854 0.355877 0.606243 0.51082 0.519338C0.665764 0.432434 0.841061 0.388374 1.01868 0.39169C1.1963 0.395007 1.36983 0.44558 1.52142 0.538208L9 5.10846V0.5C9 0.367392 9.05268 0.240215 9.14645 0.146447C9.24021 0.0526785 9.36739 0 9.5 0C9.63261 0 9.75979 0.0526785 9.85355 0.146447C9.94732 0.240215 10 0.367392 10 0.5Z"
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
    item.className = 'player__skipnext-btn';
    item.innerHTML = template.trim();
    return item;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

}