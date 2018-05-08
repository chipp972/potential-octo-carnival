import './menu.css';

export default class Menu {
  constructor() {
    this.menu = document.getElementById('menu');
    this.menuButton = document.getElementById('menu-button');
    this.menuButtonImage = document.getElementById('menu-button-image');
    this.menuList = document.getElementById('menu-list');
    this.open = false;
  }

  setButtonImage() {
    this.menuButtonImage.src = this.open ? '/close.png' : '/menu.png';
  }

  toggleMenu() {
    this.open = !this.open;
    this.menu.classList.toggle('open-menu');
    this.menuList.classList.toggle('open-menu');
    this.menuButton.classList.toggle('open-menu');
    document.body.classList.toggle('open-menu');
    this.setButtonImage();
  }

  activateMenu() {
    this.menuButton.addEventListener('click', () => this.toggleMenu());
  }

  desactivateMenu() {
    this.menuButton.removeEventListener('click', () => this.toggleMenu());
  }
}
