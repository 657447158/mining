<template>
    <div class="bg">
        <div class="bg-wrap">
            <img class="bg-icon1" src="../../assets/images/home-icon-bg2.png" />
            <!-- <img class="bg-icon2" src="../../assets/images/story-icon-1.png" /> -->
            <img class="bg-icon3" src="../../assets/images/index-pic-1.png" />
            <!-- <img class="bg-icon4" src="../../assets/images/story-icon-2.png" /> -->
            <div class="bg-ct">
                <p class="title">宝石矿场</p>
                <p class="p">宝石矿场是龙猫星球上的矿场之一,龙猫星球是区块链星际联盟的星球之一，宝石矿场蕴含着丰富的红宝石MGS,红宝石具有非常高的实际价值也是龙猫星球流通的货币之一，这里生活着大量的龙猫矿工,矿工们日以继夜的勤奋的采集着矿场的红宝石，想在宝石矿场采集红宝石，必须雇佣 龙猫矿工为你服务。
</p>
                <p class="p">宝石矿场拥有 1万 名创始矿工</p>
                <p class="p">为了保持矿场持久化运营，矿场产出红宝石总量，将每日减产。</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .bg {
        padding: .77rem .4rem 1.12rem;
        width: 100vw;
        height: 100vh;
        background: url('../../assets/images/bg.jpg') no-repeat center / 100% 100%;
        &-wrap {
            position: relative;
            width: 100%;
            height: 100%;
            border: .16rem solid #FECB2E;
            background: $bg01;
        }
        &-icon1 {
            position: absolute;
            top: -.74rem;
            left: 50%;
            width: 1.45rem;
            height: 1.45rem;
            transform: translateX(-50%);
        }
        &-icon2 {
            position: absolute;
            top: .33rem;
            right: -.4rem;
            width: 1.52rem;
            height: 1.26rem;
        }
        &-icon3 {
            position: absolute;
            left: -.3rem;
            bottom: -.8rem;
            width: 2.21rem;
            height: 1.78rem;
        }
        &-icon4 {
            position: absolute;
            right: -.4rem;
            bottom: 0;
            width: 2.2rem;
            height: 1.79rem;
        }
        .title {
            margin: 1.17rem 0 .53rem;
            font-size: $f36;
            color: $fc01;
            text-align: center;
        }
        .p {
            margin-bottom: .65rem;
            padding: 0 .3rem;
            font-size: $f28;
            color: $fc02;
            line-height: .48rem;
        }
    }
</style>
