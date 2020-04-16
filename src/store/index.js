import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [
      {
        id: 1, title: 'Tepoztlán, Mexico', date: 'TBD', added: '14 April 2020', addedBy: 'Karla',
        attendees: [{ id: 'abc123', name: 'Karla' }, { id: 'def456', name: 'Patrick' }]
      },
      {
        id: 2, title: 'Seattle, Washington', date: 'TBD', added: '14 April 2020', addedBy: 'Karla',
        attendees: [{ id: 'abc123', name: 'Karla' }, { id: 'def456', name: 'Patrick' }]
      },
      {
        id: 3, title: 'Hawaii', date: 'TBD', added: '14 April 2020', addedBy: 'Patrick',
        attendees: [{ id: 'abc123', name: 'Karla' }, { id: 'def456', name: 'Patrick' }]
      },
    ],
    categories: [
      { id: 1, title: 'Hotel' },
      { id: 2, title: 'Experience' },
      { id: 3, title: 'Food' },
      { id: 4, title: 'Idea' }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    ADD_EVENT(state, payload) {
      state.events.push(payload)
    },
    SET_EVENTS(state, payload) {
      state.events = payload
    },
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
  },
  actions: {
    getId() {
      let docRef = firebase.firestore().collection('events').doc()
      console.log("docRef ID: ", docRef.id)
      return docRef
    },
    addEvent({ commit }, payload) {
      commit('SET_LOADING', true)
      let eventData = {
        organizer: payload.organizer,
        description: payload.description,
        location: payload.location,
        startDate: payload.startDate,
        endDate: payload.endDate,
        addedDate: payload.addedDate,
        attendees: []
      }
      let docRef = firebase.firestore().collection('events').doc()
      console.log("docRef ID: ", docRef.id)
      return firebase.firestore().collection('events').doc(docRef.id).set({
        ...eventData,
        id: docRef.id
      })
      .then((event) => {
        commit('ADD_EVENT', event)
        commit('SET_LOADING', false)
        // return event.data()
      })
      .catch(error => {
        console.log(error)
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
    },
    loadEvents({commit}) {
      commit('SET_LOADING', true)
      firebase.firestore().collection('events').get()
      .then((querySnapshot) => {
        let EventsArray = []
        querySnapshot.forEach((doc) => {
        let event = doc.data()
            event.id = doc.id
            EventsArray.push(event)
        })
        commit('SET_EVENTS', EventsArray)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        console.log(error)
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
    },
    googleSignIn({commit}) {
      commit('SET_LOADING', true)
      let user = null
      let provider = new firebase.auth.GoogleAuthProvider()
      //https://developers.google.com/identity/protocols/googlescopes#oauth2v2
      provider.addScope("https://www.googleapis.com/auth/userinfo.email")
      provider.addScope("https://www.googleapis.com/auth/userinfo.profile")
      firebase.auth().signInWithPopup(provider)
      .then(googleData => {
        user = googleData.user
        const googleUser = {
          uid: user.uid, 
          displayName: user.displayName, 
          email: user.email,
          photoURL: user.photoURL,
          created: user.metadata.creationTime,
          lastSignIn: user.metadata.lastSignInTime,
          myEvents: []
        }
        firebase.firestore().collection('users').doc(user.uid).set(googleUser)
        commit('SET_USER', googleUser)
        commit('SET_LOADING', false)
      })
      .catch(error => {
        console.log(error)
        commit('SET_LOADING', false)
        commit('SET_ERROR', error)
      })
    },
    googleSignOut() {
      firebase.auth().signOut()
      .then(() => {
        console.log("sign out called")
      })
    },
  },
  modules: {
  },
  getters: {
    user(state) {
      return state.user
    },
    events(state) {
      return state.events
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    },
    categories(state) {
      return state.categories
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
})
