<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isSpinning = ref(false)
const rotation = ref(0)
const selectedReward = ref<{ value: number; label: string } | undefined>(undefined)

const rewards = [
  { value: 0, label: '10,000원 쿠폰' },
  { value: 1, label: '5,000원 쿠폰' },
  { value: 2, label: '3,000원 쿠폰' },
  { value: 3, label: '다음 기회에' },
  { value: 4, label: '1,000원 쿠폰' },
  { value: 5, label: '2,000원 쿠폰' },
]
const anglePerItem = 360 / rewards.length

const getConicGradient = () => {
  let gradient = ''
  rewards.forEach((_, index) => {
    const startAngle = index * anglePerItem
    const endAngle = (index + 1) * anglePerItem
    const color = index % 2 === 0 ? '#00c73c' : '#1a1a1a'
    gradient += `${color} ${startAngle}deg ${endAngle}deg${index < rewards.length - 1 ? ',' : ''}`
  })
  return `conic-gradient(${gradient})`
}

const spinRoulette = () => {
  if (isSpinning.value) return

  isSpinning.value = true
  selectedReward.value = undefined

  const randomRotation = 360 * 5 + Math.random() * 360
  rotation.value += randomRotation

  setTimeout(() => {
    const normalizedRotation = rotation.value % 360
    const index = Math.floor((360 - normalizedRotation) / anglePerItem)
    selectedReward.value = rewards[index % rewards.length]
    console.log(selectedReward.value)
    isSpinning.value = false
  }, 3000)
}

const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(
      (entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      },
      {
        threshold: 0.1,
      },
    )
  })
  const section = document.querySelector('.interaction-section')
  if (section) {
    observer.observe(section)
  }
})
</script>

<template>
  <section class="interaction-section" :class="{ visible: isVisible }">
    <div class="container">
      <h2 class="section-title">행운의 룰렛</h2>
      <p class="section-subtitle">룰렛을 돌려서 추가 혜택을 받아보세요!</p>

      <div class="roulette-container">
        <div class="roulette-wrapper">
          <div
            class="roulette"
            :style="{ transform: `rotate(${rotation}deg)`, background: getConicGradient() }"
            :class="{ spinning: isSpinning }"
          >
            <div
              v-for="(reward, index) in rewards"
              :key="index"
              class="roulette-item"
              :style="{
                transform: `rotate(${index * anglePerItem + anglePerItem / 2}deg)`,
              }"
            >
              <div class="roulette-text">{{ reward.label }}</div>
            </div>
          </div>
          <div class="roulette-pointer"></div>
        </div>

        <button class="spin-button" @click="spinRoulette" :disabled="isSpinning">
          {{ isSpinning ? '돌리는 중...' : '룰렛 돌리기' }}
        </button>

        <div v-if="selectedReward" class="result-message">
          <div class="result-icon">🎉</div>
          <div class="result-text">{{ selectedReward.label }}을(를) 받으셨습니다!</div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.interaction-section {
  padding: 80px 20px;
  background: #ffffff;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.interaction-section.visible {
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
  margin-bottom: 12px;
  text-align: center;
}

.section-subtitle {
  text-align: center;
  color: #666666;
  font-size: 16px;
  margin-bottom: 50px;
}

.roulette-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.roulette-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 40px;
}

.roulette {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  border: 8px solid #1a1a1a;
  overflow: hidden;
  transition: transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99);
}

.roulette.spinning {
  transition: transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99);
}

.roulette-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  pointer-events: none;
  width: 0;
  height: 0;
}

.roulette-text {
  font-size: 12px;
  color: #ffffff;
  white-space: nowrap;
  font-weight: 600;
  text-align: center;
  position: absolute;
  top: -120px;
  left: 0;
  transform: translateX(-50%);
}

.roulette-pointer {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid #00c73c;
  z-index: 10;
}

.spin-button {
  background: #00c73c;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 18px 48px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 199, 60, 0.3);
}

.spin-button:hover:not(:disabled) {
  background: #00b038;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 199, 60, 0.4);
}

.spin-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-message {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 12px;
  animation: fadeIn 0.5s ease-out;
}

.result-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.result-text {
  font-size: 18px;
  font-weight: 600;
  color: #00c73c;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
