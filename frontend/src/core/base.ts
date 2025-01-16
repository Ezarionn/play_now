export abstract class BasicFunctionality {
  abstract getTemplate(): string;
}

export interface Creatable {
  getElement(): HTMLElement;
  createElement(template: string): HTMLElement;
  removeElement(): null;
}

export interface Renderable {
  render(number?: number): void;
}

export interface Interactive {
  addEventListeners(): void;
  handleClick(event: Event): void;
}

export enum UserAction {
  DELETE = 'DELETE',
  ADD = 'ADD',
  UPDATE = 'UPDATE'
}