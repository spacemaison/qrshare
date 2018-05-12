import * as app from './app.mjs'
import { QRSActive } from './components/QRSActive.mjs'
import { QRSCode } from './components/QRSCode.mjs'
import { QRSRooms } from './components/QRSRooms.mjs'

let $active, $main, $rooms, $themesSelectors

export function onInitial () {
  $active = document.querySelector('qrs-active')
  $rooms = document.querySelector('qrs-rooms')
  $main = document.querySelector('main')
  $themesSelectors = document.querySelectorAll('qrs-options-theme')

  app.applyTheme('NEWSPAPER')
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

export function onShowExtreneous () {
  $main.classList.add('extreneous-showing')
}

export function onAcceptOptions () {
  $main.classList.remove('extreneous-showing')
}

export function onThemeSelect (id) {
  for (const $theme of $themesSelectors) {
    if ($theme.dataset.id === id) {
      $theme.state = 'SELECTED'
    } else {
      $theme.state = 'UNSELECTED'
    }
  }
}