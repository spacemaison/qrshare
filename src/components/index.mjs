import { QRSCode } from "./QRSCode.mjs";
import { QRSRooms } from "./QRSRooms.mjs";

export { QRSCode, QRSRooms };

export default function registerComponents() {
  customElements.define("qrs-code", QRSCode);
  customElements.define("qrs-rooms", QRSRooms);
}
