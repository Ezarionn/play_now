export class ModalPlaylistName {

  constructor(private name: string) { }

  getTemplate(): string {
    return `
      <div class="playlists-modal__playlist__title">${this.name}</div>
    `
  }

}