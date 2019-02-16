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
                                            <div class="price pull-left">{{ shop.city }}</div>
                                            <v-btn class="btn btn-success pull-right" @click="like(shop._id)">Like</v-btn>
                                            <v-btn class="btn btn-danger pull-right" @click="dislike(shop._id)">Dislike</v-btn>
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
      //request to back end
      this.shops = (await ShopsService.index()).data
    },

    methods : {
      async like (shopId) {
        try {
            await ShopsService.like({
              shopId,
              userId: this.$store.state.token
            })
        } catch (error) {
          console.log(error);
        }
      },
        async dislike (shopId){
          try{
            await ShopsService.dislike({
              shopId,
              userId: this.$store.state.token
            })
          }catch (e) {
              console.log(e)
          }
        }
    }
  }
</script>

<style scoped>
    #shop{
        float: left;
        margin: 10px;
    }

</style>
