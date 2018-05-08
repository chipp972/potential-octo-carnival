import './parts/index.css';
import './parts/article.css';
import './parts/header.css'
import './parts/footer.css'
import './parts/transition-image.css'
import Parrallax from './parrallax/parrallax';
import initMenu from './menu/menu';
import Ad from './ad/ad';

initMenu();

const logo = document.querySelector('.header-logo');
const p = new Parrallax(logo, { speed: 0.8 });

// + parrallax on kiloren image
const kiloren = document.querySelector('.transition-kiloren');
const parrallax2 = new Parrallax(kiloren, { speed: 0.6 });

const adElement = document.getElementById('ps4-game');
const adContainer = adElement.parentElement;
const ad = new Ad(adElement, { limitPadding: adContainer.clientHeight - adElement.clientHeight });
ad.scrollTracking();
