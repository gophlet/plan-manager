import client from '../client'
import { PlanEndpoint } from '../endpoints'
import { isMockEnabled, MOCK_DELAY } from '../mocks'
import { HttpMethod } from '@renderer/constants'

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

export const getPlans = async (payload: GetPlansRequest): Promise<GetPlansResponse | null> => {
  if (isMockEnabled) {
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
      }, MOCK_DELAY)
    })
  }
  const res = await client.request<GetPlansResponse>({
    method: HttpMethod.POST,
    url: PlanEndpoint.GET_PLANS,
    data: payload
  })
  return res.data
}

export const deletePlans = async (
  payload: DeletePlansRequest
): Promise<DeletePlansResponse | null> => {
  if (isMockEnabled) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, MOCK_DELAY)
    })
  }
  const res = await client.request<DeletePlansResponse>({
    method: HttpMethod.POST,
    url: PlanEndpoint.DELETE_PLANS,
    data: payload
  })
  return res.data
}

export const submitPlan = async (
  payload: SubmitPlanRequest
): Promise<SubmitPlanResponse | null> => {
  if (isMockEnabled) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ planId: 'mock-plan-' + Math.random().toString(36).slice(2, 8) })
      }, MOCK_DELAY)
    })
  }
  const response = await client.request<SubmitPlanResponse>({
    method: HttpMethod.POST,
    url: PlanEndpoint.SUBMIT_PLAN,
    data: payload
  })
  return response.data
}

export const switchPlans = async (
  payload: SwitchPlansRequest
): Promise<SwitchPlansResponse | null> => {
  if (isMockEnabled) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, MOCK_DELAY)
    })
  }
  const response = await client.request<SwitchPlansResponse>({
    method: HttpMethod.POST,
    url: PlanEndpoint.SWITCH_PLANS,
    data: payload
  })
  return response.data
}
