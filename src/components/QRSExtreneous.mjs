/* globals HTMLElement */
import { mixin, Render } from './mixins/mixin.mjs'

export class QRSExtreneous extends HTMLElement {
  constructor () {
    super(...arguments)
    this.update(true)
  }

  render (html) {
    return html`
      <qrs-options></qrs-options>
      <div class="code-reader"></div>
    `
  }
}

mixin(QRSExtreneous, Render)
