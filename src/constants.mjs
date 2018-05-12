const ACCEPT_OPTIONS = Symbol('ACCEPT_OPTIONS')
const ADD_ROOM = Symbol('ADD_ROOM')
const INITIAL = Symbol('INITIAL')
const EXPAND_QRS_CODE = Symbol('EXPAND_QRS_CODE')
const OPEN_ROOM = Symbol('OPEN_ROOM')
const JOIN_ROOM = Symbol('JOIN_ROOM')
const SHOW_EXTRENEOUS = Symbol('SHOW_EXTRENEOUS')
const THEME_ACCEPT = Symbol('THEME_ACCEPT')
const THEME_RESET = Symbol('THEME_RESET')
const THEME_TRY = Symbol('THEME_TRY')

export const ACTIONS = Object.freeze({
  INITIAL,
  ACCEPT_OPTIONS,
  ADD_ROOM,
  EXPAND_QRS_CODE,
  OPEN_ROOM,
  JOIN_ROOM,
  SHOW_EXTRENEOUS,
  THEME_ACCEPT,
  THEME_RESET,
  THEME_TRY
})

const THEME_DEFAULTS = Object.freeze({
  __proto__: null,
  'root-rounding': '4px',
  'root-flourish': 'red',
  'root-flourish-contrast': 'white',
  'root-fg': 'black',
  'root-bg': 'white'
})

export const THEMES = Object.freeze({
  'BUMBLEBEE': Object.freeze({
    __proto__: THEME_DEFAULTS,

    'root-flourish': 'brown',
    'root-rounding': '0',
    'qrs-active-bg': 'rgba(255,0,0,0.1)',
    'qrs-rooms-bg-blurred': 'rgba(255,255,255,0.40)',
    'qrs-rooms-bg': 'rgba(255,255,255,0.8)',
    'bg-image-url': 'url(../../assets/halftone_yellow.png)'
  }),

  'CIRCLES': Object.freeze({
    __proto__: THEME_DEFAULTS,

    'qrs-active-bg': 'rgba(255,0,0,0.1)',
    'qrs-rooms-bg-blurred': 'rgba(255,255,255,0.80)',
    'qrs-rooms-bg': 'rgba(255,255,255,0.95)',
    'bg-image-url': 'url(../../assets/circles_and_roundabouts.png)'
  }),

  'DARK WOOL': Object.freeze({
    __proto__: THEME_DEFAULTS,

    'bg-image-url': 'url(../../assets/zig_zag_wool.png)',
    'qrs-active-bg': 'rgba(255,255,255,0.1)',
    'qrs-rooms-bg-blurred': 'rgba(255,255,255,0.80)',
    'qrs-rooms-bg': 'rgba(255,255,255,0.95)'
  }),

  'NEWSPAPER': Object.freeze({
    __proto__: THEME_DEFAULTS,

    'qrs-active-bg': 'rgba(255,255,255,0.1)',
    'qrs-rooms-bg-blurred': 'rgba(255,255,255,0.80)',
    'qrs-rooms-bg': 'rgba(255,255,255,0.95)',
    'bg-image-url': 'url(../../assets/diagonal_striped_brick.png)'
  }),

  'WOODY': Object.freeze({
    __proto__: THEME_DEFAULTS,

    'qrs-active-bg': 'rgba(255,255,255,0.1)',
    'qrs-rooms-bg-blurred': 'rgba(255,255,255,0.80)',
    'qrs-rooms-bg': 'rgba(255,255,255,0.95)',
    'bg-image-url': 'url(../../assets/wood.png)'
  }),

  'POW': Object.freeze({
    __proto__: THEME_DEFAULTS,

    'qrs-active-bg': 'rgba(255,255,255,0.1)',
    'qrs-rooms-bg-blurred': 'rgba(255,255,255,0.80)',
    'qrs-rooms-bg': 'rgba(255,255,255,0.95)',
    'bg-image-url': 'url(../../assets/pow_star.png)'
  })
})

