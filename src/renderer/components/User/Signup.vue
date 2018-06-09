<template>
  <v-dialog v-model="Signupdialog" max-width="500px">
   <v-btn slot="activator" icon class="mx-0">
    <v-icon color="teal">person_add</v-icon>
     </v-btn>
  <v-layout row v-if="error">
    <v-flex xs12 sm12>
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </v-flex>
  </v-layout>

  <v-layout row>
    <v-flex xs12 sm12>
      <v-card>
        <v-card-text>
          <v-container>
            <form @submit.prevent="onSignup">
            <v-layout row>
                <v-flex xs12 sm12>
                <v-text-field
                   name="email"
                   label="Mail"
                   id="email"
                   v-model="userblank.email"
                   type="email" required></v-text-field>
                  </v-flex>
                </v-layout>
              
              <v-layout row>
                <v-flex xs12 sm12>
                <v-text-field
                   name="password"
                   label="Password"
                   id="password"
                   v-model="userblank.password"
                   type="password"
                   required></v-text-field>
                  </v-flex>
                </v-layout>
              
              <v-layout row>
                <v-flex xs12 sm12>
                <v-text-field
                   name="confirmPassword"
                   label="Confirm Password"
                   id="confirmPassword"
                   v-model="userblank.confirmPassword"
                   type="password" :rules="[comparePassword]"></v-text-field>
                  </v-flex>
                </v-layout>
              <v-layout row>
                <v-flex xs12 sm12>
                  <v-card-actions>
                    <v-btn type="submit" :disabled="loading" :loading="loading">
                  Sign Up
                  <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
                </v-btn>
                </v-card-actions>
              </v-flex>
                </v-layout>
              
            </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        Signupdialog: false,
        userblank: {
          email: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    computed: {
      comparePassword () {
        return this.userblank.password !== this.userblank.confirmPassword ? 'Passwords do not match' : 'Passwords matched'
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.userblank.email, password: this.userblank.password})
         setTimeout(() => {
          if(!this.error) {
          this.Signupdialog = false
          }
         },2000)
      },
      onDismissed () {
        this.$store.dispatch('clearError')
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