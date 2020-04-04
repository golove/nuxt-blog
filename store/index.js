
export const state = () => ({
  user: {},
})

export const mutations = {

  //user login 
  USERLOGIN(state, user) {
    state.user = user;
    //save login infomations
    window.sessionStorage.setItem('user', JSON.stringify(user))
  },
  //user exit
  USEREXIT(state) {
    state.user = {};
    window.sessionStorage.removeItem('user');
  },

}


export const actions = {

  // user login
  userlogin({
    commit
  }, data) {
    commit('USERLOGIN', data);
  },
  // user exit
  userexit({
    commit
  }, data) {
    commit('USEREXIT');
  },

}