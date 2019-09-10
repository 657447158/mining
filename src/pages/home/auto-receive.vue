<template>
    <div class="home-modal home-mask" v-if="show" @click="hide">
        <div class="home-modal-container">
            <img class="cat" src="../../assets/images/cat.png" />
            <div class="home-modal-ct">
                <p class="title">矿机自动收取</p>
                <div class="slider-wrap">
                    <span class="silder-title">矿机自动收取</span>
                    <div class="slider-box">
                        <span
                            class="slider"
                            :class="{active: active}"
                            @click="changeTab"
                        ></span>
                        <span class="label">{{text}}</span>
                    </div>
                </div>
                <div class="text-box">
                    <p>矿机自动收取打开，将收取手续费，文案文案，文案文案，文案文案，文案文案，文案，文案文案，文案！文案。</p>
                </div>
            </div>
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
                active: false
            }
        },
        computed: {
            text () {
                return this.active ? '开启' : '关闭'
            }
        },
        created () {
            this.ltcAutoDetail()
        },
        methods: {
            hide (e) {
                if (!e.target.className.includes('home-mask')) return
                this.$emit('hide')
            },
            // 获取当前处于何种状态
            ltcAutoDetail () {
                this.Ajax.ltcAutoDetail()
                    .then(res => {
                        if (res.success) {
                            this.active = res.data.userAutoFlag
                        }
                    })
                    .catch(err => {
                        console.log('err', err);
                    })
            },
            changeTab () {
                this.Ajax.switchAutoFlag()
                    .then(res => {
                        if (res.success) {
                            this.active = !this.active
                        }
                    })
                    .catch(err => {
                        console.log('err', err);
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
            padding: .15rem;
            width: 7rem;
            height: 6.32rem;
            background: $bg03;
            border-radius: .2rem;
            transform: translate(-50%, -50%);
        }
        &-ct {
            position: relative;
            z-index: 99;
            padding: 1rem .75rem 0 .7rem;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            background: $bg01;
            border-radius: .2rem;
        }
        .title {
            margin-bottom: .48rem;
            font-size: $f40;
            color: #FF6B00;
            text-align: center;
        }
        .slider-wrap {
            margin-bottom: .78rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .slider-box {
            display: flex;
            align-items: center;
        }
        .slider {
            position: relative;
            margin-right: .2rem;
            width: .68rem;
            height: .42rem;
            border: 1px solid #E5E5E5;
            border-radius: .21rem;
            background: $bg01;
            &.active {
                background: #4BD863;
                &::after {
                    left: .26rem;
                }
            }
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: .4rem;
                height: .4rem;
                border-radius: 50%;
                background: $bg01;
                box-shadow: 0 0 .1rem rgba(0, 0, 0, .2);
                transition: all .1s linear;
            }
        }
        .silder-title {
            font-size: $f30;
            color: $fc02;
        }
        .text-box {
            position: relative;
            line-height: 1.5;
            &::before {
                content: '';
                position: absolute;
                left: -.25rem;
                top: .1rem;
                display: block;
                width: .14rem;
                height: .14rem;
                background: #FF6B00;
            }
        }
    }
}
</style>