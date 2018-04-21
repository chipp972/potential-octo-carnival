import './index.css';
import './article.css';
import Parrallax from './parrallax/parrallax';
import initMenu from './menu/menu';

initMenu();

const logo = document.querySelector('.header-logo');
const p = new Parrallax(logo, { speed: 0.8 });

