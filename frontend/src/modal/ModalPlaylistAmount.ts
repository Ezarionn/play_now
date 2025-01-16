import { TrackInfo } from '../main/Track/Track'

export class ModalPlaylistAmount {

  constructor(private tracks: TrackInfo[]) { }

  getTemplate(): string {
    return `
      <div class="playlists-modal__playlist__info">${this.getAmountOfTracks()}</div>
    `
  }

  getAmountOfTracks(): string {
    let tracksAmount: string | number = this.tracks.length
    if (tracksAmount === 0) {
      tracksAmount = 'Нет'
    }
    return `${tracksAmount} треков`
  }

}