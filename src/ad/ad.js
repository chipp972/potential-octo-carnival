import './ad.css';
import Animable from '../animable';

export default class Ad extends Animable {
  constructor(element, options = {}) {
    super([{ subject: window, event: 'scroll' }]);
    this.element = element;
    this.initialTopPosition = this.element.offsetTop;
    this.currentPaddingTop = 0;
    this.limitY =
      options.limitY ||
      Math.max(
        document.querySelector('body').scrollHeight,
        document.querySelector('html').scrollHeight
      );
    this.animationCallbackList.scroll = () => this.scrollTracking();
  }

  scrollTracking() {
    if (this.shouldAnimate()) {
      this.currentPaddingTop += this.trackDownward();
      this.currentPaddingTop -= this.trackUpward();
      this.element.style.paddingTop = this.currentPaddingTop + 'px';
    }
  }

  /**
   * Check if the ad is in the screen and should be animated
   * @return {boolean} if the ad should be animated
   */
  shouldAnimate() {
    const windowBottom = window.scrollY + window.innerHeight;
    const elementTop = this.element.offsetTop + this.currentPaddingTop;
    const elementBottom = elementTop + this.element.height;
    return (
      (window.scrollY + this.element.height > this.initialTopPosition &&
        elementBottom < this.limitY) ||
      (windowBottom < elementBottom && elementTop > this.initialTopPosition)
    );
  }

  /**
   * Calculate the padding top to add to make the ad stay on screen
   */
  trackDownward() {
    const elementBottom =
      this.element.offsetTop + this.element.height + this.currentPaddingTop;
    const elementTop = this.element.offsetTop + this.currentPaddingTop;
    if (elementTop < window.scrollY && elementBottom > window.scrollY) {
      return window.scrollY - elementTop;
    }
    return 0;
  }

  /**
   * Calculate the padding top to substract to make the ad stay on screen
   */
  trackUpward() {
    const windowBottom = window.scrollY + window.innerHeight;
    const elementTop = this.element.offsetTop + this.currentPaddingTop;
    const elementBottom =
      this.element.offsetTop + this.element.height + this.currentPaddingTop;
    if (elementTop < windowBottom && elementBottom > windowBottom) {
      return elementBottom - windowBottom;
    }
    return 0;
  }
}
