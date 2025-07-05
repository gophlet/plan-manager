import client from '../client'
import { SwapEndpoint } from '../endpoints'
import { isMockEnabled, MOCK_DELAY } from '../mocks'
import { HttpMethod, Transaction } from '@renderer/constants'

export type TransactionType = (typeof Transaction)[keyof typeof Transaction]

export interface SwapRequest {
  walletId: string
  mint: string
  amountOrPercent: number
  type: TransactionType
}

export interface SwapResponse {
  success: boolean
}

export const swap = async (payload: SwapRequest): Promise<SwapResponse | null> => {
  if (isMockEnabled) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, MOCK_DELAY)
    })
  }
  const res = await client.request<SwapResponse>({
    method: HttpMethod.POST,
    url: SwapEndpoint.SWAP,
    data: payload
  })
  return res.data
}
