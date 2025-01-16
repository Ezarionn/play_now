import { TrackInfo } from '../main/Track/Track'
import { PlayerControls } from './PlayerControls'
import { PlayerVolume } from './PlayerVolume'
import { Footer } from './Footer'
import { trackModel } from '../index'

export class MusicPlayer {
  private audio: HTMLAudioElement;
  private currentTrack: TrackInfo;
  private previousTracks: TrackInfo[] = [];
  private currentTrackIndex: number;
  private isShuffle: boolean = false;
  private isRepeat: boolean = false;
  private isPlaying: boolean = false;
  private previousVolume: number = 1;
  private currentVolume: number = 0.1;
  private vanillaPlaylist: TrackInfo[];
  private shuffledPlaylist: TrackInfo[] = [];
  private playingPlaylist: TrackInfo[];
  private footer: Footer;
  private highlightedElement: HTMLElement | null = null;

  constructor(private tracks: TrackInfo[], currentTrack: TrackInfo, private playerControls: PlayerControls, private playerVolume: PlayerVolume, private footerEl: Footer) {
    this.audio = new Audio();
    this.audio.volume = this.currentVolume;
    this.currentTrack = currentTrack;
    this.vanillaPlaylist = tracks;
    this.playingPlaylist = this.vanillaPlaylist;
    this.currentTrackIndex = this.vanillaPlaylist.findIndex(track => track.id === currentTrack.id);
    this.footer = footerEl;
    this.loadTrack();
    this.setupEventListeners();
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.autoNext());
  }

  getCurrentTrack(): TrackInfo {
    return this.currentTrack;
  }

  private loadTrack(): void {
    this.audio.src = `http://localhost:3000${this.currentTrack.path}`;
    this.audio.load();
  }

  private setupEventListeners(): void {
    this.playerControls.getPlayButton().getElement().addEventListener('click', () => this.togglePlayPause());
    this.playerControls.getSkipnextButton().getElement().addEventListener('click', () => this.next());
    this.playerControls.getSkipbackButton().getElement().addEventListener('click', () => this.prev());
    this.playerControls.getShuffleButton().getElement().addEventListener('click', () => this.toggleShuffle());
    this.playerControls.getRepeatButton().getElement().addEventListener('click', () => this.toggleRepeat());

    this.playerVolume.getVolumeRangeElement().addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const volume = parseFloat(target.value) / 100;
      this.changeVolume(volume);
      const percent = (parseFloat(target.value) / 100) * 100;
      target.style.setProperty('--value', `${percent}%`);
    });

    this.playerVolume.getVolumeIconElement().addEventListener('click', () => this.toggleMute());

    const progressInput = this.playerControls.getProgressInput();

    progressInput.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const newPosition = (parseFloat(target.value) / 100) * this.audio.duration;
      this.audio.currentTime = newPosition;
    });

  }

  togglePlayPause(): void {
    this.isPlaying = !this.isPlaying;
    this.playerControls.getPlayButton().updateButtonIcon(this.isPlaying);

    if (this.isPlaying === true) {
      this.play();
    } else {
      this.pause();
    }
  }

  play(): void {
    if (this.currentTrack && (this.previousTracks.length === 0 || this.previousTracks[0].id !== this.currentTrack.id)) {
      this.previousTracks.unshift(this.currentTrack);
    }
    this.audio.play();
    this.highlightCurrentTrack();
  }

  pause(): void {
    this.audio.pause();
  }

  next(): void {
    this.pause()
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playingPlaylist.length;
    this.currentTrack = this.playingPlaylist[this.currentTrackIndex]
    this.updateCurrentTrack()
    this.footer.updatePlayerTrackView(this.currentTrack)
    this.audio.volume = this.currentVolume;
    this.audio.addEventListener('canplay', () => {
      if (this.isPlaying) {
        this.play();
      } else {
        this.pause()
      }
    }, { once: true });
    this.audio.addEventListener('ended', () => this.autoNext());
  }

  autoNext() {
    if (this.isRepeat) {
      this.play()
    } else {
      this.next()
    }
  }

  prev(): void {
    this.pause()
    if (this.previousTracks.length > 0) {
      this.currentTrack = this.previousTracks[1];
      this.previousTracks.shift();
      this.updateCurrentTrack()
      this.footer.updatePlayerTrackView(this.currentTrack)
      this.audio.volume = this.currentVolume;
      this.audio.addEventListener('canplay', () => {
        if (this.isPlaying) {
          this.play();
        } else {
          this.pause()
        }
      }, { once: true });
    }
  }

  toggleShuffle(): void {
    this.isShuffle = !this.isShuffle;
    if (this.isShuffle) {
      this.shuffledPlaylist = [...this.vanillaPlaylist];
      this.getShuffledArray(this.shuffledPlaylist)
      this.playingPlaylist = this.shuffledPlaylist;
    } else {
      this.shuffledPlaylist = [];
      this.playingPlaylist = this.vanillaPlaylist;
    }
    const shuffleButton = this.playerControls.getShuffleButton();
    shuffleButton.updateButtonIcon(this.isShuffle);
  }

  private getShuffledArray(array: TrackInfo[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    const currentTrackIndex = this.shuffledPlaylist.findIndex(track => track.id === this.currentTrack.id);
    if (currentTrackIndex > 0) {
      const currentTrack = this.shuffledPlaylist.splice(currentTrackIndex, 1)[0];
      this.shuffledPlaylist.unshift(currentTrack);
    }
  }

  toggleRepeat(): void {
    this.isRepeat = !this.isRepeat;

    const repeatButton = this.playerControls.getRepeatButton();
    repeatButton.updateButtonIcon(this.isRepeat);
  }

  changeVolume(volume: number): void {
    this.currentVolume = volume;
    this.audio.volume = this.currentVolume;
  }

  toggleMute(): void {
    this.audio.muted = !this.audio.muted;
    const volumeIcon = this.playerVolume.getVolumeIcon();
    const volumeInputRange = this.playerVolume.getVolumeRange().getVolumeInput()
    if (volumeInputRange) {
      if (this.audio.muted) {
        volumeIcon.updateButtonIcon(true)
        volumeInputRange.style.setProperty('--value', `0%`);
        this.previousVolume = parseFloat(volumeInputRange.value) / 100;
        volumeInputRange.value = '0';
      } else {
        volumeIcon.updateButtonIcon(false)
        volumeInputRange.value = (this.previousVolume * 100).toString();
        volumeInputRange.style.setProperty('--value', `${(this.previousVolume * 100).toString()}%`);
      }
    }
  }

  private updateProgress(): void {
    this.playerControls.getRangePlay().updateProgress(this.audio.currentTime, this.audio.duration);
  }

  changeCurrentTrack(newtrackData: TrackInfo) {
    if (this.isPlaying === true && this.currentTrack === newtrackData) {
      this.pause()
      this.isPlaying = false
      this.playerControls.getPlayButton().updateButtonIcon(this.isPlaying);
    } else {
      this.pause()
      this.isPlaying = false
      this.playerControls.getPlayButton().updateButtonIcon(this.isPlaying);
      this.audio.currentTime = 0.0;
      this.currentTrack = newtrackData;
      this.audio = new Audio();
      this.audio.volume = this.currentVolume;
      this.loadTrack();
      this.play()
      this.isPlaying = true
      this.playerControls.getPlayButton().updateButtonIcon(this.isPlaying);
      this.audio.addEventListener('timeupdate', () => this.updateProgress());
      this.audio.addEventListener('ended', () => this.autoNext());
    }
  }

  changePlayerPlaylist(newPlaylist: TrackInfo[]) {
    this.vanillaPlaylist = newPlaylist;
    this.playingPlaylist = this.vanillaPlaylist;
    this.currentTrackIndex = this.playingPlaylist.findIndex(track => track.id === this.currentTrack.id);
  }

  updateCurrentTrack() {
    this.playerControls.getPlayButton().updateButtonIcon(this.isPlaying);
    this.audio.currentTime = 0.0;
    this.audio = new Audio();
    this.loadTrack();
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.autoNext());
  }

  highlightCurrentTrack() {
    const currentTrackComponent = trackModel.getTracksFromTrackList()?.find(
      track => track.getTrackId() === this.currentTrack.id);
    const currentTrackElement = currentTrackComponent?.getElement()
    if (this.highlightedElement && this.highlightedElement !== currentTrackElement) {
      this.unhighlightTrack(this.highlightedElement)
    }
    if (currentTrackElement) {
      currentTrackElement.classList.add('playing')
      this.highlightedElement = currentTrackElement
    }
  }

  unhighlightTrack(trackElement: HTMLElement) {
    trackElement.classList.remove('playing')
  }

}