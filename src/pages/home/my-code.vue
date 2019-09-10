<template>
    <div class="home-modal home-mask" v-if="show" @click="hide">
        <div class="home-modal-container home-modal-coin">
           <img class="head" :src="codeDetail.headImage" />
           <p class="name">{{codeDetail.nickName}}</p>
           <p>您的邀请码</p>
           <p class="my-code">{{codeDetail.invitationCode}}</p>
           <p
                class="copy-btn"
                v-clipboard:copy="codeDetail.invitationCode"
                v-clipboard:success="onCopy"
            >复制</p>
           <p class="intro">一级邀请人返等值100元LME奖励 二级邀请人返50元LME奖励</p>
           <img class="code" src="../../assets/images/code.png" alt="二维码" />
           <p class="tips">扫码下载LmeToken激活矿机坐等升值</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                codeDetail: {}
            }
        },
        created () {
            this.getUserInvitationCode()
        },
        methods: {
            hide (e) {
                if (!e.target.className.includes('home-mask')) return
                this.$emit('hide')
            },
            // 获取用户二维码
            getUserInvitationCode () {
                this.Ajax.getUserInvitationCode()
                    .then(res => {
                        if (res.success) {
                            this.codeDetail = res.data
                        }
                    })
                    .catch(err => {
                        console.log('err', err)
                    })
            },
            onCopy () {
                this.Toast({
                    message: '复制成功!'
                })
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
            padding: .58rem 0 0 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 6.19rem;
            height: 9.58rem;
            font-size: $f26;
            color: $fc03;
            border-radius: .2rem;
            transform: translate(-50%, -50%);
            background: url('../../assets/images/home-my-code-bg.png') no-repeat center / 100% 100%;
            &::before {
                content: '';
                position: absolute;
                top: 5.74rem;
                left: .53rem;
                display: block;
                width: 5.17rem;
                height: 0;
                border-top: 1px dashed #AAAAAA;
            }
        }
        .head {
            margin-bottom: .12rem;
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 50%;
        }
        .name {
            margin-bottom: .18rem;
            font-size: $f36;
            color: $fc02;
        }
        .my-code {
            margin-top: .1rem;
            font-size: .55rem;
            color: #473D0F;
            font-weight: bold;
        }
        .copy-btn {
            margin-top: .24rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.34rem;
            height: .74rem;
            font-size: $f30;
            color: #1B1703;
            background: #FFD708;
            border-radius: .1rem;
        }
        .intro {
            padding: 0 .75rem 0 .83rem;
            margin-top: .3rem;
            font-size: $f24;
            color: $fc02;
            text-align: center;
            line-height: 2;
        }
        .code {
            margin-top: .7rem;
            width: 2.48rem;
            height: 2.48rem;
        }
        .tips {
            margin-top: .2rem;
            font-size: $f24;
            color: $fc03;
        }
    }
}
</style>