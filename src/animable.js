// in case of old browsers
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

/**
 * use requestAnimationFrame to fluidify javascript animations
 */
export default class Animable {
  constructor(animationConfigList = []) {
    this.ticking = [];
    this.animationCallbackList = {};
    animationConfigList.forEach(({ subject, event, callback }, i) => {
      if (!subject || !event) return;
      this.ticking[i] = false;
      this.animationCallbackList[event] = callback;
      subject.addEventListener(event, (eventObject) => {
        if (!this.ticking[i]) {
          window.requestAnimationFrame(() => {
            this.ticking[i] = false;
            this.animationCallbackList[event](eventObject);
          });
        }
        this.ticking[i] = true;
      });
    });
  }
}
