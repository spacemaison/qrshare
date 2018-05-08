import { html, directive } from "./dependencies/lit-html.mjs";
import { ACTIONS } from "./constants.mjs";
import { Room } from "./models/Room.mjs";
import * as transitions from "./transitions.mjs";

let state = {
  rooms: [
    /*
    new Room({ name: "Foo", participants: ["a"] }),
    new Room({ name: "Bar" })
    new Room({ name: "Baz" }),
    new Room({ name: "Foo", participants: ["a"] }),
    new Room({ name: "Foo", participants: ["a"] }),
    new Room({ name: "Bar" }),
    new Room({ name: "Baz" }),
    new Room({ name: "Bar" }),
    new Room({ name: "Foo", participants: ["a"] }),
    new Room({ name: "Bar" }),
    new Room({ name: "Baz" }),
    new Room({ name: "Foo", participants: ["a"] }),
    new Room({ name: "Foo", participants: ["a"] }),
    new Room({ name: "Bar" }),
    new Room({ name: "Baz" }),
    new Room({ name: "Bar" }),
    new Room({ name: "Baz" })
    */
  ]
};

const handlers = {
  [ACTIONS.INITIAL](error) {
    transitions.onInitial();
  },

  [ACTIONS.ADD_ROOM]() {
    const currentID =
      state.rooms
        .filter(room => room.name.startsWith("Room #"))
        .map(room => +room.name.substr(6))
        .filter(number => !isNaN(number) && number >= 1)
        .sort()
        .find((number, i, self) => number + 1 !== self[i + 1]) || 0;

    const room = new Room({ name: "Room #" + (currentID + 1) });

    state.rooms = state.rooms.concat(room);
    events.rooms.forEach(cb => cb());

    transitions.onAddRoom(room);

    return true;
  },

  [ACTIONS.JOIN_ROOM]() {
    console.log(arguments);
  },

  [ACTIONS.EXPAND_QRS_CODE]({ id }) {
    transitions.onExpandQRSCode(id);
    return true;
  }
};

let events = {};
function onChange(field, onChange) {
  events[field] = events[field] || [];
  events[field].push(onChange);
}

export const getStreamingState = (field, mapper) =>
  directive(part => {
    part.setValue(bindState(state[field], mapper));

    onChange(field, () => {
      part.setValue(bindState(state[field], mapper));
    });
  });

function bindState(state, cb) {
  if (state[Symbol.iterator]) {
    return [...state].map((item, index) => cb(html, item, index));
  } else {
    return [cb(html, state, 0)];
  }
}

export function getState(field) {
  return state[field];
}

let currentAction;
export function updateState(action = ACTIONS.Initial, ...args) {
  const values = Object.entries(state);
  let allowRepeat = false;

  if (typeof handlers[action] !== "function") {
    console.warn(`Undeclared handler "${action.toString()}"`);
  } else {
    allowRepeat = handlers[action](...args);
  }

  for (const [field, value] of values) {
    if (state[field] !== value && events[field]) {
      events[field].forEach(cb => cb());
    }
  }

  currentAction = action;

  return !!allowRepeat;
}
