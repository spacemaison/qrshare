import { QRSActive } from './components/QRSActive.mjs'
import { QRSCode } from './components/QRSCode.mjs'
import { QRSRooms } from './components/QRSRooms.mjs'

let $active, $rooms

export function onInitial () {
  $active = document.querySelector('qrs-active')
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

export function onOpenRoomStart (finished) {
  $active.addEventListener('transitionend', function cb () {
    $active.removeEventListener('transitionend', cb)
    setTimeout(finished, 100)
  })

  $active.state = QRSActive.STATES.HIDDEN
}

export function onOpenRoomEnd () {
  $active.state = QRSActive.STATES.SHOWING
}