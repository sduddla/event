<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  const section = document.querySelector('.event-info-section')
  if (section) {
    observer.observe(section)
  }
})
</script>
<template>
  <section class="event-info-section" :class="{ visible: isVisible }">
    <div class="container">
      <h2 class="section-title">이벤트 정보</h2>
      <div class="info-card">
        <div class="info-item">
          <span class="info-label">이벤트 기간</span>
          <span class="info-value">2025.12.25 ~ 2025.12.31</span>
        </div>
        <div class="info-item">
          <span class="info-label">대상</span>
          <span class="info-value">모든 사용자</span>
        </div>
      </div>
      <div class="description">
        <p>
          신규 서비스 오픈을 기념하여 특별한 혜택을 준비했습니다!<br />
          이벤트에 응모하시면 다양한 보상과 쿠폰을 받으실 수 있습니다.
        </p>
      </div>
    </div>
  </section>
</template>
<style scoped>
.event-info-section {
  padding: 80px 20px;
  background: #ffffff;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.event-info-section.visible {
  opacity: 1;
  transform: translateY(0);
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
