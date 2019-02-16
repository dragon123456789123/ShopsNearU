import Api from '@/services/Api'

export default {
  index (userId) {
    return Api().post('shops', userId)
  },
  like (shop) {
    return Api().post('like-shops', shop)
  },
  dislike (shop) {
    return Api().post('dislike-shops', shop)
  },

}