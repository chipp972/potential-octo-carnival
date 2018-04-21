export default class Parrallax {
  constructor(element, options) {
    this.element = element;
    this.speed = options.speed || 0.8;
    this.lastPosition = window.scrollY;
    this.currentPosition = window.scrollY;
    this.ticking = false;
    window.addEventListener('scroll', (e) => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.lastPosition = this.currentPosition;
          this.currentPosition = window.scrollY;
          this.ticking = false;
          this.executeParrallax();
        });
      }
      this.ticking = true;
    });
  }

  executeParrallax() {
    this.element.style['background-position-y'] = this.currentPosition * this.speed + 'px';
  }
}
