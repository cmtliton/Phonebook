import Vue from 'vue'
import Vuex from 'vuex'
import personsRepository from '../../repositories/personsRepository'
import * as firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
  	headers: [
      {text: 'BRANCH NAME', value: 'BRNAM', align: 'left'},
      {text: 'DISTRICT', value: 'DSTNAM', align: 'left'},
      {text: 'TEL NO', value: 'TELNO', align: 'left'},
      {text: 'MOBILE NO', value: 'MOBNO', align: 'left'},
      {text: 'ACTIONS', value: 'action', align: 'left'}
      ],
    persons: [],
    loading: false,
    error: null,
    user: null
    },
    getters: {
      headers (state) {
       return state.headers
      },
      persons (state) {
        return state.persons 
      },
      loading (state) {
        return state.loading
      },
      user (state) {
        return state.user
      },
      error (state) {
        return state.error
      }
    },
    mutations: {
      setLoadedpersons(state, payload) {
       const findpersons = state.persons.find(person => {
          return person.BRCOD === payload.BRCOD
        })
       if(!findpersons) {
        state.persons.push(payload)
        personsRepository.addPersonToBegin(payload)
       } else {
        if(findpersons.BRNAM != payload.BRNAM ||
          findpersons.ZNNAM != payload.ZNNAM ||
          findpersons.DSTNAM != payload.DSTNAM ||
          findpersons.EMAIL != payload.EMAIL ||
          findpersons.TELNO != payload.TELNO ||
          findpersons.MOBNO != payload.MOBNO ||
          findpersons.ADDR != payload.ADDR) { 
          personsRepository.updatePerson(payload.BRCOD, payload)
          findpersons.BRNAM = payload.BRNAM
          findpersons.ZNNAM = payload.ZNNAM
          findpersons.DSTNAM = payload.DSTNAM
          findpersons.EMAIL = payload.EMAIL
          findpersons.TELNO = payload.TELNO
          findpersons.MOBNO = payload.MOBNO
          findpersons.ADDR = payload.ADDR
        }
       }
       },
      personSaving (state, payload) {
        state.persons.push(payload)
        personsRepository.addPersonToBegin(payload)
      },
      personSavingChanges (state, payload) {

      },
      getAllPerson (state, payload) {
        state.persons = payload
      },
      setLoading (state, payload) {
        state.loading = payload
      },
      setError (state, payload) {
        state.error = payload
      },
      clearError (state) {
        state.error = null
      },
      setUser (state, payload) {
        state.user = payload
      }
    },
    actions: {
      loadPersons ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('persons').once('value')
      .then((data) => {
        let personf
        const obj = data.val()
        for (let key in obj) {
         personf = {
            BRCOD: key,
            BRNAM: obj[key].BRNAM,
            ZNNAM: obj[key].ZNNAM,
            DSTNAM: obj[key].DSTNAM,
            TELNO: obj[key].TELNO,
            MOBNO: obj[key].MOBNO,
            EMAIL: obj[key].EMAIL,
            ADDR: obj[key].ADDR,
            DATE: obj[key].DATE,
            CREATORID: obj[key].CREATORID
          }
          commit('setLoadedpersons', personf)
          }
          commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
      })
    },
      personSaving ({commit, getters}, payload) {
        commit('setLoading', true)
        const person = {
          BRNAM : payload.BRNAM,
          DSTNAM : payload.DSTNAM,
          ZNNAM: payload.ZNNAM,
          MOBNO: payload.MOBNO,
          TELNO: payload.TELNO,
          EMAIL: payload.EMAIL,
          ADDR: payload.ADDR,
          DATE: new Date().toISOString(),
          CREATORID: getters.user.id
        }
        let key
        // Data Saving Cloud server
        firebase.database().ref('persons').push(person)
        .then((data) => {
         key = data.key
         commit('personSaving', {
          ...person,
            BRCOD: key
        })
         commit('setLoading', false)
       })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
      },
      personSavingChanges ({commit, getters}, payload) {
        commit('setLoading', true)
        const updatePersonobj = {}
        if (payload.BRNAM) {
          updatePersonobj.BRNAM = payload.BRNAM
        }
        if (payload.ZNNAM) {
          updatePersonobj.ZNNAM = payload.ZNNAM
        }
        if (payload.DSTNAM) {
          updatePersonobj.DSTNAM = payload.DSTNAM
        }
        if (payload.TELNO) {
          updatePersonobj.TELNO = payload.TELNO
        }
        if (payload.MOBNO) {
          updatePersonobj.MOBNO = payload.MOBNO
        }
        if (payload.EMAIL) {
          updatePersonobj.EMAIL = payload.EMAIL
        }
        if (payload.ADDR) {
          updatePersonobj.ADDR = payload.ADDR
        }
        if (payload.DATE) {
          updatePersonobj.DATE = payload.DATE
        }
        if (payload.CREATORID) {
          updatePersonobj.CREATORID = payload.CREATORID
        }
        firebase.database().ref('persons').child(payload.BRCOD).update(updatePersonobj)
        .then(() => {
          commit('setLoading', false)
          commit('setLoadedpersons', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
      },
      getAllPerson ({ commit }) {
        commit('setLoading', true)
        const persons= personsRepository.getPersons()
        commit('getAllPerson', persons)
        commit('setLoading', false)
      },
      signUserUp ({commit, getters}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          commit('clearError')
          const newUser = {
            id: user.uid,
            email: user.email
           }
          commit('setUser', newUser)
        }
        )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
        )
    },
    signUserIn ( {commit, getters}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            email: user.email
           }
          commit('setUser', newUser)
          commit('setLoading', false)
        })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    clearError ( {commit} ) {
      commit('clearError')
    },
    autoSignIn({commit}, payload) {
    commit ('setUser', { 
      id: payload.uid,
      email: payload.email
    })
  },
  logout({commit}){
    firebase.auth().signOut()
    commit('setUser', null)
  }
  }
})
