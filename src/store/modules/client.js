import Vue from 'vue'

const namespaced = true

const state = {
  client: {},
  clients: [
    {
      clientNumber: 1,
      clientFirstname: 'John',
      clientLastname: 'Doe',
      clientDateOfAdd: '2021-03-13',
      clientFunction: 'Director',
      clientPhoneNumber: '0604529874',
      clientEmail: 'johndoe@gmail.com',
      clientCompany: 'IFA',
      clientAddress1: '11 rue premiere rue',
      clientAddress2: 'second adresse',
      clientZipCode: '57000',
      clientCity: 'Metz',
      clientCountry: 'France'
    },
    {
      clientNumber: 2,
      clientFirstname: 'Maria',
      clientLastname: 'Doe',
      clientDateOfAdd: '2021-03-13',
      clientFunction: 'Assistant',
      clientPhoneNumber: '0604529874',
      clientEmail: 'mariadoe@gmail.com',
      clientCompany: 'IFA',
      clientAddress1: '11 rue premiere rue',
      clientAddress2: 'second adresse',
      clientZipCode: '57000',
      clientCity: 'Metz',
      clientCountry: 'France'
    },
    {
      clientNumber: 3,
      clientFirstname: 'Jony',
      clientLastname: 'Smith',
      clientDateOfAdd: '2021-03-10',
      clientFunction: 'Manager',
      clientPhoneNumber: '0604529874',
      clientEmail: 'jonysmith@gmail.com',
      clientCompany: 'IFA',
      clientAddress1: '11 rue premiere rue',
      clientAddress2: 'second adresse',
      clientZipCode: '57000',
      clientCity: 'Metz',
      clientCountry: 'France'
    },
  ],
  loading: false
}

const mutations = {
  // met à jour l'état de clientNumber
  UPDATE_CLIENT(state, payload){
    state.client = payload
  },
  UPDATE_CLIENTS(state, payload){
    state.clients = payload
  },
  UPDATE_LOADING(state, payload){
    state.loading = payload
  }
}

const actions = {
  //permet de récupérer la liste des clients
  getClients({commit}) {
    commit('UPDATE_LOADING', true)
    //appel à la BDD (promise) 
    // on utilise return pour utiliser la promesse dans le composant
    return Vue.axios.get('/clients').then((response) => {
      // console.log(response.data)

      // on déclenche la mutation des données une fois le résultat récupéré
      commit('UPDATE_CLIENTS', response.data)
      commit('UPDATE_LOADING', false)
    })
    
  },
  //permet de récupérer les données d'un client en fonction d'un id
  getClient({commit}, id) {
    commit('UPDATE_LOADING', true)
    //appel à la BDD (promise)
    return Vue.axios.get('/clients/'+ id).then((response) => {
      // console.log(response.data)
      // on déclenche la mutation des données une fois le résultat récupéré
      commit('UPDATE_CLIENT', response.data)
      commit('UPDATE_LOADING', false)
    })
  },

  //permet de récupérer les données d'un client en fonction d'un id
  saveClient({commit}, payload) {

    commit('UPDATE_LOADING', true)
    //s'il y a un id, on modifie un client existant
    if (payload._id) {
      //l'id du client qu'on veut enregistrer
      const id = payload._id
      
      return Vue.axios.patch(`/clients/${id}`, payload).then((response) => {
        // on déclenche la mutation des données une fois le résultat récupéré
        commit('UPDATE_CLIENT', response.data)
        commit('UPDATE_LOADING', false)
      })

    //sinon, création d'un nouveau client
    } else {
      return Vue.axios.post(`/clients`, payload).then((response) => {
        // on déclenche la mutation des données une fois le résultat récupéré
        commit('UPDATE_CLIENT', response.data)
        commit('UPDATE_LOADING', false)
      })
    }
  },

  deleteClient({commit}, id){
    commit('UPDATE_LOADING', true)
    //appel à la BDD (promise)
    
    return Vue.axios.delete('/clients/'+ id).then((response) => {
      
      console.log(response.data)
      commit('UPDATE_LOADING', false)
    })
  }
}

// les getters sont comme des computed values pour le store.state
const getters = {
  getTwoLatestClients: (state) => {
    return state.clients.slice(0, 1)
  }
}


export {
  namespaced,
  state,
  mutations,
  actions,
  getters
}