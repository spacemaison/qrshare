import { STATE_EVENTS } from './components/mixins/StateEvent.mjs'
import { ACTIONS } from './constants.mjs'

export function registerDOMEvents (updateState, document = window.document) {
  let lastElement = null
  let lastAction = null

  document.body.addEventListener(STATE_EVENTS.CHANGE, event => {
    const { action } = event.detail || {}

    if (!action || event.defaultPrevented) return
    if (!ACTIONS.hasOwnProperty(action.toUpperCase())) {
      console.warn(`Undeclared action "${action}" event fired`)
      return
    }

    if (!lastAction || lastAction !== action || lastElement !== event.target) {
      lastElement = event.target
      lastAction = action

      const allowRepeat = updateState(
        ACTIONS[action.toUpperCase()],
        event.detail
      )

      if (allowRepeat) {
        lastAction = null
      }
    }
  })
}
