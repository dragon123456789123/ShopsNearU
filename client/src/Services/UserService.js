import Api from '@/services/Api'

export default {
  index(userId) {
    return Api().post('my-shops', userId)
  },
  remove (shop) {
    return Api().post('remove-shops', shop)
  }
}