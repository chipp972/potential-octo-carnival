import './index.css';
import './article.css';
import './header.css'
import './footer.css'
import './transition-image.css'
import Parrallax from './parrallax/parrallax';
import initMenu from './menu/menu';
import Ad from './ad/ad';

initMenu();

const logo = document.querySelector('.header-logo');
const adList = document.querySelectorAll('.ad-image');
const kilorenImage = document.getElementById('kiloren-desktop');
const p = new Parrallax(logo, { speed: 0.8 });

adList.forEach((adElement) => {
  const ad = new Ad(adElement, { limitY: kilorenImage.offsetTop });
  ad.scrollTracking();
})
