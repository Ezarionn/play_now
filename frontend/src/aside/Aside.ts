import { BasicFunctionality, Creatable, Renderable } from '../core/base'
import { AsideNavigationList } from "./AsideNavigationList";
import { PlaylistInfo } from './Playlist'
import { ScreenState } from '../main/ScreenPresenter'

export class Aside extends BasicFunctionality implements Creatable, Renderable {

  private element: HTMLElement | null = null;
  private asideList: AsideNavigationList;
  private onMenuSelect: (screen: ScreenState, playlistName?: string) => void;

  constructor(playlistsData: PlaylistInfo[], onMenuSelect: (screen: ScreenState, playlistName?: string) => void) {
    super()
    this.element = this.getElement();
    this.onMenuSelect = onMenuSelect;
    this.asideList = new AsideNavigationList(playlistsData, onMenuSelect);
  }

  getTemplate(): string {

    return `
        <h2 class="aside__h2 visually-hidden">Левая панель навигации</h2>
        <nav class="aside__nav">
        </nav>
      `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const section = document.createElement('aside')
    section.className = 'aside'
    section.innerHTML = template.trim();
    return section
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  render(): void {
    const section = this.getElement()
    this.asideList.render()
    section.lastElementChild?.append(this.asideList.getElement());
  }

  getAsideList() {
    return this.asideList;
  }

}