export interface ValidationErrors {
  name: string
  phone: string
  email: string
  agreedTerms: string
}

export const validateName = (name: string) => {
  if (!name.trim()) {
    return '이름을 입력해 주세요.'
  }
  return ''
}

export const validatePhone = (phone: string) => {
  if (!phone.trim()) {
    return '전화번호를 입력해 주세요.'
  }

  const phoneRegex = /^010-\d{4}-\d{4}$/
  if (!phoneRegex.test(phone)) {
    return '올바른 전화번호 형식을 입력해 주세요. (예: 010-1234-5678)'
  }
  return ''
}

export const validateEmail = (email: string) => {
  if (!email.trim()) {
    return '이메일을 입력해 주세요.'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return '올바른 이메일 형식을 입력해 주세요. (예: example@example.com)'
  }
  return ''
}

export const validateAgreedTerms = (agreedTerms: boolean) => {
  if (!agreedTerms) {
    return '이용약관에 동의해 주세요.'
  }
  return ''
}
