// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import StyleCustom from './assets/css/style.css'
import BootstrapVue from 'bootstrap-vue'
import VModal from 'vue-js-modal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// plugins
import UsersPlugin from './plugins/users'
import TreesPlugin from './plugins/trees'
import PublicPlugin from './plugins/public'
import HelpersPlugin from './plugins/helpers'

Vue.config.productionTip = false

Vue.use(StyleCustom)
Vue.use(BootstrapVue)
Vue.use(VModal, { dialog: true })
Vue.use(UsersPlugin)
Vue.use(TreesPlugin)
Vue.use(PublicPlugin)
Vue.use(HelpersPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
