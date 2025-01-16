import { Creatable, Renderable } from '../core/base'
import { TrackInfo, Track } from './Track/Track'
import { PlaylistInfo } from '../aside/Playlist'
import { Aside } from '../aside/Aside'
import { TracksSection } from './TracksSection/TracksSection'
import { PlaylistsSection } from './PlaylistsSection/PlaylistsSection'
import { TrackList } from './TracksSection/TracksList'
import { ScreenPresenter } from './ScreenPresenter'
import { searchPresenter } from '../index'

export class Main implements Creatable, Renderable {

  private element: HTMLElement | null = null;
  private aside: Aside;
  private trackSection: TracksSection;
  private playlistSection: PlaylistsSection;
  private screenPresenter: ScreenPresenter;

  constructor(tracksData: TrackInfo[], playlistsData: PlaylistInfo[]) {
    this.element = this.getElement();
    this.aside = new Aside(playlistsData, (screen, playlistName) => this.screenPresenter.handleMenuSelect(screen, playlistName));
    this.trackSection = new TracksSection(tracksData);
    this.playlistSection = new PlaylistsSection(playlistsData, (screen, playlistName) => this.screenPresenter.handleMenuSelect(screen, playlistName));
    this.screenPresenter = new ScreenPresenter(this.trackSection, this.playlistSection, searchPresenter);
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  createElement(): HTMLElement {
    const section = document.createElement('div')
    section.className = 'content-wrap flex'
    const main = document.createElement('main')
    main.className = 'main'
    section.append(main)
    return section
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const section = this.getElement();
    this.trackSection.render()
    this.playlistSection.render()
    this.aside.render()

    section.lastElementChild?.prepend(this.trackSection.getElement(), this.playlistSection.getElement());
    section.prepend(this.aside.getElement())
  }

  getTracks(): Track[] {
    return this.trackSection.getTracks();
  }

  getTrackList(): TrackList {
    return this.trackSection.getTrackList();
  }

  getPlaylistsList() {
    return this.playlistSection.getPlaylistsList();
  }

  getCurrentScreen() {
    return this.screenPresenter.getCurrentScreen();
  }

  getAside() {
    return this.aside;
  }

  getScreenPresenter() {
    return this.screenPresenter;
  }

}

