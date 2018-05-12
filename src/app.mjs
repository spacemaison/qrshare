import registerComponents from './components/index.mjs'
import { updateState } from './state.mjs'
import { ACTIONS, THEMES } from './constants.mjs'
import { registerDOMEvents } from './events.js'


async function bootstrap () {
  registerComponents()
  registerDOMEvents(updateState)

  window.addEventListener('load', () => {
    addUserAgentClasses()
    addFeatureClasses()
    updateState(ACTIONS.INITIAL)
  })
}

bootstrap().catch(error => {
  console.error(error.stack)
})

export function applyTheme (id) {
  const root = document.documentElement

  for (const prop in THEMES[id]) {
    root.style.setProperty('--' + prop, THEMES[id][prop])
  }
}

function addFeatureClasses () {
  const css = (CSS && CSS.supports) || (() => false)
  const root = document.documentElement

  if (css('( backdrop-filter: blur(2px) ) or ( -webkit-backdrop-filter: blur(2px) )')) {
    root.classList.add('has-blur')
    root.style.setProperty('--has-blur', 1)
  } else {
    root.style.setProperty('--has-blur', 0)
  }
}

function addUserAgentClasses () {
  const root = document.documentElement
  const isSafari = navigator.userAgent.match(/Version\/[\d.]+.*Safari/) ? 1 : 0
  const noSafari = isSafari ? 0 : 1
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? 1 : 0
  const noiOS = isiOS ? 0 : 1

  root.style.setProperty('--is-safari', isSafari)
  root.style.setProperty('--no-safari', noSafari)
  root.style.setProperty('--is-ios', isiOS)
  root.style.setProperty('--no-ios', noiOS)

  if (isSafari) {
    root.classList.add('is-safari')
  }

  if (isiOS) {
    root.classList.add('is-ios')
  }
}

window.applyTheme = applyTheme
window.updateState = updateState
