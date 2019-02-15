import Api from '@/services/Api'

export default {
  index () {
    return Api().get('shops')
  },
  like (shop) {
    return Api().post('shops', shop)
  },
  dislike (shop) {
    return Api().post('shops', shop)
  },
  remove (shop) {
    return Api().post('shops', shop)
  }
}