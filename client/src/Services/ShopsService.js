import Api from '@/services/Api'

export default {
  index () {
    return Api().get('shops')
  },
  like (shop) {
    return Api().post('like-shops', shop)
  },
  dislike (shop) {
    return Api().delete('shops/', shop)
  },

}