import Animable from '../animable';
export default class Parrallax extends Animable {
  constructor(element, { speed }) {
    super([{ subject: window, event: 'scroll' }]);
    this.element = element;
    this.speed = speed || 0.8;
    this.elementTop = this.element.offsetTop;
    this.elementBottom = this.elementTop + this.element.clientHeight;
    this.animationCallbackList.scroll = () => this.executeParrallax();

    this.currentBackgroundPositionY = 0;
    this.currentPosition = window.scrollY;
    this.lastPosition = window.scrollY;
  }

  isElementInViewport() {
    const windowBottom = window.scrollY + window.innerHeight;
    return (
      (window.scrollY < this.elementTop && windowBottom > this.elementTop) ||
      (windowBottom > this.elementBottom &&
        window.scrollY < this.elementBottom) ||
      (this.elementTop < window.scrollY && this.elementBottom > windowBottom) ||
      (this.elementTop > window.scrollY && this.elementTop < windowBottom)
    );
  }

  setBackgroundPositionY() {
    this.element.style['background-position-y'] = `${this.currentBackgroundPositionY}px`;
  }

  executeParrallax() {
    this.lastPosition = this.currentPosition;
    this.currentPosition = window.scrollY;
    if (this.isElementInViewport()) {
      // window.scrollY == this.elementTop => this.currentBackgroundPositionY = 0
      const delta = window.scrollY - this.elementTop;
      this.currentBackgroundPositionY = delta * this.speed;
      this.setBackgroundPositionY();
    }
  }
}
