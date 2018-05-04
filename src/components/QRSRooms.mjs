import { mixin, Render, State } from "./mixins/mixin.mjs";
import { STATE_EVENTS } from "./mixins/State.mjs";
import { QRSCode } from "./QRSCode.mjs";
import { getState, getStreamingState } from "../state.mjs";

const EXPLODED = "EXPLODED";
const NORMAL = "NORMAL";

const _selectedPosition = Symbol("Selected QR Code Position");
const _topOffset = Symbol("Selected QR Code Top Offset");

export class QRSRooms extends HTMLElement {
  static get STATES() {
    return { EXPLODED, NORMAL, default: NORMAL };
  }

  constructor() {
    super(...arguments);

    this.renderRoomItem = this.renderRoomItem.bind(this);
    this.onSetState = this.onSetState.bind(this);

    this.addEventListener(STATE_EVENTS.SET, this.onSetState);
    this.update(true);
  }

  onSetState(event) {
    const { target } = event;

    switch (target && target.tagName.toLowerCase()) {
      case "qrs-code":
        return this.onSetQRSCodeState(event);
    }
  }

  onSetQRSCodeState({ target, detail: { position, state } }) {
    const { STATES } = QRSCode;

    this[_selectedPosition] = +position;

    switch (state) {
      case STATES.ACTIVE: {
        document.body.style.setProperty("overflow", "hidden");
        this[_topOffset] = target.getBoundingClientRect().top;
        this.state = EXPLODED;
        break;
      }
      default: {
        document.body.style.removeProperty("overflow");
        this[_topOffset] = 0;
        this.state = NORMAL;
      }
    }
  }

  render(html) {
    return html`
      ${getState("rooms").length ? null : this.renderNoRooms(html)}

      <ul>
        ${getStreamingState("rooms", this.renderRoomItem)}
      </ul>

      <div class="button-box">
        <qrs-button>Join</qrs-button>
        <qrs-button action="add">Add</qrs-button>
      </div>
    `;
  }

  renderRoomItem(html, { name, participants, qrcode }, position) {
    const selectedPosition = +this[_selectedPosition];
    const relativePosition = QRSRooms.getRelativePosition(
      position,
      selectedPosition
    );

    let codeStyle = "";
    if (this.state === EXPLODED) {
      codeStyle = relativePosition
        ? `--translateY: ${relativePosition === "before" ? -100 : 100}vh`
        : `
            --translateY: ${-this[_topOffset] + 16}px;
            --translateX: 10vw;
        `;
    }
    const headerStyle =
      this.state === EXPLODED ? `--translateX: 100vw` : `--translateX: 0vh`;

    return html`
      <li class="item">
        <qrs-code
          style="${codeStyle}"
          code="${qrcode}"
          data-position="${position}">
        </qrs-code>

        <header style="${headerStyle}">
          <h1>${name}</h1>
          <h2>participants: ${participants.length}</h2>
        </header>
      </li>
    `;
  }

  renderNoRooms(html) {
    return html`
      <div class="intro">
        <h1>
          Welcome to QR Share!
        </h1>

        <p>
          QR Share lets you share files directly with other people. To get
          started just create a room and then have someone else join by scanning
          the generated QR code, you can then swap files directly!
        </p>
      </div>
    `;
  }

  static getRelativePosition(position, selectedPosition) {
    if (isNaN(selectedPosition)) {
      return "";
    }
    if (position < selectedPosition) {
      return "before";
    } else if (position > selectedPosition) {
      return "after";
    } else {
      return "";
    }
  }
}

mixin(QRSRooms, Render, State);
