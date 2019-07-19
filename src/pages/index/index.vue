<template>
    <div class="index">
        <div class="index-modal">
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
                            <p>雇佣矿工需要消耗等值500USDT MGS,激活 需要215 USDTLME 。</p>
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
                        <router-link class="index-modal-btn" to="">购买并激活</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
    .index {
        position: relative;
        width: 100vw;
        height: 100vh;
        background: url('../../assets/images/bg.gif') no-repeat center / 100% 100%;
        &-modal {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 2rem .25rem 2.3rem;
            background: rgba(0, 0, 0, .7);
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
            .cat {
                position: absolute;
                top: -1.3rem;
                left: 2.56rem;
                width: 1.58rem;
                height: 2.08rem;
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
    }
</style>
