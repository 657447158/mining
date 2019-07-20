import ajax from './axios'
export default {
    /**
     * [检查用户有没有矿机]
     */
    checkUserLtc (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/checkUserLtc',
            params: Object.assign({...params})
        })
    },
    /**
     * [获取矿机卖价]
     */
    getLtcPrice (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/getLtcPrice',
            params: Object.assign({...params})
        })
    },
    /**
     * [购买矿机]
     */
    buyLtc (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/buyLtc',
            params: Object.assign({...params})
        })
    },
    /**
     * [矿机详情]
     */
    ltcDetail (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/ltcDetail',
            params: Object.assign({...params})
        })
    },
    /**
     * [挖矿记录]
     */
    ltcOreRecord (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/ltcOreRecord',
            params: Object.assign({...params})
        })
    },
    /**
     * [支付-输入支付密码后拿到支付凭证]
     */
    checkUserPayPassword (params) {
        return ajax({
            type: 'POST',
            url: '/app/pay/checkUserPayPassword',
            params: Object.assign({...params})
        })
    }
}
