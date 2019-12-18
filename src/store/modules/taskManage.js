import { add } from '@/api/taskManage'
import router, { resetRouter } from '@/router'


const state = {
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const actions = {
  // user login
  add({ commit }, userInfo) {
    const { name, region } = userInfo
    return new Promise((resolve, reject) => {
      add({ name: name, remark: region }).then(response => {
        const { data } = response
        console.log('请求成功222')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

}

export default {
  namespaced: true,
  state,
  actions
}

