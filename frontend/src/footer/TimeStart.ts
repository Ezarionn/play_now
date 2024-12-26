import { TrackInfo } from '../main/Track/Track'

export class TimeStart {
  constructor(private track: TrackInfo) { }

  getTemplate(): string {
    const listened: number = 26
    const mins: number = Math.trunc(listened / 60);
    let seconds: number | string = listened - mins * 60;
    if (seconds <= 9) {
      seconds = `0${seconds}`;
    }
    return `
      <span class="player__time-start">${mins}:${seconds}</span>
    `;
  }
}