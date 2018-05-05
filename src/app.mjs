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
