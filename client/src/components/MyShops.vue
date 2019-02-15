<template>
    <v-layout>
        <v-flex>
            <panel title="MyShops">
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
                                            <v-btn class="btn btn-danger pull-right" @click="remove(shop._id)">Remove</v-btn>
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
  import UserService from '@/services/UserService'
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

    async mounted () {
      //request to back end
      this.shops = (await UserService.index({
        userId: this.$store.state.token
      })).data
    },
    methods : {
      async remove (shopId) {
        try {
          await UserService.remove({
            shopId,
            userId: this.$store.state.token
          })
        } catch (error) {
          this.error = error.response.data.error;
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
