/* globals CustomEvent */
const CHANGE = 'state-change'
const SET = 'state-set'

export const STATE_EVENTS = Object.freeze({
  CHANGE,
  SET
})

export class StateEvent {
  constructor (type, detail) {
    return new CustomEvent(type, { cancelable: true, bubbles: true, detail })
  }
}
