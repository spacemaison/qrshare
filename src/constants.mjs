const ADD_ROOM = Symbol('ADD_ROOM')
const EXPAND_QRS_CODE = Symbol('EXPAND_QRS_CODE')
const OPEN_ROOM = Symbol('OPEN_ROOM')
const JOIN_ROOM = Symbol('JOIN_ROOM')

export const ACTIONS = Object.freeze({
  INITIAL: OPEN_ROOM,
  ADD_ROOM,
  EXPAND_QRS_CODE,
  OPEN_ROOM,
  JOIN_ROOM
})

export const LOREM_IPSUM = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at metus ipsum. Suspendisse quis mi ac sem malesuada iaculis. Pellentesque ipsum mauris, tempor semper posuere in, vehicula eget ex. Donec fermentum, lacus in gravida consequat, lorem tortor vestibulum libero, at accumsan est ante in magna. In hac habitasse platea dictumst. Vestibulum varius consectetur lorem, sed dictum magna mollis id. Curabitur id metus quis tellus facilisis vulputate. Fusce eleifend est vel suscipit ultricies. Fusce ac turpis id elit rutrum elementum. Etiam sodales turpis quis commodo commodo. Vestibulum nec auctor orci, et aliquet lectus. Vivamus finibus in quam eget hendrerit. Vivamus sagittis est ac odio tincidunt lobortis. Vestibulum sodales convallis eros sed mollis. Sed scelerisque faucibus aliquet. Cras mollis ligula non nibh malesuada, nec varius urna hendrerit.

Ut interdum fringilla malesuada. Sed luctus ex maximus, venenatis tortor a, fermentum lacus. Integer ut scelerisque sapien. Nam ac justo vehicula, tempus sem non, viverra ex. Praesent congue finibus ligula, sit amet porta nulla. Donec blandit massa ante, sed dignissim massa pulvinar nec. Phasellus ligula justo, porta gravida dolor at, mollis euismod libero. Praesent vel tempor nisl. Ut id consequat risus. Mauris ac quam nulla. Nunc vehicula nisi eget sem tincidunt vehicula vel et neque. Vestibulum lobortis ante et nibh volutpat, sit amet sollicitudin lorem hendrerit. Integer malesuada rhoncus leo non ultricies. Duis ut felis at erat consectetur porttitor sed auctor magna. Nunc at lacus vel arcu tincidunt faucibus.

Sed aliquam orci tincidunt, pharetra est et, facilisis libero. Vivamus sit amet purus nunc. Morbi odio libero, tincidunt quis augue vitae, imperdiet pharetra nisi. Donec sodales, enim sit amet molestie euismod, mauris nulla commodo erat, sed maximus erat urna ut mauris. Vivamus non nulla non dui scelerisque facilisis eget vitae ligula. Integer et volutpat diam. Mauris at magna rutrum, hendrerit libero at, porttitor metus. Ut scelerisque convallis sagittis. Proin pellentesque lacinia ultricies. Aenean malesuada, diam nec posuere sagittis, neque neque interdum diam, eu sagittis justo nisi a ex. Nulla facilisi. Integer purus orci, lobortis eu mattis vitae, pharetra in ante. Proin ac consequat ex. Vestibulum non elit porta, tincidunt erat quis, pretium nunc. Curabitur porttitor, leo id facilisis malesuada, lorem nulla ultrices elit, nec tempor neque leo iaculis enim. Donec nec lacus ullamcorper, hendrerit est et, cursus urna.

Aliquam est augue, scelerisque nec semper sed, placerat in elit. Etiam blandit diam nisl, sed venenatis arcu pellentesque id. Suspendisse ac lorem arcu. Duis non consectetur ipsum, a porta libero. Aliquam in sem sed nisl congue tincidunt id at tellus. Ut quam est, volutpat sodales ex sed, molestie tincidunt nisi. Nullam gravida dolor tellus, a dapibus sem hendrerit sed. Integer mattis diam ac purus egestas dictum. Ut congue enim eget velit luctus auctor. Nunc pharetra velit at velit malesuada, auctor tincidunt tellus pharetra. Vestibulum at diam at felis scelerisque egestas a ut tellus. Duis quis ex enim. Cras pharetra, ante ac fringilla volutpat, ex ipsum feugiat sapien, vel consequat orci ipsum laoreet diam. Nullam eget fringilla neque, vel tincidunt ex. Phasellus at imperdiet nisi. Duis tincidunt ullamcorper ipsum at consequat.

Sed vestibulum pharetra sapien, et vestibulum massa semper nec. Maecenas nec sodales mauris, in iaculis sem. Nam non semper urna. Integer blandit faucibus nibh posuere accumsan. Nam porttitor dui id ex euismod sollicitudin. Integer mi neque, ullamcorper et nulla nec, placerat pretium nisi. Quisque interdum malesuada molestie. Suspendisse imperdiet nisl ut vestibulum aliquet. Donec vestibulum molestie mi, eu fringilla magna pretium quis. Ut hendrerit libero sem, ac consectetur felis tincidunt vel. Aliquam erat volutpat. Integer vitae ultrices eros, ut rhoncus turpis. Aliquam in efficitur nisl. Phasellus suscipit mi non libero porta porttitor. Quisque id accumsan enim. Aliquam ac orci ex.
`
