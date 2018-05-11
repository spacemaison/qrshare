/* globals HTMLElement */
import { mixin, Render } from './mixins/mixin.mjs'

export class QRSMediaItem extends HTMLElement {
  constructor () {
    super(...arguments)
    this.update(true)
  }

  render (html) {
    return html`
      <section>
        <h2>${this.title}</h2>
        ${this.children}
      </section>
    `
  }

  get title () {
    return this.getAttribute('title')
  }

  set title (title) {
    this.setAttribute('title', title)
  }
}

mixin(QRSMediaItem, Render)
