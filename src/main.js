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

let checkUserLtc = (next) => {
  axios({
    method: 'post',
    url: '/ltc/api/ltc/checkUserLtc'
  }).then(res => {
    if (res.data.code === '0000' && res.data.success) {
      next()
    } else if (res.data.code === '0000' && !res.data.success) {
      next('/index')
    } else {
      next()
    }
  }).catch(err => {
    console.log(err);
  })
}

router.beforeEach((to, from, next) => {
  let nodeList = document.querySelectorAll('.mask')
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].click()
  }
  if (to.query.token) {
    axios({
      method: 'post',
      url: '/ltc/index/',
      params: {
        method: '/wallet/switchTokenForOtc',
        mediaType: 'h5',
        token: to.query.token,
        sign: '',
        hasToken: '1'
      }
    }).then(res => {
      if (res.data.code === '1') {
        localStorage.setItem("ltctoken", res.data.data)
        if (to.name === 'home') {
          checkUserLtc(next)
        }
      }
    }).catch(err =>{
      console.log('fail' + err)
    })
  } else if (to.name === 'home') {
    checkUserLtc(next)
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
