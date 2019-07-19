import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import Ajax from './service/axios'
import Toast from './components/toast'
import './components'
import './utils/scale_750'
import './assets/styles/layout.scss'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.Ajax = Ajax
Vue.use(Toast)

router.beforeEach((to, from, next) => {
  let nodeList = document.querySelectorAll('.mask')
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].click()
  }
  if (to.query.code) {
    axios({
      method: 'post',
      url: '/api/',
      params: {
        mediaType:"h5",
        sign:"",
        method:"getUserOpenid",
        hasToken:"0",
        code:to.query.code
      }
    }).then(res => {
      console.log(res);
      if (res.data.code=='1')
      {
        axios({
          method: 'post',
          url: '/api/',
          params: {
            mediaType:"h5",
            sign:"",
            method:"openidLogin",
            hasToken:"0",
            openid:res.data.data,
            nickName:"",
            headIcon:"",
          }
        }).then(res => {
          console.log(res)
          if (res.data.code == '1') {
             localStorage.setItem('candytoken',res.data.data.token);
             next()
          }
        }).catch(err => {
          console.log(err)
        })
        // console.log('userOpenid:'+res.data);
        //用户编号
      }
    }).catch(err => {
      console.log(err)
    });
  } else {
    if (to.query.token) {
      localStorage.setItem('candytoken', to.query.token)
    }
    if (!to.path.match(/login/g)) {
      if (localStorage.getItem('candytoken')) {
        next()
      } else {
        next({path: '/login'})
      }
    } else {
      next()
    }
  }


  
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
