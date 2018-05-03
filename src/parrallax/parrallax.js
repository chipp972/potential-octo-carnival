import Animable from '../animable';
export default class Parrallax extends Animable {
  constructor(element, options) {
    super([{ subject: window, event: 'scroll' }]);
    this.element = element;
    this.speed = options.speed || 0.8;
    this.lastPosition = window.scrollY;
    this.currentPosition = window.scrollY;
    this.animationCallbackList.scroll = () => this.executeParrallax();
  }

  executeParrallax() {
    this.lastPosition = this.currentPosition;
    this.currentPosition = window.scrollY;
    this.element.style['background-position-y'] = this.currentPosition * this.speed + 'px';
  }
}
