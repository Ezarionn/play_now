export class VolumeRange {

  private element: HTMLElement | null = null;
  private input: HTMLInputElement | null = null;

  constructor() {
    this.element = this.getElement();
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  createElement(): HTMLElement {
    const item = document.createElement('div');
    item.className = 'player__value-range';
    item.id = 'range-value';
    item.append(this.getVolumeInput());
    return item;
  }

  private createRangeInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'volume-range';
    input.value = '20';
    input.style.setProperty('--value', '20%');
    input.min = '0';
    input.max = '100';
    input.step = '1';
    return input;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  getVolumeInput(): HTMLInputElement {
    this.input ??= this.createRangeInput();
    return this.input;
  }

}