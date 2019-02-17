<template>
    <v-layout>
        <v-flex>
            <panel title="Shops">
                <div v-for="shop in shops" :key="shop._id">
                    <v-flex xs4 id="shop">
                        <div class="row" id="shops">
                            <div class="col-md-4 col-centered">
                                <div class="thumbnail">
                                    <img :src="shop.picture" alt="..." class="img-responsive">
                                    <div class="caption">
                                        <h3>{{ shop.name }}</h3>
                                        <div class="clearfix">
                                            <div class="price pull-left">City: {{ shop.city }} </div>
                                            <div class="price pull-left">Distance: {{ shop.distance.toFixed(2) }} Km</div>
                                            <v-btn class="btn btn-success pull-right" @click="like(shop._id, key)">Like</v-btn>
                                            <v-btn class="btn btn-danger pull-right" @click="dislike(shop._id, key)">Dislike</v-btn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-flex>
                </div>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
  import ShopsService from '@/services/ShopsService'
  import Panel from '@/components/Panel'
  import {calculateDistance} from '../Functions/functions.js'

  export default {
    components:{
      Panel
    },
    data () {
      return {
        shops: null,
      }
    },

    async mounted () {
      //request to back end
      this.shops = (await ShopsService.index({userId: this.$store.state.token})).data
      await this.$getLocation({
        enableHighAccuracy: false, //defaults to false
        timeout: Infinity, //defaults to Infinity
        maximumAge: 0 //defaults to 0
      })
        .then(coordinates => {
          for ( var i = 0; i < this.shops.length; i++) {
            this.shops[i]["distance"] = calculateDistance(coordinates.lat,coordinates.lng,this.shops[i].location.coordinates[1],this.shops[i].location.coordinates[0],"K");
          }
          this.shops.sort(function(a, b) {
            return a.distance - b.distance;
          });
        });
    },

    methods : {
      //like method
      async like (shopId, key) {
        try {
            if(this.$store.state.token==null){
              await this.$router.push({
                name: 'login'
              })
            }
            else {
              await ShopsService.like({
                shopId,
                userId: this.$store.state.token
              })
              this.shops.splice(key, 1)
            }
        } catch (error) {
          console.log(error);
        }
      },

      //dislike method
      async dislike (shopId, key){
          try{
            if(this.$store.state.token==null){
              await this.$router.push({
                name: 'login'
              })
            }
            else {
              await ShopsService.dislike({
                shopId,
                userId: this.$store.state.token
              })
              this.shops.splice(key, 1)
            }
          }catch (e) {
              console.log(e)
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
