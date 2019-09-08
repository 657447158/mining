<template>
    <div class="home-code home-mask" v-if="show">
        <div class="home-code-wrap">
            <img class="cat" src="../../assets/images/cat.png" />
            <div class="home-code-box">
                <p class="title">绑定邀请码</p>
                <div class="input-box">
                    <input type="text" placeholder="请填写邀请码" v-model="code" />
                </div>
                <p class="confirm" @click="confirm">确定</p>
            </div>
        </div>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                code: ''
            }
        },
        methods: {
            confirm () {
                if (!this.code) {
                    this.Toast({
                        message: '请输入验证码!'
                    })
                    return
                }
                this.Ajax.bindInvitationCode({
                    invitationCode: this.code
                }).then(res => {
                    if (res.success) {
                        this.Toast({
                            type: 'sucess',
                            message: '绑定成功!'
                        })
                        setTimeout(() => {
                            this.$emit('confirm')
                        }, 2000)
                    } else {
                        this.Toast({
                            type: 'error',
                            message: res.message
                        })
                        this.code = ''
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .home {
        &-code {
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
                padding: 1rem .48rem 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                height: 100%;
                background: $bg01;
            }
            .title {
                position: relative;
                z-index: 9;
                margin-bottom: .7rem;
                font-size: $f40;
                color: #FF6B00;
            }
            .input-box {
                margin-bottom: 1rem;
                padding: 0 .3rem;
                width: 100%;
                height: 1.06rem;
                background: #F0F0F0;
            }
            input {
                width: 100%;
                height: 1.06rem;
                font-size: $f30;
            }
            .confirm {
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
                &::before {
                    content: '';
                    position: absolute;
                    bottom: -.07rem;
                    left: -.81rem;
                    display: block;
                    width: 1.47rem;
                    height: 1.35rem;
                    background: url('../../assets/images/index-pic-3.png') no-repeat center / 100% 100%;
                }
                &:active {
                    opacity: .8;
                }
            }
        }
    }
</style>