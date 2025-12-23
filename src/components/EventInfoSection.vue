<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getEventInfo } from '@/api/eventApi'
import type { EventData } from '@/api/types'

const eventInfo = ref<EventData | null>(null)
gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  try {
    eventInfo.value = await getEventInfo()
    console.log(eventInfo.value)
  } catch (error) {
    console.error('이벤트 정보를 불러오는 중 오류가 발생했습니다.', error)
  }

  gsap.from('.event-info-section', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    delay: 0.2,
    scrollTrigger: {
      trigger: '.event-info-section',
      start: 'top 80%',
    },
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>
<template>
  <section class="event-info-section">
    <div class="container">
      <h2 class="section-title">이벤트 정보</h2>
      <div class="info-card">
        <div class="info-item">
          <span class="info-label">이벤트 기간</span>
          <span class="info-value">{{ eventInfo?.period }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">대상</span>
          <span class="info-value">{{ eventInfo?.target }}</span>
        </div>
      </div>
      <div class="description">
        <p v-html="eventInfo?.description"></p>
      </div>
    </div>
  </section>
</template>
<style scoped>
.event-info-section {
  padding: 120px 20px;
  background: #ffffff;
  transition: all 0.8s ease-out;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 40px;
  text-align: center;
}

.info-card {
  background: #f5f5f5;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 16px;
  font-weight: 500;
  color: #666666;
}

.info-value {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
}

.description {
  text-align: center;
  color: #666666;
  line-height: 1.6;
  font-size: 16px;
}
</style>
