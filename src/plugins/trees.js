import * as $treesService from '../services/trees'

let installed = false

// plugin install
const install = Vue => {
  if (installed) {
    return
  }

  Object.defineProperties(Vue.prototype, {
    $treesService: {
      get () {
        return $treesService
      }
    }
  })

  installed = true
}

export default { install }
