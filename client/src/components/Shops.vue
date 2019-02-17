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

    /*  methods:{
        async like (){
          await ShopsService.post(this.shop)
        },
        dislike (){
          Shop
        }
      }, */
    async mounted () {
      console.log('nnnnnnnnnnnn')
      //request to back end
      this.shops = (await ShopsService.index({userId: this.$store.state.token})).data
      await this.$getLocation({
        enableHighAccuracy: false, //defaults to false
        timeout: Infinity, //defaults to Infinity
        maximumAge: 0 //defaults to 0
      })
        .then(coordinates => {
          console.log(coordinates.lat)
          for ( var i = 0; i < this.shops.length; i++) {
            console.log(this.shops[i])
            this.shops[i]["distance"] = calculateDistance(coordinates.lat,coordinates.lng,this.shops[i].location.coordinates[1],this.shops[i].location.coordinates[0],"K");
          }
          this.shops.sort(function(a, b) {
            return a.distance - b.distance;
          });
        });
    },

    methods : {
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
      distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
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
