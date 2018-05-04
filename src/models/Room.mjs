export class Room {
  constructor({ name = "", media = [], participants = [], qrcode = {} }) {
    this.name = name;
    this.media = media;
    this.participants = participants;
    this.qrcode = qrcode;
  }
}
