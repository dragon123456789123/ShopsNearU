<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <v-btn @click="navigateTo({name: 'shops'})" flat dark>
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
             @click="navigateTo({name:'my-shops'})"
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
      async logout() {
        //set user data to null
        this.store = await this.$store.dispatch('setUser', null)
        this.store = await this.$store.dispatch('setToken', null)
        //redirect to main page
        await this.$router.push({
          name: 'shops'
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
