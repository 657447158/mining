<template>
    <div class="home">
        <img class="home-cat" src="../../assets/images/home-cat.gif" />
        <!-- 矿工数 -->
        <router-link class="home-num" to="/index">
            <img src="../../assets/images/home-icon-cat.png" />
            <span>X{{detail.ltcNumber || 1}}矿工</span>
        </router-link>
        <!-- 故事背景、挖矿记录 -->
        <div class="home-list">
            <router-link class="home-list-item" to="/background">
                <img src="../../assets/images/home-icon-bg.png" />
                <span>故事背景</span>
            </router-link>
            <div class="home-list-item" @click="showPop">
                <img src="../../assets/images/home-icon-record.png" />
                <span>挖矿记录</span>
            </div>
        </div>
        <!-- 进度条 -->
        <div class="home-bar" :style="`--per: ${detail.orePercentage}%`">
            <span>{{detail.orePercentage}}%</span>
        </div>
        <!-- 砖石矿 -->
        <div class="home-diamond" v-if="detail.readyAmount" @click="receiveOre">{{detail.readyAmount}}</div>
        <!-- 挖矿记录弹窗 -->
        <otc-modal :show="show" @hide="hide">
            <div class="record-wrap">
                <img class="record-wrap-logo" src="../../assets/images/home-icon-record2.png" />
                <div class="record-wrap-top">
                    <span>挖矿记录</span>
                    <img class="close" src="../../assets/images/home-icon-close.png" @click="hide" />
                </div>
                <ul class="record-wrap-list">
                    <li
                        class="record-wrap-item"
                        v-for="item in list"
                        :key="item.id"
                    >
                        <img src="../../assets/images/home-record-photo.png" />
                        <div>
                            <span class="p1">挖矿收取</span>
                            <span class="p2">{{item.receiveDate}}</span>
                        </div>
                        <p>+{{item.oreAmount}} {{item.coinName}}</p>
                    </li>
                </ul>
            </div>
        </otc-modal>
        <!-- 收取钻石音效 -->
        <audio
			src="http://appimage.lmetoken.cn/video/5293.mp3"
			preload
			ref="music"
			controls
			style="opacity: 0"
		></audio>
    </div>
</template>
<script>
export default {
    data () {
        return {
            detail: {},
            show: false,
            list: []
        }
    },
    created () {
        this.ltcDetail()
        this.ltcOreRecord()
    },
    methods: {
        ltcDetail () {
            this.Ajax.ltcDetail()
                .then(res => {
                    if (res.code === '0000') {
                        this.detail = res.data
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        // 获取挖矿记录
        ltcOreRecord () {
            this.Ajax.ltcOreRecord()
                .then(res => {
                    this.list = res.data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        // 收取钻石
        receiveOre () {
            this.Ajax.receiveOre()
                .then(res => {
                    if (res.code === '0000') {
                        this.$refs.music.play()
                    } else {
                        this.Toast({
                            type: 'error',
                            message: res.message
                        })
                    }
                })
                .catch(err => {
                    this.Toast({
                        type: 'error',
                        message: err
                    })
                })
        },
        showPop () {
            this.show = true
        },
        hide () {
            this.show = false
        }
    }
}
</script>
<style lang="scss" scoped>
    .home {
        width: 100vw;
        height: 100vh;
        background: url('../../assets/images/bg.gif') no-repeat center / 100% 100%;
        &-cat {
            position: absolute;
            bottom: 1.38rem;
            right: .35rem;
            width: 4.42rem;
            height: 5.26rem;
        }
        &-num {
            position: absolute;
            top: .67rem;
            left:  .22rem;
            padding-left: 1rem;
            width: 2.58rem;
            height: .88rem;
            border-radius: .44rem;
            background: rgba(255, 255, 255, .8);
            img {
                position: absolute;
                bottom: 0;
                left: 0.05rem;
                width: .84rem;
                height: .84rem;
            }
            span {
                font-size: $f36;
                color: $fc01;
                line-height: .88rem;
            }
        }
        &-list {
            position: absolute;
            top: .63rem;
            right: .32rem;
            img {
                margin-bottom: .13rem;
                width: 1.04rem;
                height: 1.04rem;
            }
            &-item {
                margin-bottom: .16rem;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                font-size: $f30;
                color: $fc10;
            }
        }
        &-bar {
            position: absolute;
            left: .75rem;
            bottom: 1.7rem;
            width: 2rem;
            height: .3rem;
            color: $fc01;
            font-size: $f24;
            background: $bg01;
            border-radius: .15rem;
            border: 2px solid $bor01;
            box-sizing: content-box;
            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: var(--per);
                height: .3rem;
                text-align: right;
                background: $bg04;
                border-radius: .15rem;
            }
            span {
                padding-left: .2rem;
                position: relative;
                z-index: 9;
            }
        }
        &-diamond {
            position: absolute;
            left: .9rem;
            bottom: 3.7rem;
            padding-top: .55rem;
            display: flex;
            justify-content: center;
            width: 1.58rem;
            height: 1.49rem;
            font-size: $f22;
            color: $fc10;
            background: url('../../assets/images/home-icon-diamond.png') no-repeat center / 100% 100%;
            animation: scale 2s linear infinite;
        }
    }
    /deep/ .otc-modal-content {
        background: none;
        overflow: visible;
    }
    .record-wrap {
        position: relative;
        max-height: 9.38rem;
        background: $bg01;
        border-top-left-radius: .35rem;
        border-top-right-radius: .35rem;
        &-logo {
            position: absolute;
            top: 0;
            left: 50%;
            width: 1.43rem;
            height: 1.51rem;
            transform: translate(-50%, -50%);
        }
        &-top {
            padding: 0 .3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 1.33rem;
            font-size: $f30;
            color: $fc02;
            border-bottom: 1px solid #EDEDED;
            .close {
                width: .44rem;
                height: .44rem;
            }
        }
        &-list {
            padding: 0 .75rem 0 .08rem;
            max-height: 8.05rem;
            overflow: auto;
        }
        &-item {
            padding: .4rem 0 .26rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: $f30;
            color: $fc02;
            border-bottom: 1px solid #F9F9FA;
            img {
                margin-right: .23rem;
                width: 1.07rem;
                height: 1.08rem;
            }
            div {
                flex: 1;
                display: flex;
                flex-direction: column;
            }
            .p1 {
                margin-bottom: .3rem;

            }
            .p2 {
                font-size: $f24;
                color: $fc04;
            }
        }
    }
    @keyframes scale {
        0% {
            transform: scale(.95)
        }
        50% {
            transform: scale(1)
        }
        100% {
            transform: scale(.95)
        }
    }
</style>

