<template>
    <div class="index">
        <!-- 购买窗口 -->
        <div class="index-modal index-mask" v-if="tipsShow">
            <div class="index-modal-container">
                <img class="cat" src="../../assets/images/cat.png" />
                <div class="index-modal-ct">
                    <img class="pic1" src="../../assets/images/index-pic-1.png" />
                    <img class="pic2" src="../../assets/images/index-pic-2.png" />
                    <p class="title">欢迎来到龙猫矿场</p>
                    <ul class="index-modal-list">
                        <li class="index-modal-item">
                            <span class="label"></span>
                            <p>需要雇佣矿工，才能开始挖矿，雇佣时限为10个月。</p>
                        </li>
                        <li class="index-modal-item">
                            <span class="label"></span>
                            <p>雇佣矿工需要消耗等值{{ltcPrice.buyPriceRMB}} {{ltcPrice.buyCoinName}},激活 需要{{ltcPrice.activePriceRMB}} {{ltcPrice.activeCoinName}} 。</p>
                        </li>
                        <li class="index-modal-item">
                            <span class="label"></span>
                            <p>消耗的红宝石将回归于权煜基金会，LME将直接销毁。</p>
                        </li>
                        <li class="index-modal-item">
                            <span class="label"></span>
                            <p>最终解释权归权煜基金会所有。</p>
                        </li>
                    </ul>
                    <!-- 购买激活按钮 -->
                    <div class="index-modal-box">
                        <img class="pic3" src="../../assets/images/index-pic-3.png" />
                        <div class="index-modal-btn" @click="buy">购买并激活</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 支付密码 -->
        <div class="index-psd index-mask" v-if="psdShow">
            <div class="index-psd-wrap">
                <img class="cat" src="../../assets/images/cat.png" />
                <div class="index-psd-box">
                    <p class="title">请输入支付密码</p>
                    <p class="total">共需支付<span>{{ltcPrice.buyPrice}}{{ltcPrice.buyCoinName}},{{ltcPrice.activePrice}}{{ltcPrice.activeCoinName}}</span></p>
                    <password-box @getPwd="getPwd" />
                    <p class="forget" @click="showTips">忘记密码</p>
                </div>
            </div>
        </div>
        <!-- 矿机购买成功 -->
        <div class="index-success index-mask" v-if="successShow">
            <div class="index-success-wrap">
                <img class="cat" src="../../assets/images/cat.png" />
                <div class="index-success-box">
                    <span class="bg"></span>
                    <p class="title">恭喜您购买激活成功!</p>
                    <p class="sub-title">体验龙猫矿场财富累积不是梦</p>
                    <img src="../../assets/images/cat-success.png" />
                    <router-link class="go-btn" to="/home">去挖矿</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PasswordBox from './passwordBox.vue'
import MD5 from 'blueimp-md5'
export default {
    components: {
        PasswordBox
    },
    data(){
        return{
            tipsShow: true,
            psdShow: false,
            successShow: false,
            ltcPrice: {}
        }
    },
    created () {
        this.getLtcPrice()
        document.addEventListener('click', this.clickHandler)
    },
    methods: {
        clickHandler (event) {
            if (event.target.className.indexOf('index-mask') !== -1) {
                this.$router.push('/home')
            }
        },
        // 忘记密码提示
        showTips () {
            this.Toast({
                message: '请到我的->设置中修改'
            })
        },
        // 获取矿机卖价
        getLtcPrice () {
            this.Ajax.getLtcPrice()
                .then(res => {
                    if (res.code === '0000') {
                        this.ltcPrice = res.data
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        // 购买并激活
        buy () {
            this.tipsShow = false
            this.psdShow = true
            this.successShow = false
        },
        // 输入支付密码后拿到支付凭证
        getPwd (psd) {
            console.log(psd);
            this.Ajax.checkUserPayPassword({
                payPassword: MD5(psd)
            }).then(res => {
                console.log(res)
                if (res.code === '0000') {
                    this.pay(res.data.payCertificate)
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
        pay (payCertificate) {
            this.Ajax.buyLtc({
                buyPrice: this.ltcPrice.buyPrice,
                activePrice: this.ltcPrice.activePrice,
                payTimestamps: new Date().getTime(),
                payCertificate: payCertificate,
            }).then(res => {
                if (res.code === '0000') {
                    this.tipsShow = false
                    this.psdShow = false
                    this.successShow = true
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
        }
    },
    destroyed () {
        document.removeEventListener('click', this.clickHandler)
    }
}
</script>
<style lang="scss" scoped>
    .index {
        position: relative;
        width: 100vw;
        height: 100vh;
        background: url('../../assets/images/bg.gif') no-repeat center / 100% 100%;
        .cat {
            position: absolute;
            top: -1.3rem;
            left: 50%;
            width: 1.58rem;
            height: 2.08rem;
            transform: translateX(-50%);
        }
        &-mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0 .25rem;
            background: rgba(0, 0, 0, .7);
        }
        &-modal {
            padding: 2rem .25rem 2.3rem;
            &-container {
                position: relative;
                padding: .15rem;
                width: 100%;
                height: 100%;
                background: $bg03;
                border-radius: .2rem;
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
                color: $fc01;
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
                background: $bg03;
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
                color: $fc01;
            }
            .total {
                margin: .8rem 0 .84rem;
                font-size: $f30;
                color: $fc06;
                span {
                    color: $fc01;
                }
            }
            .forget {
                margin-top: .6rem;
                font-size: $f28;
                color: $fc07;
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
                color: $fc01;
            }
            .sub-title {
                position: relative;
                z-index: 9;
                margin-bottom: .24rem;
                font-size: $f28;
                color: $fc01;
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
                background: $bg03;
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
