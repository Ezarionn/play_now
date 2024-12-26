import { BasicFunctionality } from '../../core/base'
import { TrackInfo } from '../Track/Track'

export class TrackImage extends BasicFunctionality {

  constructor(private fields: TrackInfo, private className: string) {
    super()
  }

  getTemplate(): string {
    return `<img class="${this.className}" src="${this.fields.image}" alt="${this.fields.title} - ${this.fields.artist}">`;
  }
}