import './ad.css';
import Animable from '../animable';

export default class Ad extends Animable {
  constructor(element, options = {}) {
    super([{ subject: window, event: 'scroll' }]);
    this.element = element;
    this.lastScrollY = window.scrollY;
    this.currentPaddingTop = 0;
    this.limitPadding =
      options.limitPadding ||
      Math.max(
        document.querySelector('body').scrollHeight,
        document.querySelector('html').scrollHeight
      );
    this.animationCallbackList.scroll = () => this.scrollTracking();
  }

  scrollTracking() {
    if (window.scrollY > this.lastScrollY) {
      const trackDownDelta = this.trackDownward();
      this.currentPaddingTop += trackDownDelta;

    } else {
      const trackUpDelta = this.trackUpward();
      this.currentPaddingTop += trackUpDelta;
    }
    this.element.style.paddingTop = this.currentPaddingTop + 'px';
    this.lastScrollY = window.scrollY;
  }

  /**
   * Calculate the padding top to add to make the ad stay on screen
   */
  trackDownward() {
    const elementTop = this.element.offsetTop + this.currentPaddingTop;
    const delta = Math.round(window.scrollY - elementTop);
    if (
      !(window.scrollY > elementTop &&
        this.currentPaddingTop < this.limitPadding) ||
      delta < 0
    ) {
      return 0;
    } else if (
      this.limitPadding &&
      this.limitPadding < delta + this.currentPaddingTop
    ) {
      return this.limitPadding - this.currentPaddingTop;
    } else {
      return delta;
    }
  }

  /**
   * Calculate the padding top to substract to make the ad stay on screen
   */
  trackUpward() {
    const windowBottom = window.scrollY + window.innerHeight;
    const elementBottom =
      this.element.offsetTop +
      this.element.clientHeight;
    const delta = -Math.round(elementBottom - windowBottom);
    if (
      !(windowBottom < elementBottom && this.currentPaddingTop > 0) ||
      delta > 0
    ) {
      return 0;
    } else if (delta + this.currentPaddingTop < 0) {
      return -this.currentPaddingTop;
    } else {
      return delta;
    }
  }
}
