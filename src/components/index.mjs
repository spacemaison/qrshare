import { QRSActive } from './QRSActive.mjs'
import { QRSButton } from './QRSButton.mjs'
import { QRSCode } from './QRSCode.mjs'
import { QRSRooms } from './QRSRooms.mjs'
import { QRSExtreneous } from './QRSExtreneous.mjs'
import { QRSOptions } from './QRSOptions.mjs'

export { QRSActive, QRSButton, QRSCode, QRSExtreneous, QRSOptions, QRSRooms }

export default function registerComponents (
  customElements = window.customElements
) {
  customElements.define('qrs-active', QRSActive)
  customElements.define('qrs-button', QRSButton)
  customElements.define('qrs-code', QRSCode)
  customElements.define('qrs-extreneous', QRSExtreneous)
  customElements.define('qrs-options', QRSOptions)
  customElements.define('qrs-rooms', QRSRooms)
}
