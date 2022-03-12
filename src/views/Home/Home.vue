<template>
  <div>
    <!-- 三级联动 -->
    <TypeNav></TypeNav>
    <!-- 轮播 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐 -->
    <Recommend></Recommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <Like></Like>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    <!-- 拆分组件 -->
    <Brand></Brand>

  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer/ListContainer.vue'
import Recommend from '@/views/Home/Recommend/Recommend.vue'
import Rank from '@/views/Home/Rank/Rank.vue'
import Like from '@/views/Home/Like/Like.vue'
import Floor from '@/views/Home/Floor/Floor.vue'
import Brand from '@/views/Home/Brand/Brand.vue'
import { mapState } from 'vuex'
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  mounted () {
    this.$store.dispatch('getFloorList')

    // // 点击登录之后，派发action获取用户的信息
    // this.$store.dispatch('getUserInfo')
  }
}
</script>

<style>

</style>
