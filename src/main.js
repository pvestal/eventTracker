import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app'
import '@babel/polyfill'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})
Vue.config.productionTip = false



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCP5-G6Xy4GGp7JyW41dJkpkmdnQG51Aag",
      authDomain: "vaca-spots.firebaseapp.com",
      databaseURL: "https://vaca-spots.firebaseio.com",
      projectId: "vaca-spots",
      storageBucket: "vaca-spots.appspot.com",
      messagingSenderId: "923386838477",
      appId: "1:923386838477:web:4b272eeae4196d1cc6d884"

    });
    
    //check if auth
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.$store.dispatch('autoSignIn', user)
        // this.$store.dispatch('fetchUserData', user)
      }
    })
    //load meetups from firebase
    this.$store.dispatch('loadEvents')
  }
}).$mount('#app')