import { html, directive } from './dependencies/lit-html.mjs'
import { ACTIONS, LOREM_IPSUM } from './constants.mjs'
import { Text, Room, Participant } from './models/index.mjs'
import * as transitions from './transitions.mjs'
import * as app from './app.mjs'

class Selector {
  constructor ({ field, selector }) {
    this.field = field
    this.selector = selector
  }
}

const call = cb => cb()
const randomArray = upperBound => [ ...new Array(Math.floor(Math.random() * upperBound)) ]

let state = {
  theme: 'NEWSPAPER',
  theme_trying: 'NEWSPAPER',

  rooms: new Array(2).fill().map((_, i) => new Room({
    name: 'Room #' + (i + 1),
    participants: randomArray(20).map((_, i) => (
      new Participant()
    )),
    media: new Array(5).fill().map((_, i) => new Text({
      title: 'Title ' + i,
      content: LOREM_IPSUM
    }))
  })),
  active: new Selector({ selector: 'rooms.0' })
}

const handlers = {
  [ACTIONS.INITIAL] () {
    transitions.onInitial()
  },

  [ACTIONS.ADD_ROOM] () {
    const currentID =
      state.rooms
        .filter(room => room.name.startsWith('Room #'))
        .map(room => +room.name.substr(6))
        .filter(number => !isNaN(number) && number >= 1)
        .sort()
        .find((number, i, self) => number + 1 !== self[i + 1]) || 0

    const room = new Room({ name: 'Room #' + (currentID + 1) })

    state.rooms = state.rooms.concat(room)
    events.rooms.forEach(cb => cb())

    transitions.onAddRoom(room)

    return true
  },

  [ACTIONS.ACCEPT_OPTIONS] () {
    state.theme = state.theme_trying
    transitions.onAcceptOptions()
  },

  [ACTIONS.SHOW_EXTRENEOUS] () {
    transitions.onShowExtreneous()
  },

  [ACTIONS.EXPAND_QRS_CODE] ({ id }) {
    transitions.onExpandQRSCode(id)
    return true
  },

  [ACTIONS.OPEN_ROOM] ({ id }) {
    transitions.onOpenRoomStart(() => {
      state.active = new Selector({ selector: 'rooms.' + id })
      events.active.forEach(call)
      transitions.onOpenRoomEnd()
    })
    return true
  },

  [ACTIONS.THEME_TRY] ({ id }) {
    state.theme_trying = id
    transitions.onThemeSelect(id)
    app.applyTheme(id)
  },

  [ACTIONS.THEME_RESET] () {
    transitions.onThemeSelect(state.theme)
    app.applyTheme(state.theme)
  }
}

let events = {}
function onChange (field, onChange) {
  events[field] = events[field] || []
  events[field].push(onChange)
}

export const getStreamingState = (field, mapper) => {
  field = field instanceof Selector ? field : new Selector({ selector: field })

  return directive(part => {
    part.setValue(bindState(getState(field), mapper))

    onChange(field.selector.split('.')[0], () => {
      part.setValue(bindState(getState(field), mapper))
    })
  })
}

function bindState (state, cb) {
  if (state[Symbol.iterator]) {
    return [...state].map((item, index) => cb(html, item, index))
  } else {
    return [cb(html, state, 0)]
  }
}

export function getState (field) {
  const value = field instanceof Selector ? field : state[field]

  if (!(value instanceof Selector)) {
    return value
  }

  const fields = value.selector.split('.')
  let initial = state[fields.shift()]
  if (initial instanceof Selector) {
    initial = getState(initial)
  }

  const selected = fields.reduce((selected, field) => {
    if (selected == null) return selected
    const value = selected[field]
    return value instanceof Selector ? getState(value) : value
  }, initial)

  if (selected == null) {
    throw new Error(`Selector "${value.selector}" does not compute Will Robinson`)
  }

  return selected
}

let currentAction
export function updateState (action = ACTIONS.Initial, ...args) {
  const values = Object.entries(state)
  let allowRepeat = false

  if (typeof handlers[action] !== 'function') {
    console.warn(`Undeclared handler "${action.toString()}"`)
  } else {
    allowRepeat = handlers[action](...args)
  }

  for (const [field, value] of values) {
    if (state[field] !== value && events[field]) {
      events[field].forEach(call)
    }
  }

  currentAction = action

  return !!allowRepeat
}
