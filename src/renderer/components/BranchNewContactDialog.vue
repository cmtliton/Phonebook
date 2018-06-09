<template>
	 <v-dialog v-model="contactdialog" max-width="500px">
       <v-btn slot="activator" icon class="mx-0" @click="contactDetail(item)">
         <v-icon color="teal">create</v-icon>
        </v-btn>
        <form @submit.prevent="onSave">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-divider></v-divider>
        <v-progress-linear slot="progress" color="red" :indeterminate="true"></v-progress-linear>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
            <v-flex xs12 sm6>
                <v-text-field 
                v-model="contactDetails.BRNAM" 
                label="Name"
                :rules="[() => !!contactDetails.BRNAM || 'Name is required']"
                required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field 
                v-model="contactDetails.MOBNO" 
                label="Mobile No."
                :rules="[() => !!contactDetails.MOBNO || 'Mobno is required',
                () => !!contactDetails.MOBNO && contactDetails.MOBNO.length == 11 || 'Mobile No Must be 11 digits', isThereInMobileNo]"
                :error-messages="errorMessages"
                required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field 
                v-model="contactDetails.TELNO"
                :rules="[() => !!contactDetails.TELNO || 'TELNO is required']" 
                label="TEL No."
                required></v-text-field>
              </v-flex>
              <v-text-field
                v-model="contactDetails.EMAIL"
                :rules="[() => !! contactDetails.EMAIL || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ]"
                label="E-mail"
              required></v-text-field>
              <v-flex xs12 sm6>
                <v-text-field 
                v-model="contactDetails.DSTNAM" 
                label="Br/Office"
                :rules="[() => !!contactDetails.DSTNAM || 'This field is required']" 
                required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field 
                v-model="contactDetails.ZNNAM" 
                label="Zone Name"
                :rules="[() => !!contactDetails.ZNNAM || 'This field is required']"
                required></v-text-field>
              </v-flex>
              <v-flex sm12 sm6>
                <v-text-field 
                v-model="contactDetails.ADDR"
                :rules="[!!contactDetails.ADDR && contactDetails.ADDR.length >= 15 || 'Address must be greater than 15 characters']"
                :counter="50" 
                label="Address" 
                required></v-text-field>
              </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
            <v-btn type="submit" color="blue darken-1" flat :disabled="!formIsvalid">Save</v-btn>
          </v-card-actions>
        </v-card>
      </form>
      </v-dialog>
</template>

<script>
import personsRepository from '../../repositories/personsRepository'
export default {
	props: ['item'],
	data () {
		return {
			contactdialog: false,
      		editedIndex: -1,
          errorMessages: [],
			contactDetails: {
				    BRCOD: '',
		        BRNAM: '',
		        MOBNO: '',
		        TELNO: '',
            EMAIL: '',
		        ADDR: '',
		        DSTNAM: '',
		        ZNNAM: ''
			},
			defaultContact: {
		        BRCOD: '',
		        BRNAM: '',
		        MOBNO: '',
		        TELNO: '',
            EMAIL: '',
		        ADDR: '',
		        DSTNAM: '',
		        ZNNAM: ''
      }
		}
	},
	watch: {
      dialog (val) {
        val || this.close()
      }
    },
	computed: {
		formTitle () {
        return this.editedIndex === -1 ? 'New Contact' : 'Contact Details'
      },
      formIsvalid () {
       return this.contactDetails.BRNAM !== '' &&
              this.contactDetails.MOBNO !== '' &&
              this.contactDetails.TELNO !== '' &&
              this.contactDetails.EMAIL !== '' &&
              this.contactDetails.ADDR !== '' &&
              this.contactDetails.DSTNAM !== '' &&
              this.contactDetails.ZNNAM !== '' &&
              this.errorMessages == ''
      }
	},
	methods: {
    isThereInMobileNo () {
      this.errorMessages = personsRepository.existInmobile(this.contactDetails.MOBNO) ? 'Already exists' : [] 
      return true
      },
		contactDetail (item) {
        this.editedIndex = this.$store.getters.persons.indexOf(item)
        this.contactDetails = Object.assign({}, item)
        this.contactdialog = true
      },
    onSave () {
      this.$store.dispatch('personSaving', this.contactDetails)
      this.contactdialog = false
      this.contactDetails.BRNAM = ''
      this.contactDetails.MOBNO = ''
    },
		close () {
        this.contactdialog = false
        setTimeout(() => {
          this.contactDetails = Object.assign({}, this.defaultContact)
          this.editedIndex = -1
        },300)
      }
	}
}
</script>
