/* globals HTMLElement */
import { mixin, Render, State } from './mixins/mixin.mjs'
import { getState, getStreamingState } from '../state.mjs'
import { MEDIA_TYPES } from '../models/index.mjs'

const HIDDEN = 'HIDDEN'
const SHOWING = 'SHOWING'

export class QRSActive extends HTMLElement {
  static get STATES () {
    return { HIDDEN, SHOWING, default: SHOWING }
  }

  constructor () {
    super(...arguments)
    this.renderActiveItem = this.renderActiveItem.bind(this)
    this.setAttribute('touch-action', 'pan-y')
    this.update(true)
  }

  render (html, item) {
    const { name } = getState('active')
    this.style.setProperty('--showing', this.state === SHOWING ? 1 : 0)

    return html`
      <h1>${name}</h1>
      <ul>
        ${getStreamingState('active.media', this.renderActiveItem)}
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

mixin(QRSActive, Render, State)
