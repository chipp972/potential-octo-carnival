import './parts/index.css';
import './parts/article.css';
import './parts/header.css'
import './parts/footer.css'
import './parts/transition-image.css'
import Parrallax from './parrallax/parrallax';
import Menu from './menu/menu';
import Ad from './ad/ad';

// menu
const menu = new Menu();
menu.activateMenu();

// parrallax on header logo
const logo = document.querySelector('.header-logo');
const parrallax = new Parrallax(logo, { speed: 0.8 });

// parrallax on kiloren image to test parrallax class
/*
const kiloren = document.querySelector('.transition-kiloren');
const parrallax2 = new Parrallax(kiloren, { speed: 0.5 });
*/

// ad scroll tracking
const adElement = document.getElementById('ps4-game');
const ad = new Ad(adElement, { isLimitedToContainer: true });
