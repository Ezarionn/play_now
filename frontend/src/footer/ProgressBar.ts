import { TrackInfo } from "../main/Track/Track";
import { TrackDuration } from "../main/Track/TrackDuration";

export class ProgressBar {
  private element: HTMLElement | null = null;
  private progressInput: HTMLInputElement;
  private currentTimeLabel: HTMLElement;
  private durationLabel: TrackDuration;

  constructor(fields: TrackInfo) {
    this.progressInput = this.createProgressInput();
    this.currentTimeLabel = this.createTimeLabel();
    this.durationLabel = new TrackDuration(fields.duration, 'player__time-end');
    this.element = this.getElement();
  }

  getProgressInput(): HTMLInputElement {
    this.progressInput ??= this.createProgressInput();
    return this.progressInput;
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement();
    return this.element;
  }

  private createElement(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'progress-bar-container player__range-play';
    container.id = 'range-play'
    container.append(this.currentTimeLabel, this.progressInput, this.durationLabel.getElement());
    return container;
  }

  private createProgressInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'progress-range';
    input.value = '0';
    input.min = '0';
    input.max = '100';
    input.step = '1';
    input.disabled = false;
    input.style.setProperty('--value', '0%');
    return input;
  }

  private createTimeLabel(): HTMLElement {
    const label = document.createElement('span');
    label.className = 'time-label';
    label.innerText = '00:00';
    return label;
  }

  updateProgress(currentTime: number, duration: number): void {
    if (duration > 0) {
      const progressPercent = (currentTime / duration) * 100;
      this.progressInput.value = progressPercent.toString();
      this.progressInput.style.setProperty('--value', `${progressPercent}%`);
      this.currentTimeLabel.innerText = this.formatTime(currentTime);
      this.durationLabel.getElement().innerText = this.formatTime(duration);
    }
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}