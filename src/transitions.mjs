import { QRSCode } from './components/QRSCode.mjs'
import { QRSRooms } from './components/QRSRooms.mjs'

let $rooms

export function onInitial () {
  $rooms = document.querySelector('qrs-rooms')
}

export function onExpandQRSCode (id) {}

export function onAddRoom (room) {
  $rooms.scrollTo(0, document.body.scrollHeight)
  $rooms.state = QRSRooms.STATES.Normal

  const newRoomCode = $rooms.querySelector(`qrs-code[data-id="${room.id}"]`)
  newRoomCode.action = 'expand_qrs_code'
  newRoomCode.state = QRSCode.STATES.ACTIVE
}
