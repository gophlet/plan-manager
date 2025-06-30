import client from '../client'
import { TransferEndpoint } from '../endpoints'
import { isMockEnabled, MOCK_DELAY } from '../mocks'
import { HttpMethod } from '@renderer/constants'

export interface TransferRequest {
  fromAddress: string
  toAddress: string
  amount: number
}

export interface TransferResponse {
  success: boolean
}

export const transfer = async (payload: TransferRequest): Promise<TransferResponse | null> => {
  if (isMockEnabled) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, MOCK_DELAY)
    })
  }
  const res = await client.request<TransferResponse>({
    method: HttpMethod.POST,
    url: TransferEndpoint.TRANSFER,
    data: payload
  })
  return res.data
}
