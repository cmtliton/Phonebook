<template>
  <v-dialog v-model="PhonebookSettings" max-width="350px">
   <v-btn slot="activator" icon class="mx-0">
    <v-icon color="teal">settings</v-icon>
     </v-btn>
    <v-flex xs12 sm12>
      <v-card>
        <v-layout>
        <v-card-text>
            <h1>PBL Phonebook</h1>
            <h4>v{{currentVersion}}</h4>
            <v-divider></v-divider>
          </v-card-text>
        </v-layout>
        <v-layout row wrap>
          <v-card-title>
            <v-btn @click="loadUpdate" :loading="loadingUpdates"
            v-if="!newVersionAvailable">
               <span v-if="!loadingUpdates">Check updates</span>
                <span v-else
                slot="loader" class="custom-loader"><v-icon light>cached</v-icon></span>
            </v-btn>
            <v-btn 
            class="info"
            @click="open('https://github.com/pblinfo/Phonebook/releases/latest')"
            v-if="newVersionAvailable">
            New version available
          </v-btn>
            <v-divider></v-divider>
          </v-card-title>
          <v-card-actions>
            <v-btn @click="PhonebookSettings = false">Close</v-btn>
          </v-card-actions>
        </v-layout>
        </v-card>
      </v-flex>
</v-dialog>
</template>

<script>
import { version } from './../../../../package.json'
import axios from 'axios'
  export default {
    data () {
      return {
        PhonebookSettings: false,
        currentVersion: version,
        newVersionAvailable: false,
        loadingUpdates: false
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
     open (link) {
        this.$electron.shell.openExternal(link)
      },
      loadUpdate () {
        this.loadingUpdates = true
        axios.get('https://api.github.com/repos/pblinfo/Phonebook/releases/latest')
        .then(({data}) => {
            if (`v${version}` === data.tag_name) {
              alert('You have the latest version of Phonebook')
              this.loadingUpdates = false
            } else {
              this.newVersionAvailable = true
            }
          })
        .catch(() => {
            this.loadingUpdates = false
          })
      }
  }
}
</script>

<style scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>