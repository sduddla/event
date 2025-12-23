export interface Reward {
  id: number
  name: string
  brand: string
  image: string
  validDate: string
}

export interface EventData {
  id: number
  period: string
  target: string
  description: string
}

export interface FortuneItem {
  id: number
  label: string
  icon: string
}

export interface Info {
  name: string
  phone: string
  email: string
  agreedTerms: boolean
}
