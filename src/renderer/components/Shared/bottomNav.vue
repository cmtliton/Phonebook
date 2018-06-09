<template>
  <v-footer class="pa-2" fixed>
    <v-layout justify-center>
      <span class="mx-0">
      <signin v-show="!userIsAuthenticated"></signin>
      <signup v-show="!userIsAuthenticated"></signup>
      <app-new-contact v-show="userIsAuthenticated"></app-new-contact>
      <app-settings-phonebook></app-settings-phonebook>
      <v-btn flat icon @click="onLogout" v-show="userIsAuthenticated"><v-icon color="teal">exit_to_app</v-icon></v-btn>
    </span>
    </v-layout>
  </v-footer>
</template>
<script>
  export default {
    computed: {
      userIsAuthenticated () {
      return this.$store.getters.user
    }
  },
  methods: {
    onLogout () {
        this.$store.dispatch('logout')
        this.$store.dispatch('getAllPerson')
      }
  }
  }
</script>