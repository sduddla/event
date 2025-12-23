<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import coffeeImage from '@/assets/images/coffee.png'
import movieImage from '@/assets/images/movie.png'
import cuImage from '@/assets/images/coupon.png'

const rewards = [
  {
    id: 1,
    name: '스타벅스 아메리카노 Tall 쿠폰',
    brand: '스타벅스',
    image: coffeeImage,
    validDate: '2025.12.19 - 12.31',
  },
  {
    id: 2,
    name: 'CU 기프티콘 5,000원 할인 쿠폰',
    brand: 'CU',
    image: cuImage,
    validDate: '2025.12.19 - 12.31',
  },
  {
    id: 3,
    name: '메가박스 영화 티켓 쿠폰',
    brand: '메가박스',
    image: movieImage,
    validDate: '2025.12.19 - 12.31',
  },
]

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  gsap.from('.reward-section', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.reward-section',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>
<template>
  <section class="reward-section">
    <div class="container">
      <h2 class="section-title">보상/혜택 목록</h2>
      <div class="reward-list">
        <div class="reward-card" v-for="(reward, index) in rewards" :key="index">
          <div class="coupon-badge">TIKITAKA</div>
          <div class="coupon-content">
            <div class="coupon-left">
              <img :src="reward.image" alt="reward-image" class="coupon-image" />
            </div>
            <div class="coupon-right">
              <div class="coupon-name">{{ reward.name }}</div>
              <div class="coupon-brand">{{ reward.brand }}</div>
              <div class="coupon-date">{{ reward.validDate }}</div>
            </div>
          </div>
        </div>
      </div>
      <p class="notice">쿠폰은 발급일로부터 7일 이내에 사용 가능합니다.</p>
    </div>
  </section>
</template>
<style scoped>
.reward-section {
  padding: 120px 20px;
  background: #f5f5f5;
  transition: all 0.8s ease-out;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 60px;
  text-align: center;
}

.reward-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.reward-card {
  background: #1a1a1a;
  border-radius: 8px;
  padding: 16px;
  position: relative;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.6s ease-out forwards;
}

.coupon-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #00c73c;
  color: #1a1a1a;
  font-size: 10px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 1;
}

.coupon-content {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
}

.coupon-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.coupon-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 4px;
}

.coupon-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.coupon-name {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
}

.coupon-brand {
  font-size: 12px;
  color: #00c73c;
  font-weight: 500;
}

.coupon-date {
  font-size: 11px;
  color: #999999;
}

.reward-section.visible .reward-card {
  animation: slideUp 0.6s ease-out forwards;
}

.reward-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 199, 60, 0.3);
}

.notice {
  text-align: center;
  color: #666666;
  font-size: 14px;
  margin-top: 20px;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
