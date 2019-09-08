import ajax from './axios'
export default {
    /**
     * [获取用户邀请码]
     */
    getUserInvitationCode (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/simple/getUserInvitationCode',
            params: Object.assign({...params})
        })
    },
    /**
     * [检查用户有没有矿机]
     */
    checkUserLtc (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/simple/checkUserLtc',
            params: Object.assign({...params})
        })
    },
    /**
     * [获取矿机卖价]
     */
    getLtcPrice (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/simple/getLtcPrice',
            params: Object.assign({...params})
        })
    },
    /**
     * [购买矿机]
     */
    buyLtc (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/simple/buyLtc',
            params: Object.assign({...params})
        })
    },
    /**
     * [矿机详情]
     */
    ltcDetail (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/simple/ltcDetail',
            params: Object.assign({...params})
        })
    },
    /**
     * [挖矿记录]
     */
    ltcOreRecord (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/simple/ltcOreRecord',
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
    },
    /**
     * [收取矿石]
     */
    receiveOre (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/simple/receiveOre',
            params: Object.assign({...params})
        })
    },
    /**
     * [绑定邀请码]
     */
    bindInvitationCode (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/simple/bindInvitationCode',
            params: Object.assign({...params})
        })
    },
    /**
     * [获取用户邀请列表]
     */
    getUserInvitationList (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/simple/getUserInvitationList',
            params: Object.assign({...params})
        })
    },
    /**
     * [获取矿机奖励币种]
     */
    getLtcCoin (params) {
        return ajax({
            type: 'POST',
            url: '/api/ltc/simple/getLtcCoin',
            params: Object.assign({...params})
        })
    }
}
