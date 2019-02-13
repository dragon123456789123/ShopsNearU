<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <v-btn @click="navigateTo({name: 'root'})" flat dark>
        ShopsNearU
      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items >
      <v-btn @click="navigateTo({name: 'login'})"
            flat dark>
        Log In
      </v-btn>

      <v-btn @click="navigateTo({name: 'register'})"
              flat dark>
         Sign Up
      </v-btn>

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    methods:{
      navigateTo (route){
        this.$router.push(route)
      }
    }
  }
</script>

<style scoped>
  .home {
    cursor: pointer;
  }
  .home:hover {
    color: #E9E;
  }
</style>
