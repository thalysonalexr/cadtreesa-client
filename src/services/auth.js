// auth.js
import Vue from 'vue'
import VueJWT from 'vuejs-jwt'
import { logout as logoutService } from './users'

Vue.use(VueJWT)

export default {
  logout () {
    logoutService()
      .then(response => {
        if (response.status === 204) {
          localStorage.removeItem('access_token')
        }
      }).catch(error => {
        switch (error.response.status) {
          case 401:
            if (error.response.data.message === 'Expired token') {
              localStorage.removeItem('access_token')
            }
            break
          case 500:
            console.log('Error in server. Try again')
            break
        }
      })
  },
  getToken () {
    return localStorage.getItem('access_token')
  },
  loggedIn () {
    return !!localStorage.getItem('access_token')
  },
  requireAuth (to, from, next, type) {
    if (this.loggedIn()) {
      try {
        var tokenData = Vue.$jwt.decode(this.getToken()).data.type
        if (tokenData === null) {
          next('/')
        }
      } catch (err) {
        next('/')
      }
      if (type.includes(tokenData) || tokenData === type) {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next({ path: '/login' })
    }
  },
  requireAuthSelf (to, from, next) {
    const { params } = to
    if (this.loggedIn()) {
      try {
        var tokenData = Vue.$jwt.decode(this.getToken()).data.id
        if (tokenData === null) {
          next('/')
        }
      } catch (err) {
        next('/')
      }
      if (params.id === tokenData) {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next({ path: '/login' })
    }
  }
}
