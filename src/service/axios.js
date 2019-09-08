import axios from 'axios'
import Toast from '@/components/toast'
let baseURL = ''

// 设置token
// axios.defaults.headers.token = localStorage.getItem('ltctoken')
axios.defaults.headers.token = '%2FnuxJczgzyI6fNXbnZwxtOAbo0y%2FA3tPu4jPWQhNCwhZNLx6qL508JhW49lxqCXW.TEU89gEa8POXZdTinC4wyLM05bZf6%2BunhbvQp7o5uHVfHeId5i%2FNdMMJyx8CPdAVTwbgWmQdTaub%0AkSZTV8YaR5GkeGruB0NHSzeZv8%2FKa8O6W95%2Fyjv9tznNWiHSQ%2BhJ'

export default function ajax (p) {
    let options = Object.assign({
        baseURL: baseURL,
        type: 'POST',
        url: '',
        loading: true,
        params: {}
    }, p)
    return new Promise((resolve, reject) => {
        let t
        let timer
        if (timer) {
            clearTimeout(timer)
        }
        if (options.loading) {
            t = Toast({
                show: true,
                type: 'loading',
                duration: 1000000
            })
        }
        axios({
            method: options.type,
            baseURL: '/ltc',
            url: options.url,
            params: options.params
        }).then(response => {
            if (options.loading) {
                t.show = false
            }
            resolve(response.data)
        }).catch(error => {
            if (options.loading) {
                t.type = 'error'
                t.message = '服务器错误'
                timer = setTimeout(() => {
                    t.show = false
                }, 1000)
            }
            reject(error)
        })
    })
}