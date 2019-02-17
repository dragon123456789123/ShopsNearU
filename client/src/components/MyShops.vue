<template>
    <v-layout>
        <v-flex>
            <panel title="MyShops">
                <div v-if="shops===null">
                    <v-flex>
                        <div>No Shops Liked</div>
                    </v-flex>
                </div>
                <div v-else>
                    <div v-for="shop in shops" :key="shop._id">
                        <v-flex xs4 id="shop">
                            <div class="row" id="shops">
                                <div class="col-md-4 col-centered">
                                    <div class="thumbnail">
                                        <img :src="shop.picture" alt="..." class="img-responsive">
                                        <div class="caption">
                                            <h3>{{ shop.name }}</h3>
                                            <div class="clearfix">
                                                <div class="price pull-left">{{ shop.city }}</div>
                                                <v-btn class="btn btn-danger pull-right" @click="remove(shop._id, key)">Remove</v-btn>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-flex>
                    </div>
                </div>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
  import UserService from '@/services/UserService'
  import Panel from '@/components/Panel'
  export default {
    components:{
      Panel
    },
    data () {
      return {
        shops: this.shops,
      }
    },

    async mounted () {
      console.log(this.$store.state.token)
      // if(this.$store.state.token==null) {
      //   this.$router.push({
      //     name: 'login'
      //   })
      // }
      //request to back end to get user's shops
      this.shops = (await UserService.index({
        userId: this.$store.state.token
      })).data
      console.log(this.shops)
    },

    //remove method
    methods : {
      async remove (shopId, key) {
        try {
          await UserService.remove({
            shopId,
            userId: this.$store.state.token
          })
          this.shops.splice(key, 1)
        } catch (error) {
          console.log(error);
        }
      },
    }
  }
</script>

<style scoped>
    #shop{
        float: left;
        margin: 10px;
    }
</style>
