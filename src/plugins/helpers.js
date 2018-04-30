import * as $helpers from '../helpers/helpers'

let installed = false

// plugin install
const install = Vue => {
  if (installed) {
    return
  }

  Object.defineProperties(Vue.prototype, {
    $helpers: {
      get () {
        return $helpers
      }
    }
  })

  installed = true
}

export default { install }
