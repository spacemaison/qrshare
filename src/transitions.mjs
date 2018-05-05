import { QRSCrudOverlay } from "./components/QRSCrudOverlay.mjs";
import { QRSCode } from "./components/QRSCode.mjs";

let $crudOverlay, $rooms;

export function onInitial() {
  $crudOverlay = document.querySelector("qrs-crud-overlay");
  $rooms = document.querySelector("qrs-rooms");
}

export function onExpandQRSCode(id) {
  switch ($crudOverlay.state) {
    default:
      $crudOverlay.state = QRSCrudOverlay.STATES.SHOWING;
      break;

    case QRSCrudOverlay.STATES.SHOWING:
      $crudOverlay.state = QRSCrudOverlay.STATES.HIDDEN;
  }
}

export function onAddRoom(room) {
  $rooms.scrollTo(0, document.body.scrollHeight);
  const newRoomCode = $rooms.querySelector(`qrs-code[data-id="${room.id}"]`);
  newRoomCode.state = QRSCode.STATES.ACTIVE;
}
