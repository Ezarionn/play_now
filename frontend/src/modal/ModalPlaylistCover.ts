export class ModalPlaylistCover {

  constructor(private name: string) { }

  getTemplate(): string {
    return `
      <img src="./public/tracks%20(2).jpg" alt="${this.name}" class="playlists-modal__playlist__image" />
    `
  }

}