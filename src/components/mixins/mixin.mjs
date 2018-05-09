// Jank runtime mixin helper. The constructors of the mixed in classes are
// skipped. Property clashes are skipped.
//
// An example:
// ```
// class Foo { aMethod() { console.log('works') } }
// class Bar {
//   constructor () { /* This is never called */ }
//   get pancakes() { return 'no pancakes, sorry' }
// }
// class HappyFace extends HTMLElement {
//   constructor () {
//     this.aMethod() // prints "works"
//     console.log(this.pancakes) // prints "no pancakes, sorry"
//   }
// }
// mixin(HappyFace, Foo, Bar)
// ```

export * from './Render.mjs'
export * from './Pan.mjs'
export * from './PassTo.mjs'
export * from './Press.mjs'
export * from './State.mjs'

export function mixin (Klass, ...Klasses) {
  Klasses = Klasses.map(Klass => [
    Klass,
    Object.getOwnPropertyNames(Klass.prototype)
  ])

  const properties = Klasses.reduce(defineProperties, {})

  Object.defineProperties(Klass.prototype, properties)

  function defineProperties (props, [Klass, names]) {
    for (const name of names) {
      if (name === 'constructor' || props[name]) {
        continue
      }

      props[name] = Object.getOwnPropertyDescriptor(Klass.prototype, name)
    }
    return props
  }
}
