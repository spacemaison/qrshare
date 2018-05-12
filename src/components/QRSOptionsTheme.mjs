/* globals HTMLElement */
import { mixin, Press, State } from './mixins/mixin.mjs'

const SELECTED = 'SELECTED'
const UNSELECTED = 'UNSELECTED'

export class QRSOptionsTheme extends HTMLElement {
  static get STATES () {
    return { SELECTED, UNSELECTED, default: UNSELECTED }
  }

  constructor () {
    super(...arguments)
    this.registerPressEvents()
  }

  onPress () {
    this.state = SELECTED
  }

  onChangeState (event) {
    if (this.state !== SELECTED) {
      event.preventDefault()
    }
  }
}

mixin(QRSOptionsTheme, Press, State)