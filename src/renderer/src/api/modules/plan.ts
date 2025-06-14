import client from '../client'
import { PlanEndpoints } from '../endpoints'

const isMock = import.meta.env.MODE === 'development'

type PlanInfo = {
  planId: string
  planName: string
  isActive: boolean
  followWallets: string[]
  buyAmount: number
  buyJito: number
  sellJito: number
  minFA: number
  maxFA: number
  up: number
  down: number
}

type PlanInfoList = PlanInfo[]

export interface GetPlansRequest {
  walletId: string
}

export interface GetPlansResponse {
  plans: PlanInfoList
}

export interface DeletePlansRequest {
  planIds: string[]
}

export interface DeletePlansResponse {
  success: boolean
}

export interface SubmitPlanRequest {
  planName: string
  followWallets: string[]
  buyAmount: number
  buyJito: number
  sellJito: number
  minFA: number
  maxFA: number
  up: number
  down: number
}

export interface SubmitPlanResponse {
  planId: string
}

export interface SwitchPlansRequest {
  planIds: string[]
}

export interface SwitchPlansResponse {
  success: boolean
}

export const getPlans = async (payload: GetPlansRequest): Promise<GetPlansResponse> => {
  if (isMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          plans: Array.from({ length: 15 }).map((_, index) => ({
            planId: `plan-${index + 1}`,
            planName: `套利策略 ${index + 1}`,
            isActive: false,
            followWallets: ['0x1234567890abcdef', '0xabcdef1234567890'],
            buyAmount: 500,
            buyJito: 0.2,
            sellJito: 0.1,
            minFA: 5,
            maxFA: 50,
            up: 3,
            down: 1
          }))
        })
      }, 500)
    })
  }
  const res = await client.post<GetPlansResponse>(PlanEndpoints.getPlans, payload)
  return res.data
}

export const deletePlans = async (payload: DeletePlansRequest): Promise<DeletePlansResponse> => {
  if (isMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 300)
    })
  }
  const res = await client.post<DeletePlansResponse>(PlanEndpoints.deletePlans, payload)
  return res.data
}

export const submitPlan = async (payload: SubmitPlanRequest): Promise<SubmitPlanResponse> => {
  if (isMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ planId: 'mock-plan-' + Math.random().toString(36).slice(2, 8) })
      }, 400)
    })
  }
  const response = await client.post<SubmitPlanResponse>(PlanEndpoints.submitPlan, payload)
  return response.data
}

export const switchPlans = async (payload: SwitchPlansRequest): Promise<SwitchPlansResponse> => {
  if (isMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 200)
    })
  }
  const response = await client.post<SwitchPlansResponse>(PlanEndpoints.switchPlans, payload)
  return response.data
}
