import { mixin, Press, Render, State } from "./mixins/mixin.mjs";

const DOWN = "DOWN";
const UP = "UP";
const PRESSED = "PRESSED";

export class QRSButton extends HTMLElement {
  static get STATES() {
    return { DOWN, UP, PRESSED, default: UP };
  }

  constructor() {
    super(...arguments);

    this.setAttribute("touch-action", "auto");
    this.registerPressEvents();
    this.update(true);
  }

  onChangeState(event) {
    if (this.state !== PRESSED) {
      event.preventDefault();
    }
  }

  onPressStart(event) {
    this.state = DOWN;
  }

  onPressUp(event) {
    this.state = UP;
  }

  onPress() {
    this.state = PRESSED;
  }

  render(html) {
    return html`<a href="#" touch-action="none">${this.textContent}</a>`;
  }
}

mixin(QRSButton, Render, State, Press);
