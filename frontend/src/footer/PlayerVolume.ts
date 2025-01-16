import { VolumeIcon } from './VolumeIcon'
import { VolumeRange } from './VolumeRange'

export class PlayerVolume {

  private element: HTMLElement | null;
  private volumeIcon: VolumeIcon;
  private volumeRange: VolumeRange;

  constructor() {
    this.element = this.getElement();
    this.volumeIcon = new VolumeIcon();
    this.volumeRange = new VolumeRange();
  }

  getVolumeRangeElement(): HTMLElement {
    return this.volumeRange.getElement();
  }

  getVolumeRange(): VolumeRange {
    return this.volumeRange;
  }

  getVolumeIconElement(): HTMLElement {
    return this.volumeIcon.getElement();
  }

  getVolumeIcon(): VolumeIcon {
    return this.volumeIcon;
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  createElement(): HTMLElement {
    const element = document.createElement('div');
    element.className = 'player__value';
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const element = this.getElement();
    element.prepend(this.volumeIcon.getElement(), this.volumeRange.getElement());
  }

}