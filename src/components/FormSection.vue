<script setup lang="ts">
import { postInfo } from '@/api/eventApi'
import type { Info } from '@/api/types'
import {
  validateAgreedTerms,
  validateEmail,
  validateName,
  validatePhone,
  type ValidationErrors,
} from '@/utils/validation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'

const info = ref<Info>({
  name: '',
  phone: '',
  email: '',
  agreedTerms: false,
})

const errors = ref<ValidationErrors>({
  name: '',
  phone: '',
  email: '',
  agreedTerms: '',
})

const checkCheckbox = ref(false)
const hasSubmitted = ref(false)
const showShareButton = ref(false)

const copyUrl = async () => {
  const url = window.location.href

  try {
    await navigator.clipboard.writeText(url)
    toast.success('URL이 복사되었습니다.')
  } catch {
    const textArea = document.createElement('textarea')
    textArea.value = url
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()

    const success = document.execCommand('copy')
    document.body.removeChild(textArea)

    if (success) {
      toast.success('URL이 복사되었습니다.')
    } else {
      toast.error('URL 복사에 실패했습니다.')
    }
  }
}

watch(
  info,
  () => {
    if (info.value.name.trim() !== '') {
      errors.value.name = validateName(info.value.name)
    }
    if (info.value.phone.trim() !== '') {
      errors.value.phone = validatePhone(info.value.phone)
    }
    if (info.value.email.trim() !== '') {
      errors.value.email = validateEmail(info.value.email)
    }
    if (checkCheckbox.value) {
      errors.value.agreedTerms = validateAgreedTerms(info.value.agreedTerms)
    }
  },
  { deep: true },
)

const handleCheckboxChange = () => {
  checkCheckbox.value = true
  errors.value.agreedTerms = validateAgreedTerms(info.value.agreedTerms)
}

const isValid = computed(() => {
  return (
    !errors.value.name &&
    !errors.value.phone &&
    !errors.value.email &&
    !errors.value.agreedTerms &&
    info.value.name.trim() !== '' &&
    info.value.phone.trim() !== '' &&
    info.value.email.trim() !== '' &&
    info.value.agreedTerms
  )
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

  const submittedInfo = localStorage.getItem('submittedInfo')
  if (submittedInfo) {
    toast.error('이미 응모하셨습니다.')
    return
  }

  errors.value.name = validateName(info.value.name)
  errors.value.phone = validatePhone(info.value.phone)
  errors.value.email = validateEmail(info.value.email)
  errors.value.agreedTerms = validateAgreedTerms(info.value.agreedTerms)

  if (!isValid.value) {
    return
  }

  try {
    await postInfo(info.value)
    toast.success('응모가 완료되었습니다.')
    localStorage.setItem(
      'submittedInfo',
      JSON.stringify({
        name: info.value.name,
        phone: info.value.phone,
        email: info.value.email,
        submittedAt: new Date().toISOString(),
      }),
    )
    hasSubmitted.value = true
    showShareButton.value = true

    info.value = {
      name: '',
      phone: '',
      email: '',
      agreedTerms: false,
    }
    checkCheckbox.value = false
  } catch (error) {
    console.error('사용자 정보 저장 중 오류가 발생했습니다.', error)
    toast.error('응모 중 오류가 발생했습니다. 다시 시도해주세요.')
  }
}

const handlePhoneInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  let value = input.value.replace(/[^0-9]/g, '')

  if (value.length > 11) {
    value = value.slice(0, 11)
  }

  if (value.length > 3 && value.length <= 7) {
    value = value.slice(0, 3) + '-' + value.slice(3)
  } else if (value.length > 7) {
    value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7)
  }
  input.value = value
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
          <span class="error-message">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <label for="phone">연락처</label>
          <input
            type="tel"
            id="phone"
            placeholder="010-1234-5678"
            v-model="info.phone"
            @input="handlePhoneInput"
          />
          <span class="error-message">{{ errors.phone }}</span>
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" placeholder="example@example.com" v-model="info.email" />
          <span class="error-message">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <div class="checkbox-label">
            <input type="checkbox" v-model="info.agreedTerms" @change="handleCheckboxChange" />
            <span>개인정보 수집 및 이용 약관에 동의합니다.</span>
          </div>
          <span class="error-message">{{ errors.agreedTerms }}</span>
        </div>
        <button class="submit-button">응모하기</button>
      </form>

      <div v-if="showShareButton" class="share-container">
        <button class="share-button" @click="copyUrl">
          <span class="share-icon">🔗</span>
          <span class="share-text">이벤트 공유하기</span>
        </button>
      </div>
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
  margin-bottom: 14px;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form-group {
  position: relative;
  margin-bottom: 16px;
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
}

.form-group input[type='checkbox']:focus {
  border-color: #e0e0e0;
}

.error-message {
  font-size: 12px;
  color: #ff4444;
  display: block;
  margin-top: 6px;
  min-height: 16px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-weight: 400;
}

.checkbox-label span {
  font-size: 14px;
  opacity: 0.5;
  transition: all 0.2s ease;
}

.checkbox-label input[type='checkbox']:checked + span {
  opacity: 1;
}

.checkbox-label input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: #1a1a1a;
  flex-shrink: 0;
  margin-right: 8px;
  cursor: pointer;
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

.submit-button:hover {
  background: #00b038;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 199, 60, 0.4);
}

.share-container {
  margin-top: 30px;
  text-align: center;
}

.share-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  color: #00c73c;
  border: 2px solid #00c73c;
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-button:hover {
  background: #00c73c;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 199, 60, 0.3);
}

.share-icon {
  font-size: 20px;
}

.share-text {
  line-height: 1;
}

@media (max-width: 768px) {
  .form-section {
    padding: 60px 20px;
  }

  .section-title {
    font-size: 28px;
    margin-bottom: 12px;
  }

  .section-subtitle {
    font-size: 14px;
    margin-bottom: 40px;
  }

  .form {
    padding: 30px 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    font-size: 13px;
    margin-bottom: 6px;
  }

  .form-group input[type='text'],
  .form-group input[type='tel'],
  .form-group input[type='email'] {
    padding: 12px 14px;
    font-size: 14px;
  }

  .submit-button {
    padding: 16px;
    font-size: 16px;
  }

  .share-container {
    margin-top: 20px;
  }

  .share-button {
    padding: 12px 24px;
    font-size: 14px;
  }
}
</style>
