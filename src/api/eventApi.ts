import { axiosInstance } from './axios'
import type { EventData, FortuneItem, Info, Reward } from './types'

// 이벤트 정보
export const getEventInfo = async () => {
  const response = await axiosInstance.get<EventData>('/event')
  return response.data
}

// 보상/혜택 목록
export const getRewards = async () => {
  const response = await axiosInstance.get<Reward[]>('/rewards')
  return response.data
}

// 행운의 룰렛 정보
export const getFortuneList = async () => {
  const response = await axiosInstance.get<FortuneItem[]>('/fortune')
  return response.data
}

// 사용자 정보
export const postInfo = async (info: Info) => {
  const response = await axiosInstance.post<Info>('/info', info)
  return response.data
}
