import Vue from 'vue'
import Router from 'vue-router'
import VueJWT from 'vuejs-jwt'
// components
// -- pages
import Home from '@/components/pages/Home'
import MenuSTD from '@/components/pages/MenuSTD'
import MenuTCR from '@/components/pages/MenuTCR'
import MenuCDR from '@/components/pages/MenuCDR'
import NotFound from '@/components/pages/NotFound'
import UsersList from '@/components/pages/UsersList'
import UserList from '@/components/pages/UserList'
import TreesList from '@/components/pages/TreesList'
// -- forms
import RegisterUser from '@/components/forms/RegisterUser'
import Login from '@/components/forms/Login'
import RegisterTree from '@/components/forms/RegisterTree'
import ForgotPassword from '@/components/forms/ForgotPassword'
import ChangePassword from '@/components/forms/ChangePassword'
import Contact from '@/components/forms/Contact'
import EditUser from '@/components/forms/EditUser'
// services
import Auth from '../services/auth'
import TYPES from '../services/config'

Vue.use(Router)
Vue.use(VueJWT)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/cadastro', name: 'RegisterUser', component: RegisterUser },
    { path: '/login', name: 'Login', component: Login },
    { path: '/logout',
      beforeEnter (to, from, next) {
        Auth.logout()
        next('/login')
      }
    },
    { path: '/recuperar-senha', name: 'ForgotPassword', component: ForgotPassword },
    { path: '/change_password/:token',
      name: 'ChangePassword',
      component: ChangePassword,
      beforeEnter (to, from, next) {
        const { params } = to
        try {
          let token = Vue.$jwt.decode(params.token)
          if (token === null) {
            next('/')
          } else {
            next()
          }
        } catch (err) {
          console.log('Invalid token')
          next('/')
        }
      }
    },
    { path: '/menu-aluno',
      name: 'MenuSTD',
      component: MenuSTD,
      beforeEnter (to, from, next) {
        Auth.requireAuth(to, from, next, TYPES.student)
      }
    },
    { path: '/menu-professor',
      name: 'MenuTCR',
      component: MenuTCR,
      beforeEnter (to, from, next) {
        Auth.requireAuth(to, from, next, TYPES.teacher)
      }
    },
    { path: '/menu-coordenador',
      name: 'MenuCDR',
      component: MenuCDR,
      beforeEnter (to, from, next) {
        Auth.requireAuth(to, from, next, TYPES.coordinator)
      }
    },
    { path: '/redirect/:token',
      redirect: to => {
        const { params } = to
        let type = Vue.$jwt.decode(params.token).data.type

        switch (type) {
          case TYPES.student:
            return { name: 'MenuSTD' }
          case TYPES.teacher:
            return { name: 'MenuTCR' }
          case TYPES.coordinator:
            return { name: 'MenuCDR' }
        }
      }
    },
    { path: '/arvores/cadastro',
      name: 'RegisterTree',
      component: RegisterTree,
      beforeEnter (to, from, next) {
        Auth.requireAuth(to, from, next, [TYPES.student, TYPES.teacher, TYPES.coordinator])
      }
    },
    { path: '/usuarios/listar',
      name: 'UsersList',
      component: UsersList,
      beforeEnter (to, from, next) {
        Auth.requireAuth(to, from, next, [TYPES.teacher, TYPES.coordinator])
      }
    },
    { path: '/usuarios/listar/:id',
      name: 'UserList',
      component: UserList,
      beforeEnter (to, from, next) {
        Auth.requireAuth(to, from, next, [TYPES.teacher, TYPES.coordinator])
      }
    },
    { path: '/usuarios/contato/:id',
      name: 'Contact',
      component: Contact,
      beforeEnter (to, from, next) {
        Auth.requireAuth(to, from, next, [TYPES.teacher, TYPES.coordinator])
      }
    },
    { path: '/usuarios/editar/:id',
      name: 'EditUser',
      component: EditUser,
      beforeEnter (to, from, next) {
        Auth.requireAuth(to, from, next, [TYPES.student, TYPES.teacher, TYPES.coordinator])
        Auth.requireAuthSelf(to, from, next)
      }
    },
    { path: '/arvores/listar',
      name: 'TreesList',
      component: TreesList,
      beforeEnter (to, from, next) {
        Auth.requireAuth(to, from, next, [TYPES.teacher, TYPES.coordinator])
      }
    },
    { path: '*', name: 'NotFound', component: NotFound }
  ]
})
