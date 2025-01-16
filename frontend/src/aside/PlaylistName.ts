import { BasicFunctionality } from '../core/base'

export class PlaylistName extends BasicFunctionality {
  constructor(private name: string) {
    super()
  }

  getTemplate(): string {
    return `<button class="aside__btn aside__btn-playlist">${this.name}</button>`;
  }
}