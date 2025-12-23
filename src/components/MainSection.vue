<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, ref } from 'vue'

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const scrollToForm = () => {
  const formSection = document.querySelector('.form-section')
  formSection?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  gsap.from('.chat-bubble-1', {
    opacity: 0,
    scale: 0,
    x: 50,
    y: -50,
    duration: 0.8,
    rotation: -10,
    delay: 0.5,
    ease: 'back.out(1.7)',
  })
  gsap.from('.chat-bubble-2', {
    opacity: 0,
    scale: 0,
    x: 50,
    y: -20,
    duration: 0.8,
    rotation: 10,
    delay: 0.8,
    ease: 'back.out(1.7)',
  })

  gsap.to('.chat-bubble-1', {
    y: -5,
    duration: 2,
    yoyo: true,
    repeat: -1,
    delay: 1.5,
    ease: 'sine.inOut',
  })
  gsap.to('.chat-bubble-2', {
    y: -5,
    duration: 2,
    yoyo: true,
    repeat: -1,
    delay: 2,
    ease: 'sine.inOut',
  })
})
</script>
<template>
  <section class="main-section">
    <header class="main-header">
      <div class="logo">TIKITAKA</div>
    </header>
    <div class="main-content">
      <h1 class="main-title fade-in">
        <span class="highlight">TIKITAKA</span> 메신저 신규 서비스<br />
        기념 이벤트
      </h1>

      <div class="chat-bubble chat-bubble-1">
        <div class="chat-content">👋🏻 안녕하세요!</div>
        <div class="bubble-tail"></div>
      </div>
      <div class="chat-bubble chat-bubble-2">
        <div class="chat-content">✨ 신규 오픈!</div>
        <div class="bubble-tail"></div>
      </div>

      <p class="main-subtitle fade-in-delay-1">이벤트 응모하고 특별 혜택 받아가세요!</p>

      <div class="countdown-container fade-in-delay-2">
        <div class="countdown-label">이벤트 종료까지</div>
        <div class="countdown-timer">
          <div class="countdown-item">
            <span class="countdown-number">{{ String(days).padStart(2, '0') }}</span>
            <span class="countdown-unit">일</span>
          </div>
          <span class="countdown-separator">:</span>
          <div class="countdown-item">
            <span class="countdown-number">{{ String(hours).padStart(2, '0') }}</span>
            <span class="countdown-unit">시</span>
          </div>
          <span class="countdown-separator">:</span>
          <div class="countdown-item">
            <span class="countdown-number">{{ String(minutes).padStart(2, '0') }}</span>
            <span class="countdown-unit">분</span>
          </div>
          <span class="countdown-separator">:</span>
          <div class="countdown-item">
            <span class="countdown-number">{{ String(seconds).padStart(2, '0') }}</span>
            <span class="countdown-unit">초</span>
          </div>
        </div>
      </div>

      <button class="main-button fade-in-delay-3" @click="scrollToForm">지금 응모하기</button>
    </div>
  </section>
</template>
<style scoped>
.main-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  background: #1a1a1a;
  position: relative;
  overflow: hidden;
}

.main-header {
  width: 100%;
  padding: 30px 40px;
  position: absolute;
  top: 0;
  left: 0;
}

.logo {
  font-size: 24px;
  color: #00c73c;
  font-weight: 600;
}

.main-content {
  text-align: center;
  max-width: 600px;
  position: relative;
}

.main-title {
  font-size: 48px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.2;
  position: relative;
}

.highlight {
  color: #00c73c;
}

.chat-bubble {
  position: absolute;
  background: #ffffff;
  border-radius: 18px;
  padding: 10px 16px;
  pointer-events: none;
  white-space: nowrap;
}

.chat-bubble-1 {
  top: -80px;
  right: -100px;
  transform: rotate(-15deg);
  box-shadow:
    -4px -4px 12px rgba(0, 0, 0, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.1);
}

.chat-bubble-2 {
  top: -40px;
  right: -80px;
  transform: rotate(15deg);
  box-shadow:
    4px -4px 12px rgba(0, 0, 0, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.1);
}

.bubble-content {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
}

.bubble-tail {
  position: absolute;
  bottom: -8px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #ffffff;
}

.chat-bubble-1 .bubble-tail {
  right: 20px;
}

.chat-bubble-2 .bubble-tail {
  right: 25px;
}

.main-subtitle {
  font-size: 18px;
  color: #909090;
  margin-bottom: 50px;
}

.countdown-container {
  background: #ffffff;
  border-radius: 16px;
  padding: 30px 20px;
  margin-bottom: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.countdown-label {
  color: #666666;
  font-size: 14px;
  margin-bottom: 20px;
}

.countdown-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(26, 26, 26, 0.05);
  border-radius: 12px;
  padding: 16px 20px;
  min-width: 70px;
}

.countdown-number {
  font-size: 32px;
  font-weight: 700;
  color: #00c73c;
  line-height: 1;
}

.countdown-unit {
  font-size: 12px;
  color: #666666;
  opacity: 0.8;
  margin-top: 4px;
}

.countdown-separator {
  font-size: 24px;
  color: #00c73c;
  font-weight: 700;
}

.main-button {
  background: #00c73c;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 18px 48px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 199, 60, 0.2);
}

.main-button:hover {
  background: #00b038;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 199, 60, 0.4);
}

.main-button:active {
  transform: translateY(0);
}

.fade-in {
  animation: fadeInUp 0.8s ease-out;
}

.fade-in-delay-1 {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.fade-in-delay-2 {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.fade-in-delay-3 {
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
