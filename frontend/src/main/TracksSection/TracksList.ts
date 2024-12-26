import { Creatable, Renderable } from '../../core/base'
import { Track, TrackInfo, } from '../Track/Track';
import { trackModel } from '../../index'

export class TrackList implements Creatable, Renderable {
  private element: HTMLElement | null = null;
  private tracks: Track[];

  constructor(tracksData: TrackInfo[]) {
    this.tracks = tracksData.map(trackData => new Track(trackData, trackModel));
    this.element = this.getElement()
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  createElement(): HTMLElement {
    const element = document.createElement('ul')
    element.className = ('tracks__list');
    return element;
  }

  removeElement(): null {
    this.element = null
    return this.element
  }

  render(): void {
    const element = this.getElement()
    this.tracks.forEach((track, index) => {
      track.render(index + 1)
      element.appendChild(track.getElement());
    });
  }

  replaceWithNew(tracksData: TrackInfo[]) {
    this.updateTracks(tracksData);
  }

  updateTracks(tracks: TrackInfo[]) {
    this.tracks = tracks.map(trackData => new Track(trackData, trackModel));
  }

  getTracks(): Track[] {
    return this.tracks;
  }

  getTrackList(): TrackList {
    return this;
  }

}