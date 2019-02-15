<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <v-btn @click="navigateTo({name: 'root'})" flat dark>
        ShopsNearU
      </v-btn>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn @click="navigateTo({name: 'shops'})"
             flat
             dark>
        Browse
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn"
             @click="navigateTo({name: 'login'})"
             flat
             dark>
        Log In
      </v-btn>

      <v-btn v-if="!$store.state.isUserLoggedIn"
             @click="navigateTo({name: 'register'})"
             flat
             dark>
         Sign Up
      </v-btn>

      <v-btn v-if="$store.state.isUserLoggedIn"
             @click="logout()"
             flat
             dark>
        Log Out
      </v-btn>

      <v-btn v-if="$store.state.isUserLoggedIn"
             @click="navigateTo({name:'myshops'})"
             flat
             dark>
        MyShops
      </v-btn>

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      },
      logout() {
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setToken', null)
        this.$router.push({
          name: 'songs'
        })
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
