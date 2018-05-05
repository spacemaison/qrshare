import { mixin, Render, State } from "./mixins/mixin.mjs";
import { STATE_EVENTS } from "./mixins/State.mjs";

const SHOWING = "SHOWING";
const HIDDEN = "HIDDEN";
const EXPANDED = "EXPANDED";

export class QRSCrudOverlay extends HTMLElement {
  static get STATES() {
    return { SHOWING, HIDDEN, EXPANDED, default: SHOWING };
  }

  constructor() {
    super(...arguments);
    this.onSetState = this.onSetState.bind(this);

    this.update(true);
    this.addEventListener(STATE_EVENTS.SET, this.onSetState);
  }

  onSetState(event) {
    const { target } = event;

    switch (target && target.tagName.toLowerCase()) {
      case "qrs-button":
        return this.onSetQRSButtonState(event);
    }
  }

  onSetQRSButtonState({ detail } = {}) {
    if (detail.action === "join_room" && detail.state === "PRESSED") {
      this.state = this.state === EXPANDED ? SHOWING : EXPANDED;
    }
  }

  render(html) {
    const { state } = this;
    const offset = state === HIDDEN ? 0 : state === EXPANDED ? 300 : 50;

    this.style.setProperty("height", offset);

    return html`
      <div class="wrapper">
        <div class="button-box">
          <qrs-button action="join_room">Join</qrs-button>
          <qrs-button action="add_room">Add</qrs-button>
        </div>

        <div class="camera-preview">

        </div>
      </div>
    `;
  }
}

mixin(QRSCrudOverlay, Render, State);
