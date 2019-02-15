import Api from '@/services/Api'

export default {
  index(userId) {
    return Api().post('myshops', userId)
  },
  remove(shop) {
    return Api().post('shops', shop)
  }
}