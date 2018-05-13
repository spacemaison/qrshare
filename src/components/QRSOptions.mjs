/* globals HTMLElement */
import { mixin, Render } from './mixins/mixin.mjs'
import { THEMES } from '../constants.mjs'

export class QRSOptions extends HTMLElement {
  constructor () {
    super(...arguments)
    this.renderThemePreview = this.renderThemePreview.bind(this)
    this.update(true)
  }

  render (html) {
    return html`
      ${this.renderButtonBox(html)}

      <section class="themes">
        <h2>Themes</h2>
        <div>
          ${Object.entries(THEMES).map(this.renderThemePreview.bind(this, html))}
        </div>
      </section>
    `
  }

  renderButtonBox (html) {
    return html`
      <div class="button-box">
        <qrs-button action="theme_reset">Reset</qrs-button>
        <qrs-button action="accept_options">Accept</qrs-button>
      </div>
    `
  }

  renderThemePreview (html, [ id, cssVars ]) {
    const imgURL = cssVars['bg-image-url'].slice(4, -1)

    return html`
      <qrs-options-theme action="theme_try" data-id="${id}">
        <img src="${imgURL}">
      </qrs-options-theme>
    `
  }
}

mixin(QRSOptions, Render)
