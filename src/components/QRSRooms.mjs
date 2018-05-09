/* globals HTMLElement */
import { mixin, Render, State, Pan, Press } from './mixins/mixin.mjs'
import { STATE_EVENTS } from './mixins/State.mjs'
import { QRSCode } from './QRSCode.mjs'
import { getStreamingState } from '../state.mjs'

const EXPLODED = 'EXPLODED'
const NORMAL = 'NORMAL'

const _selectedPosition = Symbol('Selected QR Code Position')
const _topOffset = Symbol('Selected QR Code Top Offset')

export class QRSRooms extends HTMLElement {
  static get STATES () {
    return { EXPLODED, NORMAL, default: NORMAL }
  }

  constructor () {
    super(...arguments)

    this.renderRoomItem = this.renderRoomItem.bind(this)
    this.onSetState = this.onSetState.bind(this)
    this.setAttribute('touch-action', 'pan-y')

    this.addEventListener(STATE_EVENTS.SET, this.onSetState)
    this.update(true)
    this.registerPressEvents()
    this.registerPanEvents()
  }

  onPress (event) {
    this.style.setProperty('--xOffsetDuration', `0.3s`)
    this.style.setProperty('--xOffset', `0px`)
  }

  onPanStart (event) {
    this.style.setProperty('--xOffsetDuration', `0s`)
    this.__xOffset = parseInt(this.style.getPropertyValue('--xOffset')) || 0
  }

  onPan (event) {
    if (this.state !== NORMAL) return
    this.__xOffset = Math.min(0, this.__xOffset + event.__delta)

    this.style.setProperty('--xOffset', `${this.__xOffset}px`)
  }

  onPanStop (event) {
    const { innerWidth } = window
    const xOffset = Math.abs(parseInt(this.style.getPropertyValue('--xOffset')))
    const offset = xOffset / innerWidth > 0.3
      ? -(innerWidth - 80)
      : 0

    this.style.setProperty('--xOffsetDuration', `0.3s`)
    this.style.setProperty('--xOffset', `${offset}px`)
  }

  onSetState (event) {
    const { target } = event

    switch (target && target.tagName.toLowerCase()) {
      case 'qrs-code':
        return this.onSetQRSCodeState(event)
    }
  }

  onSetQRSCodeState (event) {
    const { target, detail } = event
    const { position, state } = detail
    const { STATES } = QRSCode

    this[_selectedPosition] = +position

    switch (state) {
      case STATES.ACTIVE: {
        this.style.setProperty('overflow', 'hidden')
        this[_topOffset] = target.getBoundingClientRect().top
        this.state = EXPLODED
        break
      }
      default: {
        this.style.removeProperty('overflow')
        this[_topOffset] = 0
        this.state = NORMAL
      }
    }
  }

  render (html) {
    return html`
      <ul>${getStreamingState('rooms', this.renderRoomItem)}</ul>

      ${this.renderCrudButtons(html)}
      ${this.renderNoRooms(html)}
    `
  }

  renderCrudButtons (html) {
    const isExploding = this.state === EXPLODED
    const style = `
      --opacity: ${isExploding ? 0 : 1};
      --opacity-transition-time: ${isExploding ? 0.2 : 1.8}s;
      --translateY: ${isExploding ? 100 : 0}vh;
    `

    return html`
      <div class="crud button-box" style="${style}">
        <qrs-button action="join_room">\<\></qrs-button>
        <qrs-button action="add_room">+</qrs-button>
      </div>
    `
  }

  renderRoomItem (html, { name, participants, id }, position) {
    const selectedPosition = +this[_selectedPosition]
    const relativePosition = QRSRooms.getRelativePosition(
      position,
      selectedPosition
    )

    let codeStyle = ''
    if (this.state === EXPLODED) {
      codeStyle = relativePosition
        ? `--translateY: ${relativePosition === 'before' ? -100 : 100}vh`
        : `
            --translateY: ${-this[_topOffset] + 16}px;
            --translateX: 10vw;
        `
    }
    const headerStyle =
      this.state === EXPLODED ? `--translateX: 100vw` : `--translateX: 0vw`

    return html`
      <li class="item">
        <qrs-code
          action="expand_qrs_code"
          style="${codeStyle}"
          data-id="${id}"
          data-position="${position}">
        </qrs-code>

        <header style="${headerStyle}">
          <h1>${name}</h1>
          <h2>participants: ${participants.length}</h2>
        </header>
      </li>
    `
  }

  renderNoRooms (html) {
    return html`
      <div class="intro">
        <h1>Welcome to QR Share</h1>
        <p>
          QR Share lets you share files directly with other people. To get
          started just create a room and then have someone else join by scanning
          the generated QR code, you can then swap files directly!
        </p>
      </div>
    `
  }

  static getRelativePosition (position, selectedPosition) {
    if (isNaN(selectedPosition)) {
      return ''
    }
    if (position < selectedPosition) {
      return 'before'
    } else if (position > selectedPosition) {
      return 'after'
    } else {
      return ''
    }
  }
}

mixin(QRSRooms, Render, Press, Pan, State)
