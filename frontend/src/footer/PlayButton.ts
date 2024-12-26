export class PlayButton {

  private element: HTMLElement | null = null;

  constructor() {
    this.element = this.getElement();
  }

  getTemplate(): string {
    return `
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                  fill="#AAAAAA" />
                <path
                  d="M27.0385 21.4138C26.9679 21.4862 26.7012 21.7962 26.4528 22.0512C24.9963 23.655 21.197 26.28 19.2085 27.0813C18.9065 27.21 18.143 27.4825 17.735 27.5C17.3441 27.5 16.9715 27.41 16.6159 27.2275C16.1727 26.9725 15.8171 26.5713 15.6223 26.0975C15.4968 25.7688 15.302 24.785 15.302 24.7675C15.1072 23.6913 15 21.9425 15 20.01C15 18.1688 15.1072 16.4913 15.2667 15.3988C15.2849 15.3812 15.4798 14.1588 15.6929 13.74C16.0838 12.975 16.8473 12.5 17.6644 12.5H17.735C18.2672 12.5187 19.3863 12.9938 19.3863 13.0113C21.2677 13.8138 24.9793 16.31 26.471 17.9688C26.471 17.9688 26.8911 18.395 27.0738 18.6613C27.3587 19.0437 27.5 19.5175 27.5 19.9913C27.5 20.52 27.3405 21.0125 27.0385 21.4138Z"
                  fill="white" />
              </svg>
    `
  }

  getElement(): HTMLElement {
    this.element ??= this.createElement(this.getTemplate());
    return this.element;
  }

  createElement(template: string): HTMLElement {
    const item = document.createElement('button');
    item.className = 'player__play-btn';
    item.innerHTML = template.trim();
    return item;
  }

  removeElement(): null {
    this.element = null;
    return this.element;
  }

  updateButtonIcon(isPlaying: boolean): void {
    if (this.element) {
      if (isPlaying) {
        this.element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                    <rect width="100%" height="100%" fill="white"/>
                    <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABFdJREFUWEfNWdlOI0cUvYVpsyOzL+IhwwcgS6wSguAPiDQ80Ii3mS9I5geGyRck0XzAzBty88B8QQJEiF0QiSdAmmHfkREghE3T4dxxW92m265ywOFKLaT2vXVPnbpbF4JykLGxsR8CgcAAEf1IROHk47XSKhHhmTJNc3JkZOSbqjuhYhCNRiNCiHdE9JOKnUP3ixDij6GhoUlZeymA4+PjA5ZlfUgyJrt2Jr2/H378oOv6n9kWywhwYmIiFI/HR4UQv2RbKJffLcv6GAwG3w8ODsb87H0BAlwikfgrQ3zlgsnL5h9N0wb8QHoCNAwDgQ9woadCkWUdMBjRdR0J5ZJHAJPMfc0jOBtQTNO0V+lMugDm8Vj9CF3VNC3iBOkCGI1Gf8sxISwiypRw2X5PAbYs6/fh4WGUMpbUoslSgrjLKkIIwgN5KD/8eAl0CgsLWTeRSPjqPYo7ISJ2rUwBNAwD4NAdMgoc1tbWUl1dHTvd39+ny8vLR84LCgqopqaG6uvr6f7+ng4ODuji4kIW5KSu65EUgyrsVVRUUDgcZoCmadLGxgZtbm5SPB53bQx67e3tvBkwvL29TWtra3Rzc5ONg+9Hm2SRGTQMY+KhZ76WsYTDrq4uKisrY8eHh4e0srJC19fXLvPGxkbq7u6mYDDI72OxGC0uLvJfSfmi6/qgSDZ+lBUpcQKEAY5teXmZzs7OXPbNzc28EU3TUgAXFhZYX1ZM03wlDMN4Q0SfZI2qq6uZmfLycjZBHM7NzTGTTkEI9PT0UHFxMb8+Pz8nAES8KshbAAQ4gJQSAAQziDHI3d0dO97b23PZezE9Pz+vxCARfQbAFZV+m84gEgWO0wFCr7e3N8Xg1dUVbyQ9FLKwsgqA3kXMx9ILIBzv7u66LKDX19eXShIkETaiCJCUAVZVVXEM2kcMBpGdOzs7LoDQA8CioiJ+f3t7SzMzM88PMD0GZQGiWE9NTdHp6alUrNtKygx6AVxaWuJC7JR0BvHb9PQ0HR8fy3YTXi6vAMHgycnJywHY39+fShJ0HQBEPURYyMqTlBmvLH6iJOEyo1SoMaEgi9GLMxVq6KEO2lmcY5nhQq3U6jA+AaDdwvxaHRgEwJKSEt4IAIJpxSx+qzwsNDQ0cKtzApydnaWjoyNXWIVCIero6CAAtQGqFmoeFmCsOm6BwdLSUs5GzIEAiOx0SmVlJXV2dhLKEgStDgCRJJLyfdyCssrAitjDwIqjxqCAHry+vs4AnIINtLW1UUtLC7/G0WIsk51mXANrkkWpkT8QCPCUjAfs4Wi9Rn7oNTU1UWtrK2H839ra4naITUmIe+RXZRHO8W2C9gWHfh9N0EEW46MJvRgJJSM2e9xJnAb/4bNTxq+Uju9nJ6xf/Ie7A+TLvPqwz+BFXx7ZIPN43I/uY5zB+n9fYLruYbyySOUKeFTmakQqVYkmhRC/ytxVSwG0nSY7zs+ytxAeYJ/nEj3dUT7/DfEvWO6n78wEGTUAAAAASUVORK5CYII=" x="0" y="0" width="40" height="40"/>
                  </svg>`;
      } else {
        this.element.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                  fill="#AAAAAA" />
                <path
                  d="M27.0385 21.4138C26.9679 21.4862 26.7012 21.7962 26.4528 22.0512C24.9963 23.655 21.197 26.28 19.2085 27.0813C18.9065 27.21 18.143 27.4825 17.735 27.5C17.3441 27.5 16.9715 27.41 16.6159 27.2275C16.1727 26.9725 15.8171 26.5713 15.6223 26.0975C15.4968 25.7688 15.302 24.785 15.302 24.7675C15.1072 23.6913 15 21.9425 15 20.01C15 18.1688 15.1072 16.4913 15.2667 15.3988C15.2849 15.3812 15.4798 14.1588 15.6929 13.74C16.0838 12.975 16.8473 12.5 17.6644 12.5H17.735C18.2672 12.5187 19.3863 12.9938 19.3863 13.0113C21.2677 13.8138 24.9793 16.31 26.471 17.9688C26.471 17.9688 26.8911 18.395 27.0738 18.6613C27.3587 19.0437 27.5 19.5175 27.5 19.9913C27.5 20.52 27.3405 21.0125 27.0385 21.4138Z"
                  fill="white" />
              </svg>`;
      }
    }
  }

}