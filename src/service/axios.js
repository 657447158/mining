import axios from 'axios'
import Toast from '@/components/toast'
let baseURL = ''

// 设置token
axios.defaults.headers.token = localStorage.getItem('ltctoken')
// axios.defaults.headers.token = '%2FnuxJczgzyI6fNXbnZwxtFH6Ae6IoJyQGMWNzC8TepjLUTiwfckUacESJIl9ZqMAgIjkZAP44l02%0AIkWBuqck9Q%3D%3D.TEU89gEa8POXZdTinC4wyAGK7nmc3Z%2BsLJcILTlh9LByPfCsOycc8q2QJQA%2F50833mDPWg%2B77973%0ApxRgQVwfeSc9WVHVqgiHM%2B2LYDhTVOoldYhf%2FxB6vPgk7uKpVz8kQt6Cbc5dnI6BrM%2BkYP%2BTvQ%3D%3D'

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