<template>
  <!-- template du composant (HTML) -->
  <b-container id="app">
    <b-row>
      <b-col>
        <h3><i class="fas fa-angle-down text-muted mr-2" />{{ form._id ? 'Editer':'Ajouter' }} un client</h3>
        <hr />
      </b-col>
    </b-row>

    <b-card class="shadow p-3" v-if="form.clientNumber">      
      <strong>Contact</strong> <hr>
      <b-row>
        <b-form-group
          id="fieldset-firstname"
          label-cols-md="3"
          content-cols-md="8"
          label="Prénom:"
          label-for="firstname"
        >
          <b-form-input id="firstname" v-model="form.clientFirstname"></b-form-input>
        </b-form-group>

        <b-form-group
          id="fieldset-lastname"
          label-cols-md="3"
          content-cols-md="8"
          label="Nom:"
          label-for="lastname"
        >
          <b-form-input id="lastname" v-model="form.clientLastname"></b-form-input>
        </b-form-group>

        <b-form-group
          id="fieldset-formdate"
          label="Date d'ajout:"
          label-cols-lg="4"
          content-cols-lg="8"
          label-for="formdate"
        >
          <b-form-datepicker 
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            id="formdate"
            :disabled="disabled"
            v-model="form.clientDateOfAdd" />
        </b-form-group>          
      </b-row>
      <b-row>
        <b-form-group
          id="fieldset-function"
          label-cols-md="4"
          content-cols-md="7"
          label="Fonction:"
          label-for="function"
        >
          <b-form-input id="function" v-model="form.clientFunction"></b-form-input>
        </b-form-group>

        <b-form-group
          id="fieldset-phonenumber"
          label-cols-md="4"
          content-cols-md="8"
          label="Téléphone:"
          label-for="phonenumber"
        >
          <b-form-input id="phonenumber" v-model="form.clientPhoneNumber"></b-form-input>
        </b-form-group>                  
      </b-row>
      <b-col lg="8">
        <b-form-group
          id="fieldset-email"
          label-cols-md="2"
          content-cols-md="10"
          label="Email:"
          label-for="email"
        >
          <b-form-input id="email" v-model="form.clientEmail"></b-form-input>
        </b-form-group> 
      </b-col>
      <b-col lg="8">
        <b-form-group
          id="fieldset-company"
          label-cols-md="2"
          content-cols-md="10"
          label="Entreprise:"
          label-for="company"
        >
          <b-form-input id="company" v-model="form.clientCompany"></b-form-input>
        </b-form-group>                
      </b-col>
      <strong>Coordonnées</strong> <hr>
      <b-col lg="8">
        <b-form-group
          id="fieldset-address1"
          label-cols-md="2"
          content-cols-md="10"
          label="Adresse1:"
          label-for="address1"
        >
          <b-form-input id="address1" v-model="form.clientAddress1"></b-form-input>
        </b-form-group>                
      </b-col>
      <b-col lg="8">
        <b-form-group
          id="fieldset-address2"
          label-cols-md="2"
          content-cols-md="10"
          label="Adresse2:"
          label-for="address2"
        >
          <b-form-input id="address2" v-model="form.clientAddress2"></b-form-input>
        </b-form-group>                
      </b-col>
      <b-row>
        <b-form-group
          id="fieldset-zipcode"
          label-cols-md="3"
          content-cols-md="7"
          label="Code Postal:"
          label-for="zipcode"
        >
          <b-form-input id="zipcode" v-model="form.clientZipCode"></b-form-input>
        </b-form-group> 
        <b-form-group
          id="fieldset-city"
          label-cols-md="3"
          content-cols-md="9"
          label="Ville:"
          label-for="city"
        >
          <b-form-input id="city" v-model="form.clientCity"></b-form-input>
        </b-form-group>                
      </b-row>
      <b-row>
        <b-form-group
          id="fieldset-country"
          label-cols-md="3"
          content-cols-md="9"
          label="Pays:"
          label-for="country"
        >
          <b-form-input id="country" v-model="form.clientCountry"></b-form-input>
        </b-form-group>                
      </b-row>
      
      <hr>

      <b-row>
        <b-col>
          <b-button variant="danger" @click="onDeleteClient()">Supprimer</b-button>
        </b-col>
        <b-col class="text-right">
          <b-button variant="primary" @click="onSaveClient()">Enregister</b-button>
        </b-col>
      </b-row>

    </b-card>

    <b-form-checkbox class="my-4" v-model="debug" name="debug" switch>Debug</b-form-checkbox>

    <pre v-if="debug" class="debug card border-primary bg-dark text-light p-4">
      Form: {{ form }}
      Client (du store): {{ client }}
      </pre>

  </b-container>

</template>


<script>

import { mapState, mapActions } from 'vuex'

// const newClient = {  
//   clientNumber: 1,
//   clientFirstname: 'Doe',
//   clientLastname: 'John',
//   clientDateOfAdd: '2020-03-02',
//   clientFunction: 'john function',
//   clientPhoneNumber: '0585648594',
//   clientEmail: 'jdoe@gmail.com',
//   clientCompany: 'ifa',
//   clientAddress1: 'My first address',
//   clientAddress2: 'my second address',
//   clientZipCode: '54000',
//   clientCity: 'Nancy',
//   clientCountry: 'France',
//   }

const newClient = {  
  clientNumber: '0',
  clientFirstname: '',
  clientLastname: '',
  clientDateOfAdd: new Date,
  clientFunction: '',
  clientPhoneNumber: '',
  clientEmail: '',
  clientCompany: '',
  clientAddress1: '',
  clientAddress2: '',
  clientZipCode: '',
  clientCity: '',
  clientCountry: '',
  }

// controleur du composant
export default {
  name: 'EditClient',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  //data dans un composant Vue doit être une fonction qui retourne un objet
  data() {
    return {
      debug: true,
      form: {}
    }
  },
  computed: {
    ...mapState({
      client: state => state.client.client
    }),

  },
  methods: {
    // mapActions permet d'accéder directement aux actions du store depluis un composant
    //map this.getClient(data) avec this.$store.dispatch('client/getClient', data)
    ...mapActions('client', ['getClient', 'saveClient', 'deleteClient']),
    
    

    onDeleteClient(){

      // on appelle la méthode du store (grâce à mapActions)
      //on pourrait également appeler this.$store.dispatch('client/deleteClient', this.form.id)
      this.deleteClient(this.form._id) //_id retourné par mongodb
      
      //une fois la donnée enregistrée dans le store 
      //je redirige l'utilisateur vers la liste avec le router
      this.$router.push({ name: 'clients' })
    },

    onSaveClient(){
      
      // on appelle la méthode du store (grâce à mapActions)
      //on pourrait également appeler this.$store.dispatch('client/saveClient', this.form)
      this.saveClient( this.form ).then(()=> {
        //une fois la donnée enregistrée dans le store 
        //je redirige l'utilisateur vers la liste avec le router
        this.$router.push({ name: 'clients' })  
      })

    }
  },
  created() {
    //se déclenche à l'instantiation du composant
    //en fait dès qu'on arrive sur la route editclient
    if(!this.id || this.id == 0 || this.id == -1) {
      this.form = { ...newClient }
    } else {
      this.getClient(this.id).then(()=>{
        this.form = this.client
      })
    }
  }
}
</script>
