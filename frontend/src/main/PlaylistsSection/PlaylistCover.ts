import { BasicFunctionality } from '../../core/base'

export class PlaylistCover extends BasicFunctionality {

  constructor(private name: string) {
    super()
  }

  getTemplate(): string {
    return `
      <picture>
        <source srcset="./public/playlists__360%20(1).jpg" media="(max-width: 576px)">
        <source srcset="./public/playlists__1440%20(1).jpg" media="(max-width: 1440px)">
        <img class="playlist__img" src="./public/playlists%20(1).jpg" alt="${this.name}">
      </picture>
    `
  }

}