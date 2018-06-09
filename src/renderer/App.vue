<template>
<v-app id="inspire">
<v-container class="mx-0">
<v-card>
<v-card-title xs12>
<img src="./assets/banner_new.jpg" height="65px">
<v-spacer></v-spacer>
	<v-text-field
	append-icon="search"
	label="Search"
	single-line
	hide-details                                                  
	v-model="search"
	></v-text-field>
</v-card-title>
</v-card>
<!-- Data Table	 -->
<BranchInfo :search="search"></BranchInfo>
 <app-bottomNav></app-bottomNav>
 </v-container>
</v-app>
</template>

<script>
export default {
	data () {
		return {
			search: ''
		}
	}
  }
  </script>  

<style>
  @import "~material-design-icons-iconfont/dist/material-design-icons.css";
</style>
