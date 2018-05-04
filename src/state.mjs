import { html, directive } from "./dependencies/lit-html.mjs";
import { ACTIONS } from "./constants.mjs";
import { Room } from "./models/Room.mjs";
import * as transitions from "./transitions.mjs";

let state = {
  rooms: [
    new Room({ name: "Foo", participants: ["a"] }),
    new Room({ name: "Bar" }),
    new Room({ name: "Baz" }),
    new Room({ name: "Foo", participants: ["a"] }),
    new Room({ name: "Bar" }),
    new Room({ name: "Baz" }),
    new Room({ name: "Foo", participants: ["a"] }),
    new Room({ name: "Bar" }),
    new Room({ name: "Baz" }),
    new Room({ name: "Foo", participants: ["a"] }),
    new Room({ name: "Bar" }),
    new Room({ name: "Baz" })
  ]
};

const handlers = {
  [ACTIONS.INITIAL](error) {
    transitions.onInitial();
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

  if (typeof handlers[action] !== "function") {
    console.warn(`Undeclared action "${action}"`);
  }
  handlers[action](...args);

  for (const [field, value] of values) {
    if (state[field] !== value && events[field]) {
      events[field].forEach(cb => cb());
    }
  }

  currentAction = action;
}
