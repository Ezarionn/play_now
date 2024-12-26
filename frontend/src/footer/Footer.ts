import { PlayerTrack } from './PlayerTrack'
import { PlayerControls } from './PlayerControls'
import { PlayerVolume } from './PlayerVolume'
import { Track, TrackInfo } from '../main/Track/Track'
import { PlayerTrackFavouriteButton } from './PlayerTrackFavouriteButton'
import { MusicPlayer } from './AudioPlayer'

export class Footer {

  private element: HTMLElement | null = null;
  private playerTrack: PlayerTrack;
  private playerControls: PlayerControls;
  private playerVolume: PlayerVolume;
  private musicPlayer: MusicPlayer;

  constructor(private fieldsData: TrackInfo[], private currentTrack: TrackInfo, private currentTrackElement: Track) {
    this.element = this.getElement();
    this.playerTrack = new PlayerTrack(this.currentTrack);
    this.playerControls = new PlayerControls(this.currentTrack);
    this.playerVolume = new PlayerVolume();
    this.musicPlayer = new MusicPlayer(this.fieldsData, currentTrack, this.playerControls, this.playerVolume, this);
  }

  getMusicPlayer() {
    return this.musicPlayer;
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  createElement(): HTMLElement {
    const footer = document.createElement('footer')
    footer.className = 'footer'
    const footerContainer = document.createElement('div')
    footerContainer.className = 'player flex'
    footer.append(footerContainer)
    return footer
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const footer = this.getElement()
    this.playerTrack.render()
    this.playerControls.render()
    this.playerVolume.render()
    footer.firstElementChild?.prepend(this.playerTrack.getElement(), this.playerControls.getElement(), this.playerVolume.getElement());
  }

  getFavouriteButton(): PlayerTrackFavouriteButton {
    return this.playerTrack.getFavouriteButton()
  }

  getPlayerTrack(): PlayerTrack {
    return this.playerTrack;
  }

  updatePlayerTrack(songData: TrackInfo, playlist: TrackInfo[]) {
    this.updatePlayerTrackView(songData)
    this.musicPlayer.changeCurrentTrack(songData)
    this.musicPlayer.changePlayerPlaylist(playlist)
  }

  updatePlayerTrackView(newSongData: TrackInfo) {
    const newPlayerTrack = new PlayerTrack(newSongData);
    newPlayerTrack.render()
    this.playerTrack.getElement().remove()
    this.playerTrack = newPlayerTrack;
    const footer = this.getElement()
    footer.firstElementChild?.prepend(this.playerTrack.getElement())
  }

}