import { html, render } from "../../dependencies/lit-html.mjs";
const needsRender = Symbol("Render dirty flag");

export class Render {
  update(force) {
    if (!this.render) {
      return;
    }

    if (force) {
      const rendered = this.render(html);

      if (rendered != null) {
        render(rendered, this);
      }
      return;
    }

    if (!this[needsRender]) {
      this[needsRender] = true;

      Promise.resolve().then(() => {
        this[needsRender] = false;
        const rendered = this.render(html);

        if (rendered != null) {
          render(rendered, this);
        }
      });
    }
  }
}
