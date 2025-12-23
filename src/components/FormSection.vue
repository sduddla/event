<script setup lang="ts">
import { postInfo } from '@/api/eventApi'
import type { Info } from '@/api/types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, ref } from 'vue'

const info = ref<Info>({
  name: '',
  phone: '',
  email: '',
  agreedTerms: false,
})

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.from('.form-section', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.form-section',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })
  gsap.from('.form-group', {
    x: -30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.form',
      start: 'top 85%',
    },
  })
})
onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  try {
    await postInfo(info.value)
    alert('응모가 완료되었습니다.')
    info.value = {
      name: '',
      phone: '',
      email: '',
      agreedTerms: false,
    }
  } catch (error) {
    console.error('사용자 정보 저장 중 오류가 발생했습니다.', error)
    alert('응모 중 오류가 발생했습니다. 다시 시도해주세요.')
  }
}
</script>
<template>
  <section class="form-section">
    <div class="container">
      <h2 class="section-title">이벤트 응모</h2>
      <p class="section-subtitle">정보를 입력하고 이벤트에 응모해주세요.</p>

      <form class="form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">이름</label>
          <input type="text" id="name" placeholder="이름을 입력해주세요." v-model="info.name" />
          <span class="error-message"></span>
        </div>
        <div class="form-group">
          <label for="phone">연락처</label>
          <input type="tel" id="phone" placeholder="010-1234-5678" v-model="info.phone" />
          <span class="error-message"></span>
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" placeholder="example@example.com" v-model="info.email" />
          <span class="error-message"></span>
        </div>
        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="info.agreedTerms" />
            <span>개인정보 수집 및 이용 약관에 동의합니다.</span>
          </label>
          <span class="error-message"></span>
        </div>
        <button class="submit-button">응모하기</button>
      </form>
    </div>
  </section>
</template>
<style scoped>
.form-section {
  padding: 120px 20px;
  background: #f5f5f5;
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
  font-size: 16px;
  color: #666666;
  margin-bottom: 60px;
  text-align: center;
}

.form {
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
  display: block;
}

.form-group input[type='text'],
.form-group input[type='tel'],
.form-group input[type='email'] {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #ffffff;
}

.form-group input:focus {
  border-color: #00c73c;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 199, 60, 0.1);
}

.error-message {
  font-size: 12px;
  color: #ff4444;
  display: block;
  margin-top: 6px;
}

.checkbox-group {
  margin-bottom: 32px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
}

.checkbox-label input[type='checkbox'] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #1a1a1a;
  flex-shrink: 0;
  position: relative;
  top: 5px;
  margin-right: 8px;
}

.submit-button {
  width: 100%;
  padding: 18px;
  background: #00c73c;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 199, 60, 0.3);
}

.submit-button:hover:not(:disabled) {
  background: #00b038;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 199, 60, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
