<template>
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
</template>
<script>

</script>
<style lang="scss" scoped>

</style>