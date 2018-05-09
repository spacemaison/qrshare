/* globals HTMLElement */
import { mixin, Render } from './mixins/mixin.mjs'

export class QRSExtreneous extends HTMLElement {
  constructor () {
    super(...arguments)
    this.update(true)
  }

  render (html) {
    return html`
      <div class="code-reader"></div>
      <qrs-options></qrs-options>
    `
  }
}

mixin(QRSExtreneous, Render)
