import { BasicFunctionality } from '../../core/base'
import { TrackInfo } from './Track';

export class TrackAuthor extends BasicFunctionality {

  constructor(private fields: TrackInfo, private className: string) {
    super()
  }

  getTemplate(): string {
    return `
      <span class="${this.className}">${this.fields.artist}</span>
    `;
  }

}