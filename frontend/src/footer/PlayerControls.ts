import { PlayButton } from "./PlayButton";
import { RepeatButton } from "./RepeatButton";
import { ShuffleButton } from "./ShuffleButton";
import { SkipbackButton } from "./SkipbackButton";
import { SkipnextButton } from "./SkipnextButton";
import { TrackInfo } from '../main/Track/Track';
import { ProgressBar } from './ProgressBar'

export class PlayerControls {

  private element: HTMLElement | null = null;
  private shuffleButton: ShuffleButton;
  private skipbackButton: SkipbackButton;
  private playButton: PlayButton;
  private skipnextButton: SkipnextButton;
  private repeatButton: RepeatButton;
  private rangePlay: ProgressBar;

  constructor(private fields: TrackInfo) {
    this.element = this.getElement();
    this.shuffleButton = new ShuffleButton();
    this.skipbackButton = new SkipbackButton();
    this.playButton = new PlayButton();
    this.skipnextButton = new SkipnextButton();
    this.repeatButton = new RepeatButton();
    this.rangePlay = new ProgressBar(fields);
  }

  getShuffleButton(): ShuffleButton {
    return this.shuffleButton;
  }

  getSkipbackButton(): SkipbackButton {
    return this.skipbackButton;
  }

  getPlayButton(): PlayButton {
    return this.playButton;
  }

  getSkipnextButton(): SkipnextButton {
    return this.skipnextButton;
  }

  getRepeatButton(): RepeatButton {
    return this.repeatButton;
  }

  getRangePlay(): ProgressBar {
    return this.rangePlay;
  }

  getProgressInput(): HTMLInputElement {
    return this.rangePlay.getProgressInput();
  }

  getTemplate(): string {
    return `
      <div class="player__controls__header">
        </div>
        <div class="player__controls__footer">
        </div>
      </div>
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('div');
    element.className = 'player__controls';
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const controls = this.getElement()
    controls.firstElementChild?.prepend(this.shuffleButton.getElement(), this.skipbackButton.getElement(), this.playButton.getElement(), this.skipnextButton.getElement(), this.repeatButton.getElement());
    controls.lastElementChild?.append(this.rangePlay.getElement());
  }

}