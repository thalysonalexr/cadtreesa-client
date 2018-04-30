import * as $publicService from '../services/public'

let installed = false

// plugin install
const install = Vue => {
  if (installed) {
    return
  }

  Object.defineProperties(Vue.prototype, {
    $publicService: {
      get () {
        return $publicService
      }
    }
  })

  installed = true
}

export default { install }
