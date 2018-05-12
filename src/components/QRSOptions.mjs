/* globals HTMLElement */
import { mixin, Render } from './mixins/mixin.mjs'

export class QRSOptions extends HTMLElement {
  constructor () {
    super(...arguments)
    this.update(true)
  }

  render (html) {
    return html`
      <div class="button-box">
        <qrs-button action="reset_options">Reset</qrs-button>
        <qrs-button action="accept_options">Accept</qrs-button>
      </div>

      <section class="themes">
      </section>
    `
  }
}

mixin(QRSOptions, Render)
