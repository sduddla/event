<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { FortuneItem } from '@/api/types'
import { getFortuneList } from '@/api/eventApi'
const isSpinning = ref(false)
const rotation = ref(0)
const fortune = ref<FortuneItem[]>([])
const selectedFortune = ref<FortuneItem | null>(null)

const anglePerItem = computed(() => {
  return fortune.value.length > 0 ? 360 / fortune.value.length : 0
})

const getConicGradient = () => {
  if (fortune.value.length === 0) return ''
  let gradient = ''
  fortune.value.forEach((_, index) => {
    const startAngle = index * anglePerItem.value
    const endAngle = (index + 1) * anglePerItem.value
    const color = index % 2 === 0 ? '#00c73c' : '#1a1a1a'
    gradient += `${color} ${startAngle}deg ${endAngle}deg${index < fortune.value.length - 1 ? ',' : ''}`
  })
  return `conic-gradient(${gradient})`
}

const spinRoulette = () => {
  if (isSpinning.value || fortune.value.length === 0) return

  isSpinning.value = true
  selectedFortune.value = null

  const randomRotation = 360 * 5 + Math.random() * 360
  rotation.value += randomRotation

  setTimeout(() => {
    const normalizedRotation = rotation.value % 360
    const index = Math.floor((360 - normalizedRotation) / anglePerItem.value)
    const selected = fortune.value[index % fortune.value.length]
    if (selected) {
      selectedFortune.value = {
        id: selected.id,
        label: selected.label,
        icon: selected.icon,
      }
    }
    isSpinning.value = false
  }, 3000)
}

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  try {
    fortune.value = await getFortuneList()
  } catch (error) {
    console.error('행운의 룰렛 정보를 불러오는 중 오류가 발생했습니다.', error)
  }

  gsap.from('.interaction-section', {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    delay: 0.2,
    scrollTrigger: {
      trigger: '.interaction-section',
      start: 'top 80%',
    },
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<template>
  <section class="interaction-section">
    <div class="container">
      <h2 class="section-title">행운의 룰렛</h2>
      <p class="section-subtitle">룰렛을 돌려서 작은 선물을 추가로 받아보세요!</p>

      <div class="roulette-container">
        <div class="roulette-wrapper">
          <div
            class="roulette"
            :style="{ transform: `rotate(${rotation}deg)`, background: getConicGradient() }"
            :class="{ spinning: isSpinning }"
          >
            <div
              v-for="(fortuneItem, index) in fortune"
              :key="fortuneItem.id"
              class="roulette-item"
              :style="{
                transform: `rotate(${index * anglePerItem + anglePerItem / 2}deg)`,
              }"
            >
              <div class="roulette-text">{{ fortuneItem.label }}</div>
            </div>
          </div>
          <div class="roulette-pointer"></div>
        </div>

        <button class="spin-button" @click="spinRoulette" :disabled="isSpinning">
          {{ isSpinning ? '돌리는 중...' : '룰렛 돌리기' }}
        </button>

        <div v-if="selectedFortune" class="result-message">
          <div class="result-icon">{{ selectedFortune.icon }}</div>
          <div class="result-text">{{ selectedFortune.label }}을(를) 받으셨습니다!</div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.interaction-section {
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
  margin-bottom: 12px;
  text-align: center;
}

.section-subtitle {
  text-align: center;
  color: #666666;
  font-size: 16px;
  margin-bottom: 80px;
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

@media (max-width: 768px) {
  .interaction-section {
    padding: 60px 20px;
  }

  .section-title {
    font-size: 28px;
    margin-bottom: 10px;
  }

  .section-subtitle {
    font-size: 14px;
    margin-bottom: 40px;
  }

  .roulette-wrapper {
    width: 280px;
    height: 280px;
  }

  .roulette {
    width: 280px;
    height: 280px;
  }

  .roulette-item {
    font-size: 12px;
  }

  .spin-button {
    padding: 14px 32px;
    font-size: 16px;
  }

  .result-message {
    padding: 16px;
    margin-top: 20px;
  }

  .result-icon {
    font-size: 36px;
    margin-bottom: 8px;
  }

  .result-text {
    font-size: 16px;
  }
}
</style>
