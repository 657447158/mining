<template>
    <div class="home">
        <img class="home-cat" src="../../assets/images/home-cat.gif" />
        <!-- 矿工数 -->
        <div class="home-num" @click="showLtcPop">
            <img src="../../assets/images/home-icon-cat.png" />
            <span>X{{detail.ltcNumber || 0}}矿工</span>
        </div>
        <!-- 故事背景、挖矿记录、邀请码、已邀请 -->
        <div class="home-list">
            <router-link class="home-list-item" to="/background">
                <img src="../../assets/images/home-icon-bg.png" />
                <span>故事背景</span>
            </router-link>
            <div class="home-list-item" @click="showPop">
                <img src="../../assets/images/home-icon-record.png" />
                <span>挖矿记录</span>
            </div>
            <div class="home-list-item" @click="showPop">
                <img src="../../assets/images/home-icon-code.png" />
                <span>邀请码</span>
            </div>
            <div class="home-list-item" @click="showInvitedPop">
                <img src="../../assets/images/home-icon-invited.png" />
                <span>已邀请</span>
            </div>
            <!-- 收取关闭 -->
            <div class="home-list-item home-list-item1" @click="showPop">
                <img src="../../assets/images/home-icon-closed.png" />
                <span>收取关闭</span>
            </div>
        </div>
        <!-- 产出矿 -->
        <div class="home-bar" @click="receiveOre">
            <p
                v-for="item in detail.userOreList"
                :key="item.coinName"
            >
                <span>{{item.coinName}}</span>
                <span>{{item.readyAmount}}</span>
            </p>
            <!-- <span>{{detail.orePercentage || 0}}%</span> -->
        </div>
        <!-- 绑定邀请码-弹窗 -->
        <code-box :show="showCodeBox" @confirm="codeConfirm" />
        <!-- 购买矿机-弹窗 -->
        <buy-box :show="showBuyBox" :canHide="canHide" @changeHideFlag="changeHideFlag" @hide="hideByBox" />
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
        <!-- 已邀请记录 -->
        <otc-modal :show="showInvited" @hide="hide">
            <div class="record-wrap">
                <img class="record-wrap-logo" src="../../assets/images/home-icon-invited2.png" />
                <div class="record-wrap-top">
                    <span>已邀请</span>
                    <img class="close" src="../../assets/images/home-icon-close.png" @click="hide" />
                </div>
                <div class="record-wrap-tab">
                    <span>用户名</span>
                    <span>矿机数量（台）</span>
                    <span>邀请时间</span>
                </div>
                <ul class="record-wrap-list">
                    <li
                        class="record-wrap-item"
                        v-for="item in invitationList"
                        :key="item.id"
                    >
                        <div class="avator">
                            <img :src="item.headImage" />
                            <div>
                                <span class="name">{{item.nickName}}</span>
                                <span>{{item.mobile}}</span>
                            </div>
                        </div>
                        <span class="num">{{item.friendLtcCount}}</span>
                        <p class="date">{{item.createDate}}</p>
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
import CodeBox from './code-box';
import BuyBox from './buy-box';
export default {
    components: {
        CodeBox,
        BuyBox
    },
    data () {
        return {
            detail: {},
            // 挖矿记录
            show: false,
            list: [],
            // 邀请记录
            showInvited: false,
            invitationList: [],
            // 验证码弹窗
            userInvitationFlag: true,
            showCodeBox: false,
            // 购买矿机弹窗
            userLtcFlag: true,
            showBuyBox: false,
            canHide: true
        }
    },
    created () {
        this.checkUserLtc()
        this.ltcDetail()
        this.ltcOreRecord()
        this.getUserInvitationList()
    },
    methods: {
        /**
         * 第一步 获取用户是否具有邀请码
         * 第二步 获取用户是否购买了矿机
         */
        checkUserLtc () {
            this.Ajax.checkUserLtc()
                .then(res => {
                    if (!res.success) {
                        this.Toast({
                            type: 'error',
                            message: res.message
                        })
                        return
                    }
                    this.userInvitationFlag = res.data.userInvitationFlag
                    this.userLtcFlag = res.data.userLtcFlag
                    if (this.userInvitationFlag && this.userLtcFlag) {
                        return
                    }
                    if (!this.userInvitationFlag) {
                        // 没有邀请码,弹出邀请码窗口
                        this.showCodeBox = true
                        return
                    }
                    if (!this.userLtcFlag) {
                        // 没有购买矿机，弹出购买矿机窗口
                        this.showLtcPop()
                        this.canHide = false
                    }
                })
                .catch(err => {
                    console.log('err：' + err);
                })
        },
        // 验证码弹框回调
        codeConfirm () {
            this.showCodeBox = false
            if (!this.userInvitationFlag) {
                this.showLtcPop()
                this.canHide = false
            }
        },
        // 显示购买矿机弹窗
        showLtcPop () {
            this.showBuyBox = true
        },
        // 购买成功后，允许hide操作
        changeHideFlag (val) {
            this.canHide = val
        },
        // 购买矿机回调
        hideByBox () {
            this.showBuyBox = false
        },
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
        // 获取邀请记录
        getUserInvitationList () {
            this.Ajax.getUserInvitationList()
                .then(res => {
                    if (res.success) {
                        this.invitationList = res.data
                    }
                })
                .catch(err => {
                    console.log('err', err);
                })
        },
        // 收取钻石
        receiveOre () {
            this.Ajax.receiveOre()
                .then(res => {
                    if (res.success) {
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
        // 显示挖矿记录
        showPop () {
            if (!this.list.length) {
                this.Toast({
                    message: '暂时没有挖矿记录'
                })
                return
            }
            this.show = true
        },
        // 显示邀请记录
        showInvitedPop () {
            this.showInvited = true
        },
        hide () {
            this.show = false
            this.showInvited = false
            this.showBuyBox = false
        }
    }
}
</script>
<style lang="scss" scoped>
    .home {
        width: 100vw;
        height: 100vh;
        background: url('../../assets/images/bg.jpg') no-repeat center / 100% 100%;
        /deep/ &-mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0 .25rem;
            background: rgba(0, 0, 0, .7);
            .cat {
                position: absolute;
                top: -1.3rem;
                left: 50%;
                width: 1.58rem;
                height: 2.08rem;
                transform: translateX(-50%);
            }
        }
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
            left: .22rem;
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
            top: .76rem;
            right: .3rem;
            bottom: 1.4rem;
            img {
                margin-bottom: .13rem;
                width: 1.04rem;
                height: 1.04rem;
            }
            &-item {
                margin-bottom: .16rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: $f24;
                color: $fc10;
                span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 1.2rem;
                    height: .38rem;
                    color: $fc01;
                    background: $bg01;
                    border-radius: .19rem;
                }
            }
            &-item1 {
                position: absolute;
                bottom: 0;
            }
        }
        &-bar {
            position: absolute;
            left: .45rem;
            bottom: 2.07rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 2.13rem;
            height: 2.13rem;
            color: $fc10;
            font-size: $f24;
            background: url('../../assets/images/home-bar-bg.png') no-repeat center / 100% 100%;
            p {
                margin-bottom: .14rem;
                &:last-child {
                    margin-bottom: 0;
                }
            }
            span {
                margin-right: .06rem;
            }
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
            width: 1.47rem;
            height: 1.53rem;
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
        &-tab {
            padding: .38rem 0 .27rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                width: 33.33%;
                text-align: center;
                color: $fc04;
                font-size: $f24;
            }
        }
        &-list {
            padding: 0 .42rem 0 .28rem;
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
                margin-right: .2rem;
                width: .81rem;
                height: .81rem;
                border-radius: 50%;
            }
            div {
                flex: 1;
                display: flex;
                flex-direction: column;
            }
            .avator {
                flex-direction: row;
                align-items: center;
                font-size: $f24;
                color: $fc04;
                .name {
                    margin-bottom: .12rem;
                    font-size: $f30;
                    color: $fc03;
                }
            }
            .num {
                flex: 1;
                font-size: $f36;
                color: $fc02;
                text-align: center;
            }
            .date {
                font-size: $f22;
                color: $fc04;
            }
        }
    }
</style>

