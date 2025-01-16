import { apiService } from '../index';
import { BasicFunctionality, Creatable } from '../core/base'

export interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
}

export class User extends BasicFunctionality implements Creatable {

  private element: HTMLElement | null = null;

  constructor() {
    super()
  }

  getCurrentUser() {
    return apiService.getUser();
  }

  getTemplate(): string {
    return `
        <img class="header__user__img" src="./public/user.jpg" alt="Изображение пользователя">
        <span class="header__user__text">${this.getUsernameToDisplay()}</span>
        <svg class="header__user__svg" width="6" height="11" viewBox="0 0 6 11" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M0.528636 1.02859C0.788986 0.768245 1.2111 0.768245 1.47145 1.02859L5.47145 5.02859C5.73179 5.28894 5.73179 5.71105 5.47145 5.9714L1.47145 9.9714C1.2111 10.2318 0.788986 10.2318 0.528636 9.9714C0.268287 9.71105 0.268287 9.28894 0.528636 9.02859L4.05723 5.5L0.528636 1.9714C0.268287 1.71105 0.268287 1.28894 0.528636 1.02859Z"
            fill="#FC6D3E" />
        </svg>
    `
  }

  getUsernameToDisplay() {
    let firstname: string = 'User';
    let lastname: string = 'User'
    const currentUser = this.getCurrentUser()
    if (currentUser && currentUser.firstName && currentUser.lastName) {
      firstname = currentUser.firstName.charAt(0).toUpperCase() + currentUser.firstName.slice(1);
      lastname = currentUser.lastName?.substring(0, 1).charAt(0).toUpperCase();
    }
    return `${firstname} ${lastname}.`
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const element = document.createElement('button');
    element.className = 'header__user';
    element.innerHTML = template.trim();
    return element;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

}
