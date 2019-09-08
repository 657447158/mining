import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import Ajax from './service'
import Toast from './components/toast'
import axios from 'axios'
import './components'
import './utils/scale_750'
import './assets/styles/layout.scss'
Vue.config.productionTip = false
Vue.prototype.Ajax = Ajax
Vue.use(Toast)

// let checkUserLtc = (next) => {
//   axios({
//     method: 'post',
//     url: '/ltc/api/ltc/simple/checkUserLtc'
//   }).then(res => {
//     if (res.data.code === '0000' && res.data.success) {
//       next()
//     } else if (res.data.code === '0000' && !res.data.success) {
//       next('/index')
//     } else {
//       next()
//     }
//   }).catch(err => {
//     console.log(err);
//   })
// }

router.beforeEach((to, from, next) => {
  let nodeList = document.querySelectorAll('.mask')
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].click()
  }
  if (to.query.param) {
    axios({
      method: 'post',
      url: '/wallet/api/otc/immediately/getWebToken',
      params: {
        param: to.query.param,
      }
    }).then(res => {
      console.log(res);
      if (res.data.success == true) {
        localStorage.setItem("ltctoken", res.data.data)
        axios.defaults.headers.token = localStorage.getItem('ltctoken')
        next()
      }
    }).catch(err =>{
      console.log('fail' + err)
      next()
    })
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
