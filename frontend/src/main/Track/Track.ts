import { BasicFunctionality, Creatable, Renderable, UserAction } from '../../core/base'
import { TrackNumber } from './TrackNumber'
import { TrackImage } from './TrackImage'
import { TrackContent } from './TrackContent'
import { TrackAlbum } from './TrackAlbum'
import { TrackData } from './TrackData'
import { TrackDuration } from './TrackDuration'
import { TrackDropdown } from './TrackDropdown'
import { TrackModel } from './TrackModel'
import { trackList, tracksElements, footer } from '../../index'
import { TrackList } from '../TracksSection/TracksList'
import { TrackFavouriteButton } from './TrackFavouriteButton'
import { PlaylistInfo } from '../../aside/Playlist'

export interface TrackInfo {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  addedDate: Date;
  isFavorite: boolean;
  path: string;
  image: string;
  filename: string;
}

export class Track extends BasicFunctionality implements Creatable, Renderable {

  private element: HTMLElement | null = null;
  private trackData: TrackData;
  private trackContent: TrackContent;
  private trackDropdown: TrackDropdown;
  private model: TrackModel;
  static oldTrackList: TrackList | null = null;
  static currentPlaylistName: string | undefined;

  constructor(private fields: TrackInfo, private tracksModelUnit: TrackModel) {
    super()
    this.model = this.tracksModelUnit;
    this.element = this.getElement();
    this.trackData = new TrackData(this.fields, this);
    this.trackContent = new TrackContent(this.fields);
    this.trackDropdown = new TrackDropdown(this);
    this.addEventListeners();
  }

  getFavouriteButton(): TrackFavouriteButton {
    return this.trackData.getFavouriteButton()
  }

  getTrackTitle(): string {
    return this.fields.title;
  }

  getTrackArtist(): string {
    return this.fields.artist;
  }

  getPlaylistName(): string | undefined {
    return this.model.getPlaylistName()
  }

  getTrackId(): number | undefined {
    return this.fields.id;
  }

  getTemplate(): string {
    const trackNumber = new TrackNumber().getTemplate();
    const trackImage = new TrackImage(this.fields, 'track__img').getTemplate();
    const trackAlbum = new TrackAlbum(this.fields.album).getTemplate();
    const trackDuration = new TrackDuration(this.fields.duration, 'tracks__item__time').getTemplate();

    return `
    ${trackNumber}
      <div class="tracks__item__name">
        ${trackImage}
      </div>
      ${trackAlbum}
      ${trackDuration}
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('li');
    element.className = 'tracks__item flex';
    element.tabIndex = 0;
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(indexNumber: number): void {
    const element = this.getElement();
    this.trackData.render()
    this.trackContent.render()
    const trackNumberElement = element.firstElementChild
    if (trackNumberElement) {
      trackNumberElement.textContent = ''
      trackNumberElement.textContent = `${indexNumber}`
    }
    element.lastElementChild?.before(this.trackData.getElement());
    element.firstElementChild?.nextElementSibling?.append(this.trackContent.getElement());
    element.lastElementChild?.after(this.trackDropdown.getElement());
  }

  private addEventListeners(): void {
    this.element?.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick(): void {
    const tracks = this.model.getPlaylist()?.tracks;
    if (tracks) {
      footer.updatePlayerTrack(this.fields, tracks)
    }
  }

  handleUserAction(action: UserAction, track: Track): void;
  handleUserAction(action: UserAction, trackToAdd: Track, playlistFields: PlaylistInfo): void;
  handleUserAction<K extends keyof TrackInfo>(action: UserAction, id: number, field: K, newData: TrackInfo[K]): void;

  handleUserAction(action: UserAction, ...args: unknown[]) {
    switch (action) {
      case UserAction.DELETE:
        if (args.length > 0) {
          const trackToDelete = args[0] as Track;
          if (trackToDelete !== undefined) {
            this.deleteTrackFromPlaylist(trackToDelete);
          }
        }
        break;
      case UserAction.ADD:
        if (args.length === 2) {
          const trackToAdd = args[0] as Track;
          const playlistFields = args[1] as PlaylistInfo;
          if (trackToAdd !== undefined && playlistFields !== undefined) {
            this.addTrackToPlaylist(trackToAdd, playlistFields);
            this.updateTrackListView()
          }
        }
        break;
      case UserAction.UPDATE:
        if (args.length === 3) {
          const id = args[0] as number;
          const field = args[1] as keyof TrackInfo;
          const newData = args[2] as TrackInfo[typeof field];
          if (id !== undefined && field !== undefined && newData !== undefined) {
            this.updateTrackData(id, field, newData);
          }
        }
        break;
    }
  }

  updateTrackData<K extends keyof TrackInfo>(id: number, field: K, newData: TrackInfo[K]): void {
    this.model.updateTrackData(id, field, newData)
  }

  addTrackToPlaylist(trackToAdd: Track, playlistName: PlaylistInfo) {
    this.model.addTrackToPlaylist(trackToAdd, playlistName)
  }

  static updateTrackList(context: Track, newTrackList: TrackList) {
    const newPlaylistName = context.model.getPlaylistName();
    if (this.currentPlaylistName !== newPlaylistName) {
      this.oldTrackList = null;
      Track.currentPlaylistName = newPlaylistName;
    }
    const currentTrackList = Track.oldTrackList || context.model.getTrackList();
    Track.oldTrackList = newTrackList;
    return currentTrackList;
  }
  updateTrackListView() {
  }

  deleteTrackFromPlaylist(track: Track) {
    this.model.deleteTrack(track.fields)
    const tracksAfterDelete = this.model.getTracks();
    if (tracksAfterDelete) {
      const newTrackList = new TrackList(tracksAfterDelete)
      newTrackList.render()
      if (!this.model.getTrackList()) {
        this.model.setTrackList(trackList)
      }
      let oldTrackList = Track.updateTrackList(track, newTrackList);
      if (oldTrackList) {
        oldTrackList.getElement().replaceWith(newTrackList.getElement());
        oldTrackList = newTrackList;
      }
    }
    this.removeTrackElement(track)
  }

  removeTrackElement(track: Track) {
    if (track.element) {
      track.element.remove();
      track.element = null;
    }
  }

  refreshTrack(title: string, artist: string) {
    const track = tracksElements.find(
      track => track.fields.title === title && track.fields.artist === artist
    );
    const trackNumberElement = track?.getElement().firstElementChild
    const trackNumber: string | null | undefined = trackNumberElement?.textContent

    if (track) {
      const currentElement = track.getElement();
      this.trackData = new TrackData(this.model.getTrackData(title, artist), this);
      if (currentElement && trackNumber) {
        currentElement.innerHTML = this.getTemplate().trim();
        this.trackData.render();
        this.trackContent.render();
        if (trackNumberElement) {
          trackNumberElement.textContent = `x`
        }
        currentElement.lastElementChild?.before(this.trackData.getElement());
        currentElement.firstElementChild?.nextElementSibling?.append(this.trackContent.getElement());
        currentElement.lastElementChild?.after(this.trackDropdown.getElement());
      }
    }
  }

}
