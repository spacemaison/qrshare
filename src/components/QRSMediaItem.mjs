/* globals HTMLElement */
import { mixin, Render } from './mixins/'
export class QRSMediaItem extends HTMLElement {
  constructor () {
    super(...arguments)
    this.update(true)
  }

  render (html) {
    return html`

    `
  }
}

mixin(QRSMediaItem, Render)
