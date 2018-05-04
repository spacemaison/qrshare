import { mixin, Render } from "./mixins/mixin.mjs";
import { getStreamingState } from "../state.mjs";

export class QRSActive extends HTMLElement {
  constructor() {
    super(...arguments);
    this.renderActiveItem = this.renderActiveItem.bind(this);
  }

  render(html) {
    return html`
      <ul>
        ${getStreamingState("active", this.renderActiveItem)}
      </ul>
    `;
  }

  renderActiveItem(html) {
    return html`
      <li>
      </li>
    `;
  }
}

mixin(QRSActive, Render);
