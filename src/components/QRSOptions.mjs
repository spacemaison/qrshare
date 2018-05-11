/* globals HTMLElement */
import { mixin, Render } from './mixins/mixin.mjs'

export class QRSOptions extends HTMLElement {
  constructor () {
    super(...arguments)
    this.update(true)
  }

  render (html) {
    return html`
      <div class="colors">
        
      </div>
    `
  }
}

mixin(QRSOptions, Render)
