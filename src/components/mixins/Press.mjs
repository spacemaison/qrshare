const _onPointerDown = Symbol('Press "pointerdown" event listener');
const _onPointerUp = Symbol('Press "pointerup" event listener');
const _onPointerMove = Symbol('Press "pointermove" event listener');
const _timeoutID = Symbol("Press timeout id");
const _timeoutLength = Symbol("Press timeout length");
const _pointerID = Symbol("Press pointer id");
const _cancelled = Symbol("Press cancelled flag");
const _startX = Symbol("Press event starting x position");
const _startY = Symbol("Press event starting y position");

export class Press extends HTMLElement {
  registerPressEvents({ timeoutLength = 200 } = {}) {
    this[_onPointerDown] = Press.prototype[_onPointerDown].bind(this);
    this[_onPointerUp] = Press.prototype[_onPointerUp].bind(this);
    this[_onPointerMove] = Press.prototype[_onPointerMove].bind(this);
    this[_timeoutLength] = timeoutLength;

    this.addEventListener("pointerdown", this[_onPointerDown]);
    this.addEventListener("pointerup", this[_onPointerUp]);
    this.addEventListener("pointermove", this[_onPointerMove]);
  }

  unregisterPressEvents() {
    this.removeEventListener("pointerdown", this[_onPointerDown]);
    this.removeEventListener("pointerup", this[_onPointerUp]);
    this.removeEventListener("pointermove", this[_onPointerMove]);
  }

  [_onPointerDown](event) {
    if (!event.isPrimary) {
      return;
    }
    event.target.setPointerCapture(event.pointerId);

    clearTimeout(this[_timeoutID]);
    const cancel = () => {
      this[_cancelled] = true;
      this[_timeoutID] = -1;
    };

    this[_pointerID] = event.pointerId;
    this[_cancelled] = false;
    this[_startY] = event.y;
    this[_startX] = event.x;
    this[_timeoutID] = setTimeout(cancel, this[_timeoutLength]);

    this.onPressStart && this.onPressStart(event);
  }

  [_onPointerMove](event) {
    if (this[_timeoutID] !== -1 && this[_cancelled]) {
      return;
    }

    const xDiff = this[_startX] - event.x;
    const yDiff = this[_startY] - event.y;
    const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

    if (distance > 5) {
      this[_cancelled] = true;
      this[_timeoutID] = -1;
    }
  }

  [_onPointerUp](event) {
    event.target.releasePointerCapture(this[_pointerID]);

    this.onPressUp && this.onPressUp(event);

    if (!this[_cancelled]) {
      this.onPress && this.onPress(event);
    }
  }
}
