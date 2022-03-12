<template>
  <div>
    <div class="swiper-container" ref="floor1Swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(carousel) in list"
          :key="carousel.id"
        >
          <img :src="carousel.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'carsousel',
  props: ['list'],
  watch: {
    list: {
      // 立即监听 immediate:true不管数据是否发生变化，上来立即执行一次
      // 父组件传递的数据，没有发生变化
      immediate: true,
      handler (newval, oldval) {
        // 只能监听到数据已经有了，但是还是不能确定v-for是否已经执行完了
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            // 自动播放,默认是三秒
            // autoplay: true,
            autoplay: {
              // 设置时间
              delay: 1500,
              stopOnLastSlide: false,
              disableOnInteraction: true
            },
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar'
            }
          })
        })
      }
    }
  }
}
</script>

<style></style>
