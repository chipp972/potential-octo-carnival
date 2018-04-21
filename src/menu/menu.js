import './menu.css';

export default function initMenu() {
  const menuButton = document.querySelector('#menu-button');
  const menu = document.querySelector('#menu');
  const menuList = document.querySelector('#menu > ul.menu-list');

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('open');
    menuList.classList.toggle('open');
    menuButton.classList.toggle('open');
  });
}
