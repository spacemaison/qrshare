import registerComponents from "./components/index.mjs";
import { updateState } from "./state.mjs";
import { ACTIONS } from "./constants.mjs";
import { registerDOMEvents } from "./events.js";

async function bootstrap() {
  registerComponents();
  registerDOMEvents(updateState);

  window.addEventListener("load", () => {
    updateState(ACTIONS.INITIAL);
  });
}

bootstrap().catch(error => {
  console.error(error.stack);
});

window.updateState = updateState;

function uuidv4() {
  const wtf = [1e7] + -1e3 + -4e3 + -8e3 + -1e11;
  const rando = crypto.getRandomValues(new Uint8Array(1))[0];

  return wtf.replace(/[018]/g, c =>
    (c ^ (rando & (15 >> (c / 4)))).toString(16)
  );
}
