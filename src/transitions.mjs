import { QRSCode } from './components/QRSCode.mjs'

let $rooms

export function onInitial () {
  $rooms = document.querySelector('qrs-rooms')
}

export function onExpandQRSCode (id) {}

export function onAddRoom (room) {
  $rooms.scrollTo(0, document.body.scrollHeight)
  const newRoomCode = $rooms.querySelector(`qrs-code[data-id="${room.id}"]`)
  newRoomCode.state = QRSCode.STATES.ACTIVE
}
