/* globals HTMLElement */
export class QRSMain extends HTMLElement {
  constructor () {
    super(...arguments)
    this.onWheel = this.onWheel.bind(this)
  }

  connectedCallback () {
    this.addEventListener('wheel', this.onWheel)
    this._active = this.querySelector('qrs-active')
    this._rooms = this.querySelector('qrs-rooms')
  }

  disconnectedCallback () {
    this.removeEventListener('wheel', this.onWheel)
  }

  onWheel (e) {
    const rooms = this._rooms
    const paths = e.path || e.composedPath()

    if (paths.some(({ tagName = '' }) => tagName.toLowerCase() === 'qrs-active')) {
      if (rooms.style.getPropertyValue('--xOffset') === '0px') {
        e.preventDefault()
      }
    }

    if (paths.some(({ tagName = '' }) => tagName.toLowerCase() === 'qrs-rooms')) {
      const scroll = rooms.scrollTop + rooms.getBoundingClientRect().height
      if (scroll + 1 > rooms.scrollHeight) {
        if (e.wheelDelta < 0) {
          e.preventDefault()
        }
      }
    }
  }
}
