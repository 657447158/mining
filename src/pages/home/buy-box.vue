<template>
    <div>
        <!-- 购买提示弹窗 -->
        <div class="home-modal home-mask" v-if="show" @click="hide">
            <div class="home-modal-container">
                <img class="cat" src="../../assets/images/cat.png" />
                <div class="home-modal-ct">
                    <img class="pic1" src="../../assets/images/index-pic-1.png" />
                    <img class="pic2" src="../../assets/images/index-pic-2.png" />
                    <p class="title">欢迎来到龙猫矿场</p>
                    <ul class="home-modal-list">
                        <li class="home-modal-item">
                            <span class="label"></span>
                            <p>需要雇佣矿工，才能开始挖矿，雇佣时限为10个月。
                            </p>
                        </li>
                        <li class="home-modal-item">
                            <span class="label"></span>
                            <p>雇佣矿工需要消耗等值{{ltcPrice.buyPriceRMB}} {{ltcPrice.buyCoinName}},激活 需要{{ltcPrice.activePriceRMB}} {{ltcPrice.activeCoinName}} 。</p>
                        </li>
                        <li class="home-modal-item">
                            <span class="label"></span>
                            <p>消耗的红宝石将回归于权煜基金会，LME将直接销毁。</p>
                        </li>
                        <li class="home-modal-item">
                            <span class="label"></span>
                            <p>最终解释权归权煜基金会所有。</p>
                        </li>
                    </ul>
                    <!-- 购买激活按钮 -->
                    <div class="home-modal-box">
                        <img class="pic3" src="../../assets/images/index-pic-3.png" />
                        <div class="home-modal-btn" @click="buy">购买并激活</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 币种选择弹窗 -->
        <div class="home-modal home-mask" v-if="showCoin" @click="hide">
            <div class="home-modal-container home-modal-coin">
                <img class="cat" src="../../assets/images/cat.png" />
                <div class="home-modal-ct">
                    <img class="pic1" src="../../assets/images/index-pic-1.png" />
                    <img class="pic2" src="../../assets/images/index-pic-2.png" />
                    <p class="title">选择挖矿产出币种</p>
                    <ul class="home-modal-list">
                        <li
                            class="home-modal-item"
                            v-for="(item, index) in coinList"
                            :key="index"
                        >
                            <span class="img-box"><img :src="item.coinImage" /></span>
                            <span class="name">{{item.coinName}}</span>
                            <span
                                class="radio"
                                :class="{active: coinSelectedIndex === index}"
                                @click="chooseCoin(index)"
                            ></span>
                        </li>
                    </ul>
                    <!-- 购买激活按钮 -->
                    <div class="home-modal-box">
                        <img class="pic3" src="../../assets/images/index-pic-3.png" />
                        <div class="home-modal-btn" @click="confirmCoin">确定</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 密码输入弹窗 -->
        <div class="home-psd home-mask" v-if="showPsd" @click="hide">
            <div class="home-psd-wrap">
                <img class="cat" src="../../assets/images/cat.png" />
                <div class="home-psd-box">
                    <p class="title">请输入支付密码</p>
                    <p class="total">共需支付<span>{{ltcPrice.buyPrice}}{{ltcPrice.buyCoinName}},{{ltcPrice.activePrice}}{{ltcPrice.activeCoinName}}</span></p>
                    <password-box @getPwd="getPwd" />
                    <p class="forget" @click="showTips">忘记密码</p>
                </div>
            </div>
        </div>
        <!-- 矿机购买成功 -->
        <div class="home-success home-mask" v-if="showSuccess" @click="hide">
            <div class="home-success-wrap">
                <img class="cat" src="../../assets/images/cat.png" />
                <div class="home-success-box">
                    <span class="bg"></span>
                    <p class="title">恭喜您购买激活成功!</p>
                    <p class="sub-title">体验龙猫矿场财富累积不是梦</p>
                    <img src="../../assets/images/cat-success.png" />
                    <p class="go-btn" @click="hide">去挖矿</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MD5 from 'blueimp-md5'
    import PasswordBox from '../../widget/passwordBox'
    export default {
        components: {
            PasswordBox
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            canHide: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                showPsd: false,
                showCoin: false,
                coinSelectedIndex: 0,
                coinList: [],
                ltcPrice: {},
                showSuccess: false
            }
        },
        created () {
            this.getLtcPrice()
            this.getLtcCoin()
        },
        methods: {
            // 获取矿机卖价
            getLtcPrice () {
                this.Ajax.getLtcPrice()
                    .then(res => {
                        if (res.success) {
                            this.ltcPrice = res.data
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            // 获取币种
            getLtcCoin () {
                this.Ajax.getLtcCoin()
                    .then(res => {
                        if (res.success) {
                            this.coinList = res.data
                        }
                    })
                    .catch(err => {
                        console.log('err', err);
                    })
            },
            // 选择币种
            chooseCoin (index) {
                this.coinSelectedIndex = index
            },
            // 购买并激活
            buy () {
                this.$emit('hide')
                this.showCoin = true
            },
            // 确认选择币种
            confirmCoin () {
                this.showCoin = false
                this.showPsd = true
            },
            // 输入支付密码后拿到支付凭证
            getPwd (psd) {
                this.Ajax.checkUserPayPassword({
                    payPassword: MD5(psd)
                }).then(res => {
                    if (res.code === '0000') {
                        this.pay(res.data.payCertificate, res.data.payTimestamps)
                    } else {
                        this.Toast({
                            type: 'error',
                            message: res.message
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 支付购买
            pay (payCertificate, payTimestamps) {
                this.Ajax.buyLtc({
                    buyPrice: this.ltcPrice.buyPrice,
                    activePrice: this.ltcPrice.activePrice,
                    payTimestamps: payTimestamps,
                    payCertificate: payCertificate,
                    ltcCoinId: this.coinList[this.coinSelectedIndex].coinId
                }).then(res => {
                    if (res.success) {
                        this.$emit('changeHideFlag', true)
                        this.showCoin = false
                        this.showPsd = false
                        this.showSuccess = true
                    } else {
                        this.Toast({
                            type: 'error',
                            message: res.message
                        })
                    }
                }).catch(err => {
                    this.Toast({
                        type: 'error',
                        message: err
                    })
                })
            },
            // 忘记密码提示
            showTips () {
                this.Toast({
                    message: '请到我的->设置中修改'
                })
            },
            hide (e) {
                if (!e.target.className.includes('home-mask') && !e.target.className.includes('go-btn')) return
                if (!this.canHide) return
                this.$emit('hide')
                this.showCoin = false
                this.showPsd = false
                this.showSuccess = false
            }
        }
    }
</script>
<style lang="scss" scoped>
.home {
    &-modal {
        padding: 2rem .25rem 2.3rem;
        &-container {
            position: absolute;
            top: 50%;
            left: 50%;
            padding: .15rem;
            width: 7rem;
            height: 9.05rem;
            background: $bg03;
            border-radius: .2rem;
            transform: translate(-50%, -50%);
        }
        &-coin {
            height: 7.82rem;
            .home-modal-ct {
                padding: 1.23rem .4rem 0 .42rem;
            }
            .home-modal-list {
                padding: 0 .3rem;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
            .home-modal-item {
                display: flex;
                align-items: center;
                width: 50%;
                &:nth-child(even) {
                    justify-content: flex-end;
                }
            }
            .img-box {
                margin-right: .2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                border: 1px solid #A0A0A0;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .name {
                margin-right: .2rem;
                font-size: $f30;
                color: $fc02;
            }
            .radio {
                width: .48rem;
                height: .48rem;
                border-radius: 50%;
                border: 1px solid #A0A0A0;
                &.active {
                    border: none;
                    background: url('../../assets/images/coin-checked.png') no-repeat center / 100% 100%;
                }
            }
            .home-modal-box {
                position: absolute;
                margin-top: 0;
                bottom: 1.43rem;
            }
        }
        &-ct {
            position: relative;
            z-index: 99;
            padding: 1.23rem .7rem 0 .42rem;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            background: $bg01;
            border-radius: .2rem;
        }
        .pic1 {
            position: absolute;
            top: -.52rem;
            left: -.1rem;
            width: 2.21rem;
            height: 1.78rem;
        }
        .pic2 {
            position: absolute;
            top: .28rem;
            right: 1.02rem;
            width: .9rem;
            height: .98rem;
        }
        .title {
            margin-bottom: .45rem;
            font-size: $f36;
            color: #FF6B00;
            text-align: center;
        }
        &-item {
            margin-bottom: .3rem;
            display: flex;
            p {
                flex: 1;
                font-size: $f28;
                color: $fc03;
                line-height: .4rem;
            }
        }
        .label {
            margin: .12rem .3rem 0 0;
            line-height: .4rem;
            width: .18rem;
            height: .18rem;
            background: $bg03;
        }
        &-box {
            position: relative;
            margin-top: 1rem;
        }
        .pic3 {
            position: absolute;
            left: 0.18rem;
            top: -.28rem;
            z-index: 99;
            width: 1.56rem;
            height: 1.4rem;
        }
        &-btn {
            margin-left: .99rem;
            display: block;
            width: 4.18rem;
            height: 1rem;
            color: $fc10;
            text-align: center;
            line-height: 1rem;
            font-size: $f30;
            background: #FFA700;
            border-radius: .5rem;
            &:active {
                opacity: .8;
            }
        }
    }
    /* 密码框 */
    &-psd {
        &-wrap {
            position: absolute;
            top: 50%;
            left: 50%;
            padding: .15rem;
            width: 7rem;
            height: 6.32rem;
            background: $bg03;
            border-radius: .2rem;
            transform: translate(-50%, -50%);
        }
        &-box {
            position: relative;
            z-index: 9;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 100%;
            background: $bg01;
            border-radius: .2rem;
        }
        .title {
            margin-top: 1rem;
            font-size: $f40;
            color: #FF6B00;
        }
        .total {
            margin: .8rem 0 .84rem;
            font-size: $f30;
            color: $fc06;
            span {
                color: #FF6B00;
            }
        }
        .forget {
            margin-top: .6rem;
            font-size: $f28;
            color: #FF6B00;
        }
    }
    /* 购买成功 */
    &-success {
        &-wrap {
            position: absolute;
            top: 50%;
            left: 50%;
            padding: .15rem;
            width: 7rem;
            height: 6.32rem;
            background: $bg03;
            border-radius: .2rem;
            transform: translate(-50%, -50%);
        }
        &-box {
            position: relative;
            z-index: 9;
            padding-top: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 100%;
            background: $bg01;
            .bg {
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -2.985rem 0 0 -3.352rem;
                display: block;
                width: 6.71rem;
                height: 5.97rem;
                border-radius: .2rem;
                background: url('../../assets/images/success-bg.png') no-repeat center / 4.67rem 4.67rem;
                animation: rotate 12s linear infinite;
            }
        }
        .title {
            position: relative;
            z-index: 9;
            margin-bottom: .29rem;
            font-size: $f40;
            color: #FF6B00;
        }
        .sub-title {
            position: relative;
            z-index: 9;
            margin-bottom: .24rem;
            font-size: $f28;
            color: #FF6B00;
        }
        img {
            position: relative;
            z-index: 9;
            margin-bottom: .44rem;
            width: 1.52rem;
            height: 1.97rem;
        }
        .go-btn {
            position: relative;
            z-index: 9;
            width: 4.19rem;
            height: 1rem;
            color: $fc10;
            text-align: center;
            line-height: 1rem;
            font-size: $f30;
            border-radius: .5rem;
            background: #FFA700;
            &:active {
                opacity: .8;
            }
        }
    }
}
@keyframes rotate {
    from {
        transform: rotate(0)
    }
    to {
        transform: rotate(360deg)
    }
}
</style>