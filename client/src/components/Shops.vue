<template>
    <v-layout row wrap align-center>
        <v-flex>
            <panel title="Shops">
                <div v-for="shop in shops" :key="shop._id">
                    <div class="row" id="shops">
                        <div class="col-sm-6 col-md-4">
                            <div class="thumbnail">
                                <img :src="shop.picture" alt="..." class="img-responsive">
                                <div class="caption">
                                    <h3>{{ shop.name }}</h3>
                                    <div class="clearfix">
                                        <div class="price pull-left">{{ shop.city }}</div>
                                        <a class="btn btn-success pull-right" role="button" action="">Like</a>
                                        <a class="btn btn-danger pull-right" role="button">Dislike</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
      return{
        shops: null,
      }
    },
    async mounted (){
      //request to back end
      this.shops = (await ShopsService.index()).data
      console.log(this.shops)
    }
  }
</script>

<style scoped>

</style>
