import { BasicFunctionality } from '../../core/base'

export class TrackAlbum extends BasicFunctionality {
  constructor(private album: string) {
    super()
  }

  getTemplate(): string {
    return `<div class="tracks__item__albom">${this.album}</div>`;
  }
}