/* globals HTMLElement */
import { STATE_EVENTS, StateEvent } from './StateEvent.mjs'

const emptyObj = Object.create(null)

export class State extends HTMLElement {
  set action (action) {
    this.setAttribute('action', action)
  }

  get action () {
    return this.getAttribute('action')
  }

  set state (state) {
    const { action, constructor } = this
    const { STATES = emptyObj } = constructor

    state =
      state && state.toUpperCase() in STATES
        ? STATES[state.toUpperCase()]
        : STATES.default
    if (!state) {
      throw new TypeError('Unexpected state: ' + state)
    }
    const detail = Object.freeze(
      Object.assign({}, this.dataset, { action, state })
    )

    // Dispatch set events
    let setEvent = new StateEvent(STATE_EVENTS.SET, detail)
    this.onSetState && this.onSetState(setEvent)
    if (setEvent.defaultPrevented) {
      return
    }

    this.dispatchEvent(setEvent)

    if (setEvent.defaultPrevented) {
      return
    }

    // Update the state
    this.setAttribute('state', state)
    this.update && this.update()

    // Dispatch change event
    let changeEvent = new StateEvent(STATE_EVENTS.CHANGE, detail)
    this.onChangeState && this.onChangeState(changeEvent)
    if (changeEvent.defaultPrevented) {
      return
    }
    this.dispatchEvent(changeEvent)
  }

  get state () {
    if (!this.hasAttribute('state')) {
      const { STATES } = this.constructor
      if (STATES && STATES.default) {
        return STATES.default
      }
    }

    return this.getAttribute('state')
  }
}
