/* globals HTMLElement */
import { mixin, Render } from './mixins/mixin.mjs'
import { getStreamingState } from '../state.mjs'
import { MEDIA_TYPES } from '../models/index.mjs'

export class QRSActive extends HTMLElement {
  constructor () {
    super(...arguments)
    this.renderActiveItem = this.renderActiveItem.bind(this)
    this.setAttribute('touch-action', 'pan-y')
    this.update(true)
  }

  render (html, item) {
    return html`
      <ul>
        ${getStreamingState('active', this.renderActiveItem)}
      </ul>
    `
  }

  renderActiveItem (html, item) {
    return html`
      <qrs-media-item type="${item.type}" title="${item.title}">
        ${this.renderMediaItem(html, item)}
      </qrs-media-item>
    `
  }

  renderMediaItem (html, item) {
    switch (item.type) {
      case MEDIA_TYPES.TEXT: return this.renderMediaText(html, item)
    }
  }

  renderMediaText (html, text) {
    return html`
      <p>${text.content}</p>
    `
  }
}

mixin(QRSActive, Render)
