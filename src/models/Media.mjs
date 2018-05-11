const TEXT = 'TEXT_MEDIA'
const IMAGE = 'IMAGE_MEDIA'

export const MEDIA_TYPES = Object.freeze({
  __proto__: null,

  IMAGE,
  TEXT
})

export class Text {
  get type () {
    return TEXT
  }

  constructor ({ content = '', title = '' }) {
    this.title = title
    this.content = content
  }
}

export class Image {
  get type () {
    return IMAGE
  }

  constructor ({ alt = '', data }) {
    this.alt = alt
    this.data = data
  }
}
