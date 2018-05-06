import { QRSActive } from "./QRSActive.mjs";
import { QRSButton } from "./QRSButton.mjs";
import { QRSCode } from "./QRSCode.mjs";
import { QRSRooms } from "./QRSRooms.mjs";

export { QRSButton, QRSCode, QRSRooms };

export default function registerComponents() {
  // customElements.define("qrs-active", QRSActive);
  customElements.define("qrs-button", QRSButton);
  customElements.define("qrs-code", QRSCode);
  customElements.define("qrs-rooms", QRSRooms);
}
