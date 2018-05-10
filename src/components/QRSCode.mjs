/* globals HTMLElement */
import { mixin, Render, State } from './mixins/mixin.mjs'

const ACTIVE = 'ACTIVE'
const INACTIVE = 'INACTIVE'

export class QRSCode extends HTMLElement {
  static get STATES () {
    return { ACTIVE, INACTIVE, default: INACTIVE }
  }

  constructor () {
    super(...arguments)
    this.setAttribute('touch-action', 'auto')
    this.onPointerDown = this.onPointerDown.bind(this)
    this.addEventListener('pointerdown', this.onPointerDown)
    // this.update(true);
  }

  onPointerDown (event) {
    if (!event.isPrimary) return
    this.state = this.state === ACTIVE ? INACTIVE : ACTIVE
  }

  render (html) {
    const isActive = this.state === ACTIVE

    const width = isActive ? window.innerWidth - 20 : 64
    const height = isActive ? window.innerHeight / 2 : 64

    this.style.setProperty('--width', `${width}px`)
    this.style.setProperty('--height', `${height}px`)

    const shadowStyle = `
      --opacity: ${isActive ? 1 : 0};
    `

    return html`
      <div class="shadow" style="${shadowStyle}"></div>
    `
  }
}

mixin(QRSCode, Render, State)
