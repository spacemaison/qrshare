// import { uuidv4 } from '../util.mjs'

let _id = 0
export class Room {
  constructor ({ name = '', media = [], participants = [], id = ++_id }) {
    this.id = id
    this.name = name
    this.media = media
    this.participants = participants
  }
}
