<template>
	 <v-dialog v-model="dialog" max-width="500px">
       <v-btn slot="activator" icon class="mx-0" @click="contactDetail(item)">
            <v-icon color="teal" small>pageview</v-icon>
         </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
            <v-flex>
                <table>
                  <tr>
                    <th class="text-lg-right text-md-right text-sm-right">BRANCH: </th>
                    <td>{{contactDetails.BRNAM | charfilter}}</td>
                  </tr>
                  <tr>
                    <th class="text-lg-right text-md-right text-sm-right">DISTRICT: </th>
                    <td>{{contactDetails.DSTNAM | charfilter}}</td>
                  </tr>
                  <tr>
                    <th class="text-lg-right text-md-right text-sm-right">ZONE: </th>
                    <td>{{contactDetails.ZNNAM | charfilter}}</td>
                  </tr>
                  <tr v-show="contactDetails.TELNO">
                    <th class="text-lg-right text-md-right text-sm-right">TEL: </th>
                    <td>{{contactDetails.TELNO | charfilter}}</td>
                  </tr>
                  <tr v-show="contactDetails.MOBNO">
                    <th class="text-lg-right text-md-right text-sm-right">MOBILE: </th>
                    <td>{{contactDetails.MOBNO | charfilter}}</td>
                  </tr>
                  <tr v-show="contactDetails.EMAIL">
                    <th class="text-lg-right text-md-right text-sm-right">EMAIL: </th>
                    <td>{{contactDetails.EMAIL}}</td>
                  </tr>
                  <tr>
                    <th class="text-lg-right text-md-right text-sm-right">ADDRESS: </th>
                    <td>{{contactDetails.ADDR | charfilter}}</td>
                  </tr>
                </table>
              </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
	props: ['item'],
	data () {
		return {
			dialog: false,
      		viewIndex: -1,
			contactDetails: {
				BRCOD: '',
		        BRNAM: '',
		        MOBNO: '',
		        TELNO: '',
		        ADDR: '',
		        DSTNAM: '',
		        ZNNAM: ''
			},
			defaultPerson: {
		        BRCOD: '',
		        BRNAM: '',
		        MOBNO: '',
		        TELNO: '',
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
        return this.viewIndex === -1 ? 'New Contact' : 'Contact Details'
      }
	},
	methods: {
		contactDetail (item) {
        this.viewIndex = this.$store.getters.persons.indexOf(item)
        this.contactDetails = Object.assign({}, item)
        this.dialog = true
      },
		close () {
        this.dialog = false
        setTimeout(() => {
          this.contactDetails = Object.assign({}, this.defaultPerson)
          this.viewIndex = -1
        }, 300)
        // this.initialize()
      },
	}
}
</script>
