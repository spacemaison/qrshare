const ADD_ROOM = Symbol("ADD_ROOM");
const EXPAND_QRS_CODE = Symbol("EXPAND_QRS_CODE");
const OPEN_ROOM = Symbol("OPEN_ROOM");
const JOIN_ROOM = Symbol("JOIN_ROOM");

export const ACTIONS = Object.freeze({
  INITIAL: OPEN_ROOM,
  ADD_ROOM,
  EXPAND_QRS_CODE,
  OPEN_ROOM,
  JOIN_ROOM
});
