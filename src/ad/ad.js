import './ad.css';
import Animable from '../animable';

export default class Ad extends Animable {
  constructor(element, { isLimitedToContainer }) {
    super([
      { subject: window, event: 'scroll' },
      { subject: window, event: 'resize' }
    ]);
    this.element = element;
    this.lastScrollY = window.scrollY;
    this.isLimitedToContainer = isLimitedToContainer || false;
    this.initTracking();
    this.animationCallbackList.scroll = () => this.scrollTracking();
    this.animationCallbackList.resize = () => this.initTracking();
  }

  /**
   * initialize the position of the element and padding top property
   */
  initTracking() {
    this.currentPaddingTop = 0;
    this.setPaddingTop();
    this.setMaxPadding();
    this.scrollTracking();
  }

  /**
   * set the element's padding top
   */
  setPaddingTop() {
    this.element.style.paddingTop = `${this.currentPaddingTop}px`;
  }

  /**
   * Calculate the padding limit to eventually keep the element in its container
   */
  setMaxPadding() {
    const container = this.element.parentElement;
    this.maxPadding =
      this.isLimitedToContainer && container
        ? container.clientHeight - this.element.clientHeight
        : Math.max(
            document.querySelector('body').scrollHeight,
            document.querySelector('html').scrollHeight
          );
  }

  /**
   * Call the right method to calculate the new padding top of the element
   */
  scrollTracking() {
    if (window.scrollY > this.lastScrollY) {
      const trackDownDelta = this.trackDownward();
      this.currentPaddingTop += trackDownDelta;
    } else {
      const trackUpDelta = this.trackUpward();
      this.currentPaddingTop += trackUpDelta;
    }
    this.setPaddingTop();
    this.lastScrollY = window.scrollY;
  }

  /**
   * Calculate the padding top to **add** to make the ad stay on screen
   * when scrolling down
   */
  trackDownward() {
    const elementTop = this.element.offsetTop + this.currentPaddingTop;
    const delta = Math.round(window.scrollY - elementTop);
    if (
      !(
        window.scrollY > elementTop && this.currentPaddingTop < this.maxPadding
      ) ||
      delta < 0
    ) {
      return 0;
    } else if (
      this.maxPadding &&
      this.maxPadding < delta + this.currentPaddingTop
    ) {
      return this.maxPadding - this.currentPaddingTop;
    } else {
      return delta;
    }
  }

  /**
   * Calculate the padding top to **substract** to make the ad stay on screen
   * when scroll up
   */
  trackUpward() {
    const windowBottom = window.scrollY + window.innerHeight;
    const elementBottom = this.element.offsetTop + this.element.clientHeight;
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
