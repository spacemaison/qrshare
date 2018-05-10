/* globals HTMLElement */
import { mixin, Render } from './mixins/mixin.mjs'
import { getStreamingState } from '../state.mjs'

export class QRSActive extends HTMLElement {
  constructor () {
    super(...arguments)
    this.renderActiveItem = this.renderActiveItem.bind(this)
    this.setAttribute('touch-action', 'pan-y')
    this.update(true)
  }

  render (html) {
    return html`
      <ul>
        ${getStreamingState('active', this.renderActiveItem)}
      </ul>
    `
  }

  renderActiveItem (html) {
    return html`
      <qrs-media-item></qrs-media-item>
    `
  }
}

mixin(QRSActive, Render)
