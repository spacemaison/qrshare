/* globals HTMLElement */
export class QRSMessage extends HTMLElement {
  show (message) {
    this.style.textAlign = 'end'
    this.style.height = '16px'
    this.textContent = message
    setTimeout(() => {
      this.textContent = ''
    }, 2000)
  }
}
