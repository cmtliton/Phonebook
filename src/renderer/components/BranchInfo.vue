<template>
  <v-data-table
  v-model="selected"
  :headers="headers"
  :items="persons"
  :rows-per-page-items= "[7,10,25,50,{'text':'All','value':-1}]"
  :pagination.sync="pagination"
  select-all
  item-key="BRNAM"
  :loading="loading"
  :search="search"
  class="elevation-1">

  <template slot="headers" slot-scope="props">
  	<tr>
  		<th>
  			<v-checkbox
  			 :input-value="props.all"
             :indeterminate="props.indeterminate"
             primary
             hide-details
             @click.native="toggleAll"></v-checkbox>
  		</th>
  		<th
          v-for="header in props.headers"
          :key="header.text"
          :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
          @click="changeSort(header.value)"
        >
          <v-icon small>arrow_upward</v-icon>
          {{ header.text }}
        </th>
  	</tr>
  </template>
  <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
  
  <!-- Table Data -->
  <template slot="items" slot-scope="props">
  	<tr :active="props.selected" @click="props.selected = !props.selected">
        <td>
          <v-checkbox
            :input-value="props.selected"
            primary
            hide-details></v-checkbox>
        </td>
      <td>{{ props.item.BRNAM | charfilter}}</td>
      <td class="text-xs-left">{{ props.item.DSTNAM | charfilter}}</td>
      <td class="text-xs-left">{{ props.item.TELNO | charfilter}}</td>
      <td class="text-xs-left">{{ props.item.MOBNO | charfilter}}</td>
      <td class="justify-center layout px-0">
      <app-branch-details-dialog :item="props.item"></app-branch-details-dialog>
      <app-update-contact :item="props.item" v-if="props.item.CREATORID === userIsCreator"></app-update-contact>
    </td>
  </tr>
     </template>
     <!-- Nothing to display -->
	<v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
     </v-alert>
</v-data-table>
</template>

<script>
export default {
  props: ['search'],
  data () {
    return {
      creatorId: '',
      pagination: {
      sortBy: 'BRNAM'
    },
    selected: []
	}
  },
  computed: {
    headers () {
      return this.$store.getters.headers
    },
    persons () {
      return this.$store.getters.persons
    },
    loading () {
    	return this.$store.getters.loading
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
    userIsCreator () {
      if(!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id
    }
  },
  methods: {
  	toggleAll () {
        if (this.selected.length) this.selected = []
        	else this.selected = this.persons.slice()
      },
  	changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  }
  }
  </script> 
