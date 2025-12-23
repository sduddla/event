<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Reward } from '@/api/types'
import { getRewards } from '@/api/eventApi'

const rewards = ref<Reward[]>([])
gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  try {
    rewards.value = await getRewards()
  } catch (error) {
    console.error('보상/혜택 목록을 불러오는 중 오류가 발생했습니다.', error)
  }
  await nextTick()

  gsap.fromTo(
    '.reward-section .section-title',
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: '.reward-section',
        start: 'top 80%',
      },
    },
  )

  gsap.fromTo(
    '.reward-card',
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '.reward-list',
        start: 'top 80%',
      },
    },
  )

  const cardCount = rewards.value.length
  const delay = (cardCount - 1) * 0.2

  gsap.from('.notice', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    delay: delay,
    scrollTrigger: {
      trigger: '.reward-list',
      start: 'top 80%',
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

.reward-card:hover {
  box-shadow: 0 12px 32px rgba(0, 199, 60, 0.3);
}

.notice {
  text-align: center;
  color: #666666;
  font-size: 14px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .reward-section {
    padding: 60px 20px;
  }

  .section-title {
    font-size: 28px;
    margin-bottom: 40px;
  }

  .reward-list {
    gap: 20px;
  }

  .reward-card {
    padding: 12px;
  }

  .coupon-content {
    gap: 12px;
  }

  .coupon-image {
    width: 50px;
    height: 50px;
  }

  .coupon-name {
    font-size: 14px;
  }

  .coupon-brand {
    font-size: 11px;
  }

  .coupon-date {
    font-size: 10px;
  }

  .notice {
    font-size: 12px;
  }
}
</style>
