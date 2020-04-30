import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    ADD_EVENT(state, payload) {
      state.events.push(payload)
    },
    UPDATE_EVENT(state, payload) {
      const event = state.events.find(event => {
        return event.id === payload.id
      })
      if(payload.location) {
        event.location = payload.location
      }
      if(payload.description) {
        event.description = payload.description
      }
      if(payload.organizer) {
        event.organizer = payload.organizer
      }
      if(payload.status) {
        event.status = payload.status
      }
      if(payload.startDate) {
        event.startDate = payload.startDate
      }
      if(payload.endDate) {
        event.endDate = payload.endDate
      }
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
    DELETE_EVENT(state, id) {
      const event = state.events.map(item => item.id).indexOf(id);
      state.events.splice(event, 1);
    }
  },
  actions: {
    getId() {
      let docRef = firebase.firestore().collection('events').doc()
      console.log("docRef ID: ", docRef.id)
      return docRef.id
    },
    //({ commit, dispatch }, params) {
    addEvent({ commit, dispatch }, payload) {
      console.log("payload from addEvent: ", payload)
      commit('SET_LOADING', true)
      dispatch('getId')
      .then(id => {
        let eventData = {
          id: id,
          organizer: payload.organizer,
          description: payload.description,
          location: payload.location,
          startDate: payload.startDate,
          endDate: payload.endDate,
          addedDate: payload.addedDate,
          status: payload.status,
          attendees: payload.attendees.push(payload.organizer)
        }
        console.log("eventData: ", eventData)
        return firebase.firestore().collection('events').doc(eventData.id).set(eventData)
      })
      .then((event) => {
        commit('ADD_EVENT', event)
        commit('SET_LOADING', false)
      })
      .catch(error => {
        console.log(error)
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
    },
    updateEvent({commit}, payload) {
      commit('SET_LOADING', true)
      const updateObj = {}
      if (payload.location) {
        updateObj.location = payload.location
      }
      if(payload.description) {
        updateObj.description = payload.description
      }
      if(payload.organizer) {
        updateObj.organizer = payload.organizer
      }
      if(payload.status) {
        updateObj.status = payload.status 
      }
      if(payload.startDate) {
        updateObj.startDate = payload.startDate 
      }
      if(payload.endDate) {
        updateObj.endDate = payload.endDate 
      }
      firebase.firestore().collection('events').doc(payload.id).update(updateObj)
      .then(() => {
        console.log("project updated in db")
        commit('UPDATE_EVENT', payload)
        commit('SET_LOADING', false)
      })
      .catch(error => {
        console.log(error)
        commit('SET_LOADING', false)
      })
    },
    deleteEvent({ commit}, eventId) {
      commit('SET_LOADING', true)
        return firebase.firestore().collection('events').doc(eventId).delete()
      .then((event) => {
        commit('DELETE_EVENT', event)
        commit('SET_LOADING', false)
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
    eventsCount(getters) {
      return getters.events.length
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
