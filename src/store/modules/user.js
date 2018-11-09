import Cookie from 'js-cookie'

const user = {
  state: {
    lockPasswd: Cookie.get('lockPasswd')
  },
  mutations: {
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd
      Cookie.set('lockPasswd', lockPasswd)
    }
  },
  actions: {

  }
}

export default user
