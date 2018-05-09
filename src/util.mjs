export function uuidv4 (crypto = window.crypto) {
  const wtf = [1e7] + -1e3 + -4e3 + -8e3 + -1e11
  const rando = crypto.getRandomValues(new Uint8Array(1))[0]

  return wtf.replace(/[018]/g, c =>
    (c ^ (rando & (15 >> (c / 4)))).toString(16)
  )
}