export const LOREM_IPSUM = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at metus ipsum. Suspendisse quis mi ac sem malesuada iaculis. Pellentesque ipsum mauris, tempor semper posuere in, vehicula eget ex. Donec fermentum, lacus in gravida consequat, lorem tortor vestibulum libero, at accumsan est ante in magna. In hac habitasse platea dictumst. Vestibulum varius consectetur lorem, sed dictum magna mollis id. Curabitur id metus quis tellus facilisis vulputate. Fusce eleifend est vel suscipit ultricies. Fusce ac turpis id elit rutrum elementum. Etiam sodales turpis quis commodo commodo. Vestibulum nec auctor orci, et aliquet lectus. Vivamus finibus in quam eget hendrerit. Vivamus sagittis est ac odio tincidunt lobortis. Vestibulum sodales convallis eros sed mollis. Sed scelerisque faucibus aliquet. Cras mollis ligula non nibh malesuada, nec varius urna hendrerit.

Ut interdum fringilla malesuada. Sed luctus ex maximus, venenatis tortor a, fermentum lacus. Integer ut scelerisque sapien. Nam ac justo vehicula, tempus sem non, viverra ex. Praesent congue finibus ligula, sit amet porta nulla. Donec blandit massa ante, sed dignissim massa pulvinar nec. Phasellus ligula justo, porta gravida dolor at, mollis euismod libero. Praesent vel tempor nisl. Ut id consequat risus. Mauris ac quam nulla. Nunc vehicula nisi eget sem tincidunt vehicula vel et neque. Vestibulum lobortis ante et nibh volutpat, sit amet sollicitudin lorem hendrerit. Integer malesuada rhoncus leo non ultricies. Duis ut felis at erat consectetur porttitor sed auctor magna. Nunc at lacus vel arcu tincidunt faucibus.

Sed aliquam orci tincidunt, pharetra est et, facilisis libero. Vivamus sit amet purus nunc. Morbi odio libero, tincidunt quis augue vitae, imperdiet pharetra nisi. Donec sodales, enim sit amet molestie euismod, mauris nulla commodo erat, sed maximus erat urna ut mauris. Vivamus non nulla non dui scelerisque facilisis eget vitae ligula. Integer et volutpat diam. Mauris at magna rutrum, hendrerit libero at, porttitor metus. Ut scelerisque convallis sagittis. Proin pellentesque lacinia ultricies. Aenean malesuada, diam nec posuere sagittis, neque neque interdum diam, eu sagittis justo nisi a ex. Nulla facilisi. Integer purus orci, lobortis eu mattis vitae, pharetra in ante. Proin ac consequat ex. Vestibulum non elit porta, tincidunt erat quis, pretium nunc. Curabitur porttitor, leo id facilisis malesuada, lorem nulla ultrices elit, nec tempor neque leo iaculis enim. Donec nec lacus ullamcorper, hendrerit est et, cursus urna.

Aliquam est augue, scelerisque nec semper sed, placerat in elit. Etiam blandit diam nisl, sed venenatis arcu pellentesque id. Suspendisse ac lorem arcu. Duis non consectetur ipsum, a porta libero. Aliquam in sem sed nisl congue tincidunt id at tellus. Ut quam est, volutpat sodales ex sed, molestie tincidunt nisi. Nullam gravida dolor tellus, a dapibus sem hendrerit sed. Integer mattis diam ac purus egestas dictum. Ut congue enim eget velit luctus auctor. Nunc pharetra velit at velit malesuada, auctor tincidunt tellus pharetra. Vestibulum at diam at felis scelerisque egestas a ut tellus. Duis quis ex enim. Cras pharetra, ante ac fringilla volutpat, ex ipsum feugiat sapien, vel consequat orci ipsum laoreet diam. Nullam eget fringilla neque, vel tincidunt ex. Phasellus at imperdiet nisi. Duis tincidunt ullamcorper ipsum at consequat.

Sed vestibulum pharetra sapien, et vestibulum massa semper nec. Maecenas nec sodales mauris, in iaculis sem. Nam non semper urna. Integer blandit faucibus nibh posuere accumsan. Nam porttitor dui id ex euismod sollicitudin. Integer mi neque, ullamcorper et nulla nec, placerat pretium nisi. Quisque interdum malesuada molestie. Suspendisse imperdiet nisl ut vestibulum aliquet. Donec vestibulum molestie mi, eu fringilla magna pretium quis. Ut hendrerit libero sem, ac consectetur felis tincidunt vel. Aliquam erat volutpat. Integer vitae ultrices eros, ut rhoncus turpis. Aliquam in efficitur nisl. Phasellus suscipit mi non libero porta porttitor. Quisque id accumsan enim. Aliquam ac orci ex.
`
