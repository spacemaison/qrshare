/* globals HTMLElement */
const _onPointerDown = Symbol('Pan "pointerdown" event listener')
const _onPointerUp = Symbol('Pan "pointerup" event listener')
const _onPointerMove = Symbol('Pan "pointermove" event listener')

const _pointerID = Symbol('Pan pointerID')
const _direction = Symbol('Pan direction')
const _start = Symbol('Pan starting position')
const _last = Symbol('Pan last position')
const _isPanning = Symbol('Pan panning flag')

export class Pan extends HTMLElement {
  registerPanEvents ({ direction = 'x' } = {}) {
    this[_direction] = direction
    this[_onPointerDown] = Pan.prototype[_onPointerDown].bind(this)
    this[_onPointerUp] = Pan.prototype[_onPointerUp].bind(this)
    this[_onPointerMove] = Pan.prototype[_onPointerMove].bind(this)

    this.addEventListener('pointerdown', this[_onPointerDown])
    this.addEventListener('pointerup', this[_onPointerUp])
    this.addEventListener('pointermove', this[_onPointerMove])
  }

  unregisterPanEvents () {
    this.removeEventListener('pointerdown', this[_onPointerDown])
    this.removeEventListener('pointerup', this[_onPointerUp])
    this.removeEventListener('pointermove', this[_onPointerMove])
  }

  [_onPointerDown] (event) {
    if (!event.isPrimary) {
      return
    }
    event.target.setPointerCapture(event.pointerId)
    this[_start] = event[this[_direction]]
    this[_pointerID] = event.pointerId
    this[_isPanning] = true
    this[_last] = 0

    this.onPanStart && this.onPanStart(event)
  }

  [_onPointerMove] (event) {
    event.__distance = event[this[_direction]] - this[_start]
    event.__delta = event[this[_direction]] - this[_last]

    if (this[_isPanning]) {
      this.onPan && this.onPan(event)
    }

    this[_last] = event[this[_direction]]
  }

  [_onPointerUp] (event) {
    event.__distance = event[this[_direction]] - this[_start]
    event.target.releasePointerCapture(this[_pointerID])
    this[_isPanning] = false
    this[_last] = 0

    this.onPanStop && this.onPanStop(event)
  }
}
