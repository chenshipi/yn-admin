import fetch from '@/service/fetch'

export default {
  login: data => {
    return fetch({
      url: '/api/permisson/getRoleList',
      // method: 'post',
      data
    })
  },
  logout: data => {
    return fetch({
      baseURL: '/adminTest',
      url: '/api/permisson/getRoleList',
      // method: 'post',
      data
    })
  }
}
