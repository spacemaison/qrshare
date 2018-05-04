export function PassTo(selector, ...properties) {
  let PassTo = class PassTo {};

  for (const property of properties) {
    Object.defineProperty(PassTo.prototype, property, {
      enumerable: true,
      configurable: false,
      get() {
        return this.querySelector(selector)[property];
      },
      set(value) {
        this.querySelector(selector)[property] = value;
      }
    });
  }

  return PassTo;
}
