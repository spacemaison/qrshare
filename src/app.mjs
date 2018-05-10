import registerComponents from './components/index.mjs'
import { updateState } from './state.mjs'
import { ACTIONS } from './constants.mjs'
import { registerDOMEvents } from './events.js'

async function bootstrap () {
  registerComponents()
  registerDOMEvents(updateState)

  window.addEventListener('load', () => {
    addUserAgentClasses()
    updateState(ACTIONS.INITIAL)
  })
}

bootstrap().catch(error => {
  console.error(error.stack)
})

function addUserAgentClasses () {
  const isSafari = navigator.userAgent.match(/Version\/[\d.]+.*Safari/) ? 1 : 0
  const noSafari = isSafari ? 0 : 1
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? 1 : 0
  const noiOS = isiOS ? 0 : 1

  document.documentElement.style.setProperty('--is-safari', isSafari)
  document.documentElement.style.setProperty('--no-safari', noSafari)
  document.documentElement.style.setProperty('--is-ios', isiOS)
  document.documentElement.style.setProperty('--no-ios', noiOS)

  if (isSafari) {
    document.documentElement.classList.add('is-safari')
  }

  if (isiOS) {
    document.documentElement.classList.add('is-ios')
  }
}

window.updateState = updateState
