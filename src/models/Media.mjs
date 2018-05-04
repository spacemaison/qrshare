const TEXT = Symbol("TEXT MEDIA");
const IMAGE = Symbol("IMAGE MEDIA");
export const MEDIA_TYPES = Object.freeze({
  __proto__: null,

  IMAGE,
  TEXT
});

export class Text {
  get type() {
    return TEXT;
  }

  constructor({ content = "" }) {
    this.content = content;
  }
}

export class Image {
  get type() {
    return IMAGE;
  }

  constructor({ alt = "", data }) {
    this.alt = alt;
    this.data = data;
  }
}
