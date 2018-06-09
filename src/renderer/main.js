import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import AlertCmp from './components/Shared/alert'
import BranchInfo from './components/BranchInfo'
import BranchDetailsDialog from './components/BranchDetailsDialog.vue'
import BranchNewContactDialog from './components/BranchNewContactDialog.vue'
import BranchUpdateContactDialog from './components/BranchUpdateContactDialog.vue'
import Signin from './components/User/Signin.vue'
import Signup from './components/User/Signup.vue'
import bottomNav from './components/Shared/bottomNav'
import CharFilter from './components/filters/filters'
import settingsPhonebook from './components/User/settingsPhonebook'

Vue.component('app-alert', AlertCmp)
Vue.component('BranchInfo', BranchInfo)
Vue.component('app-branch-details-dialog', BranchDetailsDialog)
Vue.component('Signup', Signup)
Vue.component('Signin', Signin)
Vue.component('app-new-contact', BranchNewContactDialog)
Vue.component('app-update-contact', BranchUpdateContactDialog)
Vue.component('app-bottomNav', bottomNav)
Vue.component('app-settings-phonebook', settingsPhonebook)

Vue.filter('charfilter', CharFilter.uppercase)
Vue.use(Vuetify)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  created () {
  	this.$store.dispatch('getAllPerson')
  	firebase.initializeApp({
  		  apiKey: 'AIzaSyByxllcEw8iARiyxJ0-2PYCuLS5n2dzcrI',
        authDomain: 'pblinfo-29ef8.firebaseapp.com',
        databaseURL: 'https://pblinfo-29ef8.firebaseio.com',
        projectId: 'pblinfo-29ef8',
        storageBucket: 'pblinfo-29ef8.appspot.com',
        messagingSenderId: '474307733048'
  	})
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('loadPersons')
      }
    })
  }
}).$mount('#app')
