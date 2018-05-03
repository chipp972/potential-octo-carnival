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
const adList = document.querySelectorAll('.ad-image');
const kilorenImage = document.getElementById('kiloren-desktop');
const p = new Parrallax(logo, { speed: 0.8 });

adList.forEach((adElement) => {
  const ad = new Ad(adElement, { limitY: kilorenImage.offsetTop });
  ad.scrollTracking();
})
