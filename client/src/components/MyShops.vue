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
                                                <div class="price pull-left">City: {{ shop.city }}</div>
                                                <div class="price pull-left">Distance: {{ shop.distance }} Km</div>
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
  import {calculateDistance} from '../Functions/functions.js'

  export default {
    components:{
      Panel
    },
    data () {
      return {
        shops: this.shops,
        key: null
      }
    },

    async mounted () {
      // if(this.$store.state.token==null) {
      //   this.$router.push({
      //     name: 'login'
      //   })
      // }
      //request to back end to get user's shops
      this.shops = (await UserService.index({
        userId: this.$store.state.token
      })).data;
      await this.$getLocation({
        enableHighAccuracy: false, //defaults to false
        timeout: Infinity, //defaults to Infinity
        maximumAge: 0 //defaults to 0
      })
        .then(coordinates => {
          for ( var i = 0; i < this.shops.length; i++) {
            this.shops[i]["distance"] = calculateDistance(coordinates.lat,coordinates.lng,this.shops[i].location.coordinates[1],this.shops[i].location.coordinates[0],"K").toFixed(2);
          }
          this.shops.sort(function(a, b) {
            return a.distance - b.distance;
          });
        });
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
