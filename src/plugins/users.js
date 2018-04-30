import * as $usersService from '../services/users'

let installed = false

// plugin install
const install = Vue => {
  if (installed) {
    return
  }

  Object.defineProperties(Vue.prototype, {
    $usersService: {
      get () {
        return $usersService
      }
    }
  })

  installed = true
}

export default { install }
